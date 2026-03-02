'use strict';

const { Contract } = require('fabric-contract-api');

class VotingContract extends Contract {

    async createCandidate(ctx, candidateId, name) {
        const candidateKey = "CAND_" + candidateId;

        const exists = await ctx.stub.getState(candidateKey);
        if (exists && exists.length > 0) {
            throw new Error('Candidate already exists');
        }

        const candidate = {
            docType: "candidate",
            candidateId,
            name,
            votes: 0
        };

        await ctx.stub.putState(
            candidateKey,
            Buffer.from(JSON.stringify(candidate))
        );

        return JSON.stringify(candidate);
    }

    async castVote(ctx, voterId, candidateId) {

        const voteKey = "VOTE_" + voterId;
        const existingVote = await ctx.stub.getState(voteKey);

        if (existingVote && existingVote.length > 0) {
            throw new Error('Voter has already voted');
        }

        const candidateKey = "CAND_" + candidateId;
        const candidateBytes = await ctx.stub.getState(candidateKey);

        if (!candidateBytes || candidateBytes.length === 0) {
            throw new Error('Candidate does not exist');
        }

        const candidate = JSON.parse(candidateBytes.toString());
        candidate.votes += 1;

        await ctx.stub.putState(
            candidateKey,
            Buffer.from(JSON.stringify(candidate))
        );

        const voteRecord = {
            docType: "vote",
            voterId,
            candidateId
        };

        await ctx.stub.putState(
            voteKey,
            Buffer.from(JSON.stringify(voteRecord))
        );

        return JSON.stringify(candidate);
    }

    async queryCandidate(ctx, candidateId) {

        const candidateKey = "CAND_" + candidateId;
        const candidateBytes = await ctx.stub.getState(candidateKey);

        if (!candidateBytes || candidateBytes.length === 0) {
            throw new Error('Candidate does not exist');
        }

        return candidateBytes.toString();
    }
}

module.exports = VotingContract;
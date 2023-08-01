const mongoose = require('mongoose');
// const reactionSchema = require('./reaction')

const { Schema } = mongoose;

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxLength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => new Date(timestamp).toISOString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Reaction',
        },
    ],
},
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    });

// Virtual reactionCount
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;

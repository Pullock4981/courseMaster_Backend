const { Schema, model } = require("mongoose");

const quizSubmissionSchema = new Schema(
    {
        student: { type: Schema.Types.ObjectId, ref: "User", required: true },
        course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
        lessonId: { type: Schema.Types.ObjectId, required: true },

        answers: [{ type: Number }], // Array of selected option indices
        score: { type: Number, required: true },
        total: { type: Number, required: true },
        percent: { type: Number, required: true },
    },
    { timestamps: true }
);

// Index for faster queries
quizSubmissionSchema.index({ student: 1, course: 1 });
quizSubmissionSchema.index({ student: 1, course: 1, lessonId: 1 });

module.exports = model("QuizSubmission", quizSubmissionSchema);


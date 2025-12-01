// course model

const { Schema, model } = require("mongoose");

const lessonSchema = new Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
    assignmentPrompt: { type: String },
    quiz: [
      {
        question: String,
        options: [String],
        correctIndex: Number,
      },
    ],
  },
  { _id: true }
);

const moduleSchema = new Schema(
  {
    title: { type: String, required: true },
    lessons: [lessonSchema],
  },
  { _id: true }
);

const courseSchema = new Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    instructorName: { type: String, required: true, index: true },
    price: { type: Number, required: true },
    category: { type: String, index: true },
    tags: [{ type: String, index: true }],
    syllabus: [moduleSchema],
    batches: [
      {
        name: String,
        startDate: Date,
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Course", courseSchema);

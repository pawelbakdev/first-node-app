const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connected to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    // name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  try {
    const result = await course.save();
    console.log("Result -" - result);
  } catch (err) {
    console.log("Error - ", err.message);
  }
};

const getCourses = () => {
  const pageNumber = 2;
  const pageSize = 10;

  return Course.find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);
};

const updateCourseGetFirst = async (id) => {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = true;
  course.author = "Another Author";

  return course.save();
};

const updateCourseUpdateFirst = async (id) => {
  return await Course.findByIdAndUpdate(
    id,
    {
      $set: {
        author: "Jason",
        isPublished: false,
      },
    },
    { new: true }
  );
};

const removeCourse = async (id) => {
  // return await Course.deleteMany({ _id: id });
  return Course.findByIdAndRemove(id);
};

(async () => {
  await createCourse();
})();

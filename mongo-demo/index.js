const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connected to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = () => {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  return course.save();
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
  const res = await removeCourse("5a68fe2142ae6a6482c4c9cb");
  console.log(res);
})();

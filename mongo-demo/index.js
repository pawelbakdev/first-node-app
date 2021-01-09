const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connected to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/
  },
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: (v) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            const result = v && v.length > 0;
            resolve(result);
          }, 1000);
        });
      },
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
  },
});

const Course = mongoose.model("Course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: null,
    isPublished: true,
    category: "-",
    price: 15,
  });

  try {
    const result = await course.save();
    console.log("Result -" - result);
  } catch (err) {
    for (const field in err.errors) {
      console.log(err.errors[field].message);
    }
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

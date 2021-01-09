const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => {
    console.error("Could not connected to MongoDB...", err);
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

const getCourses = () => {
  return Course.find({
    isPublished: true,
  })
    .or([
      { price: { $gte: 15 } },
      {
        name: /.*by.*/,
      },
    ])
    .select("name author price");
};

(async () => {
  const result = await getCourses();
  console.log(result);
})();

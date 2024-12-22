import mongoose from "mongoose";

const Schema = mongoose.Schema;

// https://stackoverflow.com/a/26008603/19020549
const ReviewSchema = new Schema({
  movieId: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: true },
});

// ReviewSchema.statics.findByMovieDBId = function (id) {
//   return this.findOne({ id: id });
// };

export default mongoose.model("Reviews", ReviewSchema);

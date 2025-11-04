const Review = require("../models/review");
const Listing = require("../models/listing");   



module.exports.createReview = async (req, res) => {
  // app.post("/listings/:id/reviews", async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  console.log(newReview);

  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  req.flash("success", "Successfully made a new Review");
  res.redirect(`/listings/${listing._id}`);
};


module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Successfully deleted the Review");
  res.redirect(`/listings/${id}`);
};
import reviewModal from "../models/ReviewModel.js";
import appointmentModel from "../models/appointmentModel.js";
// import doctorModel from "../models/doctorModel.js";
// import userModel from "../models/userModel.js";

// Add a new review
// Add a new review
export const addReview = async (req, res) => {
  const { docId, userId, review, rating } = req.body;

  try {
    // Check if the appointment exists and is completed
    const appointment = await appointmentModel.findOne({
      userId: userId,
      docId: docId,
    });
    if (!appointment) {
      return res
        .status(404)
        .json({ message: "Appointment not found or cannot be reviewed" });
    }

    // Create the new review document
    const newReview = new reviewModal({
      userId,
      docId,
      review,
      rating,
    });

    // Save the review to the database
    await newReview.save();

    res
      .status(200)
      .json({ success: true, message: "Review added successfully!" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Failed to submit the review. Please try again." });
  }
};

// // Get reviews for a specific doctor
export const getReviews = async (req, res) => {
  const { docId } = req.params;
  console.log(docId, "receivedDocid");
  try {
    // Get reviews for the specified doctor
    const reviews = await reviewModal
      .find({ docId })
      .populate("userId", "name image");
    // .populate("appointmentId");

    if (!reviews) {
      return res
        .status(404)
        .json({ message: "No reviews found for this doctor" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// // Update a review
// export const updateReview = async (req, res) => {
//   const { reviewId } = req.params;
//   const { review, rating } = req.body;

//   try {
//     // Find the review by ID
//     const updatedReview = await reviewModal.findByIdAndUpdate(
//       reviewId,
//       { review, rating },
//       { new: true } // returns the updated document
//     );

//     if (!updatedReview) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Review updated successfully", review: updatedReview });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Delete a review
// export const deleteReview = async (req, res) => {
//   const { reviewId } = req.params;

//   try {
//     const review = await reviewModal.findByIdAndDelete(reviewId);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     res.status(200).json({ message: "Review deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
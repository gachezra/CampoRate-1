import React, { useState } from 'react';
import { addReview } from '../utils/APIRoutes';

const ReviewForm = ({ university, onClose, onReviewAdded }) => {
  const [formData, setFormData] = useState({
    rating: 5,
    academic_rating: 5,
    facilities_rating: 5,
    social_life_rating: 5,
    career_prospects_rating: 5,
    comment: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addReview(university._id, formData);
      onReviewAdded();
      onClose();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md mx-auto md:w-96">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-4">Review {university.name}</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="text-sm text-gray-600 mb-2">Overall Rating:</label>
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="text-sm text-gray-600 mb-2">Academic Rating:</label>
          <input
            type="number"
            name="academic_rating"
            min="1"
            max="5"
            value={formData.academic_rating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="text-sm text-gray-600 mb-2">Facilities Rating:</label>
          <input
            type="number"
            name="facilities_rating"
            min="1"
            max="5"
            value={formData.facilities_rating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="text-sm text-gray-600 mb-2">Social Life Rating:</label>
          <input
            type="number"
            name="social_life_rating"
            min="1"
            max="5"
            value={formData.social_life_rating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="text-sm text-gray-600 mb-2">Career Prospects Rating:</label>
          <input
            type="number"
            name="career_prospects_rating"
            min="1"
            max="5"
            value={formData.career_prospects_rating}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <label className="text-sm text-gray-600 mb-2">Comment:</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button
            type="submit"
            className="bg-amber-400 border-2 border-amber-400 text-white rounded-lg px-4 py-2 hover:bg-white hover:text-amber-400 transition mb-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 border-2 border-gray-500 text-white rounded-lg px-4 py-2 hover:bg-white hover:text-gray-500 transition"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;

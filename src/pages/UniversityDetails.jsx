import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { getUniversityDetails, reviewRoute } from '../utils/APIRoutes';
import ReviewForm from '../components/ReviewForm';

const UniversityDetails = () => {
  const { universityId } = useParams();
  const userId = localStorage.getItem('uid')
  const [university, setUniversity] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);

  useEffect(() => {
    const fetchUniversityDetails = async () => {
      try {
        const universityResponse = await axios.get(`${getUniversityDetails}/${universityId}`);
        setUniversity(universityResponse.data);

        // Fetch reviews specifically for this university
        const reviewsResponse = await axios.get(`${reviewRoute}/${universityId}`);
        console.log(reviewsResponse.data)
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error fetching university details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUniversityDetails();
  }, [universityId]);

  const handleWriteReview = () => {
    setIsReviewFormOpen(true)
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!university) {
    return <div className="flex justify-center items-center h-screen text-xl font-semibold text-gray-700">University not found</div>;
  }

  const isStudent = university.students.includes(userId);

  return (
    <div className="p-6 bg-cream min-h-screen">
      <h1 className="text-brown text-center text-4xl font-extrabold mb-8">{university.name}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold text-brown mb-4 text-center">University Information</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <p className="text-lg mb-2"><strong>Location:</strong> {university.location}</p>
            <p className="text-lg mb-2"><strong>Programs Offered:</strong> {university.programs_offered.join(', ')}</p>
            <p className="text-lg mb-2"><strong>Website:</strong> <a href={university.website} className="text-blue-500 underline">{university.website}</a></p>
            <p className="text-lg mb-2"><strong>Description:</strong> {university.description}</p>
          </div>
          <div>
            <p className="text-lg mb-2"><strong>Overall Rating:</strong> ⭐ {university.overall_rating.toFixed(1)}/5</p>
            <p className="text-lg mb-2"><strong>Academic Rating:</strong> ⭐ {university.academic_rating.toFixed(1)}/5</p>
            <p className="text-lg mb-2"><strong>Facilities Rating:</strong> ⭐ {university.facilities_rating.toFixed(1)}/5</p>
            <p className="text-lg mb-2"><strong>Social Life Rating:</strong> ⭐ {university.social_life_rating.toFixed(1)}/5</p>
            <p className="text-lg mb-2"><strong>Career Prospects Rating:</strong> ⭐ {university.career_prospects_rating.toFixed(1)}/5</p>
            <p className="text-lg mb-2"><strong>Cost of Living:</strong> ${university.cost_of_living}</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-brown mb-2">Image Gallery</h3>
          <div className="flex space-x-4 overflow-x-auto">
            {university.image_gallery.map((image, index) => (
              <img key={index} src={image} alt={`University ${index + 1}`} className="w-40 h-40 object-cover rounded-md" />
            ))}
          </div>
        </div>

        {isStudent && (
        <div className="flex justify-center mb-8">
          <button
            onClick={handleWriteReview}
            className="bg-brown text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-light-brown transition duration-300"
          >
            Write a Review
          </button>
        </div>
      )}
      {isReviewFormOpen && (
        <ReviewForm
          universityId={universityId}
          onClose={() => setIsReviewFormOpen(false)}
        />
      )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-brown mb-4">Reviews</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index} className="mb-6 p-5 bg-white rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-3">
                  <p className="font-bold text-xl text-brown">Overall Rating: ⭐ {review.overall_rating.toFixed(1)}/5</p>
                  <p className="text-sm text-gray-500">By: {review.user_id.username}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <p><strong>Academic:</strong> ⭐ {review.academic_rating.toFixed(1)}/5</p>
                  <p><strong>Facilities:</strong> ⭐ {review.facilities_rating.toFixed(1)}/5</p>
                  <p><strong>Social Life:</strong> ⭐ {review.social_life_rating.toFixed(1)}/5</p>
                  <p><strong>Career Prospects:</strong> ⭐ {review.career_prospects_rating.toFixed(1)}/5</p>
                  <p><strong>Cost of Living:</strong> ${review.cost_of_living}</p>
                </div>
                <p className="mt-4 text-lg text-brown">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg text-gray-700">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default UniversityDetails;

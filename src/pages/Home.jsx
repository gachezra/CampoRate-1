import React, { useState } from 'react';
import UniversityCard from '../components/UniversityCard';
import ReviewForm from '../components/ReviewForm';
import universities from '../data/universities';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  const handleReviewClick = (university) => {
    setSelectedUniversity(university);
    setIsReviewFormOpen(true);
  };

  return (
    <div className="bg-cream p-5">
      <h1 className="text-brown text-center mb-5 text-3xl font-bold">Campus Reviews</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {universities.map(university => (
          <Link to={`campus/${university.id}`}>
            <UniversityCard 
              key={university.id}
              university={university}
              onReviewClick={handleReviewClick}
            />
          </Link>
        ))}
      </div>
      {isReviewFormOpen && (
        <ReviewForm
          university={selectedUniversity}
          onClose={() => setIsReviewFormOpen(false)}
        />
      )}
    </div>
  );
};

export default Home;
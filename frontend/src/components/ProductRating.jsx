import React from 'react';

const ProductRating = ({ rating }) => {
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    
    const starsArray = Array.from({ length: fullStars }, (_, index) => (
      <span key={index}>&#9733;</span> // Full star symbol
    ));

    if (halfStar) {
      starsArray.push(<span key="half">&#9733;&#189;</span>); // Half star symbol
    }

    return starsArray;
  };

  return <div className="rating">Rating: {renderStars()}</div>;
};

export default ProductRating;

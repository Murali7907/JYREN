import React from 'react';
import { Star } from 'lucide-react';

export const StarRating = ({ 
  rating = 5, 
  maxStars = 5, 
  size = 14, 
  className = 'stars-cluster' 
}) => {
  const numericRating = Math.floor(Number(rating) || 5);

  return (
    <div className={className} aria-label={`${rating} out of ${maxStars} stars`}>
      {[...Array(maxStars)].map((_, idx) => (
        <Star
          key={idx}
          size={size}
          className={idx < numericRating ? 'star-gold-fill' : 'star-empty'}
        />
      ))}
    </div>
  );
};

export default StarRating;

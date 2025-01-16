import React from 'react';
import './LoadingIndicator.css';

interface LoadingIndicatorProps {
  isLoading: boolean
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ isLoading }) => {
  // If the isLoading prop is true, display the loading indicator
  if (isLoading) {
    return (
        <div className="spinner"></div>
    );
  } else {
    // If isLoading is false, render nothing (null)
    return null;
  }
};

export default LoadingIndicator;

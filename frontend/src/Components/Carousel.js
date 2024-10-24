import React, { useEffect, useRef } from 'react';
import specialsData from './SpecialsData';
import TodaySpeciality from './TodaySpeciality';
import './Carousel.css';

function Carousel() {
  const carouselRef = useRef(null); // Reference to the carousel container

  // Function to scroll the carousel automatically
  const scrollCarousel = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // Calculate the new scroll position
      let newScrollLeft = scrollLeft + clientWidth * 0.9; // Scroll by 90% of the width to show the next component

      // If we've reached the end, scroll back to the beginning
      if (newScrollLeft >= scrollWidth) {
        newScrollLeft = 0; // Reset to the beginning
      }

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // Set up the auto-scroll with an interval of 5 seconds
    const interval = setInterval(scrollCarousel, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="carousel-container" ref={carouselRef}>
      <div className="carousel-track">
        {specialsData.map((special, index) => (
          <div key={index} className="carousel-item">
            <TodaySpeciality
              title={special.title}
              price={special.price}
              description={special.description}
              imgUrl={special.imgUrl}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;

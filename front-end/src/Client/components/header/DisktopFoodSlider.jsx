import { useState, useEffect, useRef } from 'react';
import './DisktopFoodSlider.css';
import { useDispatch } from 'react-redux';
import { addTo_Cart } from '../../actions/action';
import { useNavigate } from 'react-router-dom';
import { fetchingProducts } from '../../../Api/fetchingData/FetchProducts';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Helper/Loading/Loading';

const DesktopFoodSlider = () => {
   const { 
    data: food_list = [], 
    isLoading: productsLoading, 
    error: productsError 
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchingProducts,
  });
  console.log('food_list', food_list);
  
  

  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const slides = (() => {
    const filteredList = food_list?.filter(i => {
      const category = i.category.name?.toLowerCase();
      return category !== 'extra' && category !== 'jus';
    });
   
    const discounted = filteredList.filter(i => i.discount !== 0);

    return discounted.length > 0 ? discounted : filteredList;
  })();
  
  // const slides = filtredlist?.slice(0, 8).map(item => ({
  //   _id: item._id,
  //   image: `http://localhost:8000/storage/${item.image_path}`,
  //   name: item.name,
  //   category: item.category_name,
  //   price: item.price
  // }));
  //  console.log(slides);
   
  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (slides?.length === 0) return;
    
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(prev => (prev === slides?.length - 1 ? 0 : prev + 1));
    }, 5000);

    return resetTimeout;
  }, [activeIndex, slides?.length]);

  const handlePrev = () => {
    if (slides?.length === 0) return;
    setActiveIndex(prev => (prev === 0 ? slides?.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (slides?.length === 0) return;
    setActiveIndex(prev => (prev === slides?.length - 1 ? 0 : prev + 1));
  };

  const addToCart = (item) => {
    dispatch(addTo_Cart(item));
    navigate('/shoupingCart');
  };
  if (productsLoading) return <div><Loading/></div>;
  if (productsError) return <div className="error-message">Error: {productsError.message}</div>;

  return (
    <div className="food-slider-container">
      {slides?.length > 0 ? (
        <div className="slider-wrapper">
          <div 
            className="slider"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides?.slice(0, 8).map((slide, index) => (
              <div className="slide" key={index}>
                <div className="slide-info">
                  <span className="category-badge">{slide.category.name}</span>
                  <h2 className="slide-title">{slide.name}</h2>
                  <div className="price-container">
                    <span className="slide-price">
                      <bdi>درهم</bdi> {slide.price}
                    </span>
                    <button 
                      className="order-button" 
                      onClick={() => addToCart(slide)}
                    >
                      اطلب الان
                    </button>
                  </div>
                </div>

                <div className="slide-content">
                  <img
                    src={`http://localhost:8000/storage/${slide.image_path}`}
                    alt={slide.name}
                    className="slide-image"
                    loading="lazy"
                    decoding="async"
                  />
                  {slide.discount !==0 && (
                  <div className="discount-label">
                    <span>{slide.discount}% تخفيض</span>
                  </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button className="control prev" onClick={handlePrev} aria-label="Previous slide">
            ❮
          </button>
          <button className="control next" onClick={handleNext} aria-label="Next slide">
            ❯
          </button>

          <div className="progress-bar">
            <div 
              className="progress" 
              style={{ 
                width: `${(activeIndex + 1) * (100 / slides.length)}%`,
                transition: 'width 5s linear'
              }}
            />
          </div>

          <div className="thumbnails">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <img 
                  src={`http://localhost:8000/storage/${slide.image_path}`} 
                  alt={`Thumbnail - ${slide.name}`}
                  className="thumbnail-image"
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-slides-message">
          No recent items to display
        </div>
      )}
    </div>
  );
};

export default DesktopFoodSlider;
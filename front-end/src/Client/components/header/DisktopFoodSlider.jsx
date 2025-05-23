import  { useState, useEffect, useRef } from 'react';
import './DisktopFoodSlider.css';
import { useDispatch, useSelector } from 'react-redux';
import { addTo_Cart } from '../../actions/action';
import { useNavigate } from 'react-router-dom';
import { food_list } from '../../../Admin/assets/assets';

const DesktopFoodSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timeoutRef = useRef(null);
  const disbatch=useDispatch()
  const navigate=useNavigate()
    // const food_list = useSelector((state) => state.admin.produits);
        
  const slides = food_list
    // .flatMap(order => order.items)
    .slice(0, 8)
    .map(item => ({
      _id:item._id,
      image: item.image,
      name: item.name,
      category: item.category,
      description: item.description,
      price: item.price
    }));
    

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if(slides.length === 0) return;
    
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return resetTimeout;
  }, [activeIndex, slides.length]);

  const handlePrev = () => {
    if(slides.length === 0) return;
    setActiveIndex(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if(slides.length === 0) return;
    setActiveIndex(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  const add_and_go_ToCart=(item)=>{
       disbatch(addTo_Cart(item)) 
       navigate('/shoupingCart')       
  }

  return (
    <div className="food-slider-container">
      {slides.length > 0 ? (
        <div className="slider-wrapper">
          <div 
            className="slider"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {slides.map((slide, index) => (
              <div 
                className="slide" 
                key={index}
              
              >
              <div className='slide-info'>
              <span className="category-badge">{slide.category}</span>
                  <h2 className="slide-title">{slide.name}</h2>
                 {/* <p className="slide-description">{slide.description}</p>*/}
                  <div className="price-container">
                    <span className="slide-price"> <bdi>درهم</bdi> {slide.price} </span>
                    <button className="order-button" onClick={()=>add_and_go_ToCart(slide )}>اطلب الان</button>
                  </div>
              </div>
                <div className="slide-content">
                <img
                  src={slide.image}
                  alt={slide.name}
                  className="slide-image"
                  loading="lazy"
                  decoding="async"
                />
                
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
            ></div>
          </div>

          <div className="thumbnails">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`thumbnail ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <img 
                  src={slide.image} 
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
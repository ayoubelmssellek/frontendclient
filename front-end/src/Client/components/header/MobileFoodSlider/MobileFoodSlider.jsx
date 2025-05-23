import  { useState, useEffect, useRef } from "react";
import "./MobileFoodSlider.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addTo_Cart } from "../../../actions/action";

const MobileFoodSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const listimg = useSelector((state) => state.client.food_list) || [];

  const slides = listimg
        .slice(0, 8)
        .map((item) => ({
            _id: item._id,
            image: item.image,
            name: item.name,
            category: item.category,
            shortDesc: item.description,
            price: item.price,
        }));

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (slides.length === 0) return;

    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => resetTimeout();
  }, [activeIndex, slides.length]);

  const handlePrev = () => {
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    if (slides.length === 0) return;
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX); 
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX); 
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      handleNext();  
    }
    if (touchStart - touchEnd < -50) {
      handlePrev(); 
    }
  };

  const addAndGoToCart = (item, e) => {
    e.stopPropagation(); 
    dispatch(addTo_Cart(item));
    navigate("/shoupingCart");
  };

  return (
    <div className="mobile-food-slider">
      {slides.length > 0 ? (
        <div
          className="slider-container"
          onTouchStart={handleTouchStart} 
          onTouchMove={handleTouchMove} 
          onTouchEnd={handleTouchEnd} 
        >
          <div className="slider-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {slides.map((slide, index) => (
              <div className="mobileslide" key={index}>
                <div className="mobileslideimg">
                  <img src={slide.image} alt={slide.name} />
                </div>

                <div className="text-overlay">
                <span className="Product-category">{slide.category}</span>
                  <h3 className="Product-name">{slide.name}</h3>
                 <div className="prixandbutton">
                 <button className="button-order" onClick={(e) => addAndGoToCart(slide, e)}>
                    اطلب الآن
                  </button>
                 <span className="slide-price">
                    <bdi>درهم</bdi> {slide.price}
                  </span>
                 
                 </div>
                </div>
              </div>
            ))}
          </div>

          <div className="progress-dots">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="no-slides-message">لا توجد عناصر حديثة للعرض</div>
      )}
    </div>
  );
};

export default MobileFoodSlider;

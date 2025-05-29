import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MdAddShoppingCart, MdRemove, MdAdd, MdFavorite, MdFavoriteBorder } from "react-icons/md";
import styles from './ProductPageDiskTopVersion.module.css';
import { addTo_Cart, addTo_Favorite, DicreaseQuantity } from '../../actions/action';
import { FaArrowRight } from 'react-icons/fa';
import { fetchingProducts } from '../../../Api/fetchingData/FetchProducts';
import { useQuery } from '@tanstack/react-query';
import ProductReviews from '../Reviews/ProductReviews';

const ProductPageDiskTopVersion = () => {
  const {data:produits, loading, error} = useQuery({
    queryKey: ['products'],
    queryFn:fetchingProducts
  });
  
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const {  cartItems, Favorite } = useSelector((state) => state.client);
  
  const product = produits?.find(item => item.id == id);
   const extraItems=produits?.filter((item)=>item.category.name.toLowerCase() == 'extra')
  
  const inCart = cartItems.some(item => item.id == id);
  const isFavorite = Favorite.some(item => item.id == id);
  const isextraincart =(id)=>{
    return cartItems.some(item => item.id == id);
  }

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <h2 className={styles.errorTitle}>Product Not Found</h2>
        <p>The requested product does not exist.</p>
      </div>
    );
  }

  return (
    <>
    <div className={styles.container}>
      <div className={styles.header}>
              <button className={styles.backButton} onClick={() => navigate(-1)}>
                <FaArrowRight className={styles.backIcon} />
                رجوع
              </button>
            </div>
      {/* Product Image Section */}
     <div className={styles.containerContent}>
     <div className={styles.imageContainer}>
        <img 
          src={`http://localhost:8000/storage/${product.image_path}`} 
          alt={product.name} 
          className={styles.productImage} 
          loading="lazy" 
        />
      </div>

      {/* Product Info Section */}
      <div className={styles.infoSection}>
        {/* Favorite Button - Top Right */}
        <button
          className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
          onClick={() => dispatch(addTo_Favorite(product, product.id))}
        >
          {isFavorite ? (
            <MdFavorite size={24} />
          ) : (
            <MdFavoriteBorder size={24} />
          )}
        </button>

        <h1 className={styles.productTitle}>{product.name}</h1>
        <span className={styles.productCategory}>{product.category.name}</span>
        <p className={styles.productDescription}>{product.description}</p>

        {/* Extra Items Section */}
        <div className={styles.extraItemsSection}>
            <h3 className={styles.extraItemsTitle}>إضافات إختيارية</h3>
            <div className={styles.extraItemsContainer}>
                {extraItems.map((product) => (
                    <div key={product.id} className={styles.extraItem}>
                        <img 
                          src={`http://localhost:8000/storage/${product.image_path}`} 
                            alt={product.name} 
                            className={styles.extraItemImage} 
                        />
                       {
                        !isextraincart(product.id) ?(
                          <button 
                          className={styles.addExtraButton}
                          onClick={() => {
                              dispatch(addTo_Cart(product))
                          
                          }}
                      >
                          <MdAdd size={16} />
                      </button>
                        ):(
                          <button 
                          className={styles.addExtraButton}
                          onClick={() => dispatch(DicreaseQuantity(product.id))}

                      >
                          <MdRemove size={16} />
                      </button>
                        )
                       }
                    </div>
                ))}
            </div>
        </div>
    <hr style={{border: '1px  solid whitesmoke', width: '100%',margin:"5px 0px"}}/>

        <div className={styles.priceSection}>
          <div className={styles.priceContainer}>
             {product.oldPrice ? ( 
             <span className={styles.OldPrice}>
               <bdi>درهم</bdi> {product.price}
              </span>
           ):('')} 
            <span className={styles.price}>
            <bdi>درهم</bdi> {product.oldPrice ? product.oldPrice :product.price} 
            </span>
          </div>

          {inCart ? (
            <div className={styles.quantityControls}>
              <button
                className={styles.quantityButton}
                onClick={() => dispatch(DicreaseQuantity(product.id))}
              >
                <MdRemove size={20} />
              </button>
              <span className={styles.quantity}>
                {cartItems.find(item => item.id === product.id)?.quantity}
              </span>
              <button
                className={styles.quantityButton}
                onClick={() => dispatch(addTo_Cart(product))}
              >
                <MdAdd size={20} />
              </button>
            </div>
          ) : (
            <button
              className={styles.cartButton}
              onClick={() => dispatch(addTo_Cart(product))}
              disabled={product.status=='out_of_stock'}

            >

            {
              product.status =='out_of_stock' ?(
                <p>غير متوفر حاليا</p> 
              ) :(
               <>
                <MdAddShoppingCart size={20} />
                <p>  أضف إلى السلة</p>
               </>
               
              )

            }
            </button>
          )}
        </div>
      </div>
     </div>
    </div>
    <ProductReviews id={product.id}/>
    </>
  );
};

export default ProductPageDiskTopVersion; 
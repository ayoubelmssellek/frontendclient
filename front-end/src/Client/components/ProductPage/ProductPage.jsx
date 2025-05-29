import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { BsBagFill } from "react-icons/bs";
import { 
    MdArrowBackIos, 
    MdAddShoppingCart, 
    MdRemove, 
    MdAdd, 
    MdFavorite, 
    MdFavoriteBorder 
} from "react-icons/md";
import styles from './ProductPage.module.css';
import { addTo_Cart, addTo_Favorite, DicreaseQuantity } from '../../actions/action';
import { FaArrowRight } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { fetchingProducts } from '../../../Api/fetchingData/FetchProducts';
import ProductReviews from '../Reviews/ProductReviews';

const ProductPage = () => {
    const { data: food_list, loading, error } = useQuery({
        queryKey: ['products'],
        queryFn: fetchingProducts
    });
    const { id } = useParams();
    const dispatch = useDispatch();
    const { cartItems, Favorite, cartAmount } = useSelector((state) => state.client);

    const extraItems = food_list?.filter((item) => item.category.name.toLowerCase() == 'extra');
    const product = food_list?.find(item => item.id == id);
    const inCart = cartItems.some(item => item.id == id);
    const isFavorite = Favorite.some(item => item.id == id);
    const isextraincart = (id) => cartItems.some(item => item.id == id);

    if (!product) {
        return <div>Product not found</div>;
    }
    if (loading) return <div className={styles.loading}>Loading...</div>;
    if (error) return <div className={styles.error}>Error: {error.message}</div>;

    return (
        <div className={styles.container}>
            <div className={styles.headerContent}>
                <div className={styles.goBackAndNav}>
                    <Link to="/">
                        <FaArrowRight style={{transform:'scaleX(-1)'}} size={30} />
                    </Link>
                    <Link to="/shoupingCart">
                        <div className={styles.bagFill}>
                            <BsBagFill size={30} />
                            {cartAmount > 0 && <span className={styles.cartBadge}>{cartAmount}</span>}
                        </div>
                    </Link>
                </div>
                <div className={styles.imageContainer}>
                    <img 
                        src={`http://localhost:8000/storage/${product.image_path}`}    
                        alt={product.name} 
                        className={styles.productImage} 
                        loading="lazy" 
                    />
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.productInfo}>
                    <div className={styles.productHeader}>
                        <div className={styles.titleGroup}>
                            <h1 className={styles.productTitle}>{product.name}</h1>
                            <h4 className={styles.productCategory}>{product.category.name}</h4>
                        </div>
                        <button
                            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteButtonActive : ''}`}
                            onClick={() => dispatch(addTo_Favorite(product, product.id))}
                        >
                            {isFavorite ? <MdFavorite size={28} /> : <MdFavoriteBorder size={28} />}
                        </button>
                    </div>
                    
                    <p className={styles.productDescription}>{product.description}</p>
                    
                    <div className={styles.extraItemsSection}>
                        <h3 className={styles.extraItemsTitle}>إضافات إختيارية</h3>
                        <div className={styles.extraItemsContainer}>
                            {extraItems.map((item) => (
                                <div key={item.id} className={styles.extraItem}>
                                    <img 
                                        src={`http://localhost:8000/storage/${item.image_path}`} 
                                        alt={item.name} 
                                        className={styles.extraItemImage} 
                                    />
                                    {!isextraincart(item.id) ? (
                                        <button 
                                            className={styles.addExtraButton}
                                            onClick={() => dispatch(addTo_Cart(item))}
                                        >
                                            <MdAdd size={16} />
                                        </button>
                                    ) : (
                                        <button 
                                            className={styles.addExtraButton}
                                            onClick={() => dispatch(DicreaseQuantity(item.id))}
                                        >
                                            <MdRemove size={16} />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                
                <hr className={styles.divider} />
                
                <div className={styles.priceAndButton}>
                    <div className={styles.priceContainer}>
                        {product.oldPrice && ( 
                            <span className={styles.OldPrice}>
                                <bdi>درهم</bdi> {product.price}
                            </span>
                        )} 
                        <span className={styles.price}>
                            <bdi>درهم</bdi> {product.oldPrice ? product.oldPrice : product.price} 
                        </span>
                    </div>

                    {!inCart ? (
                        <button
                            className={styles.addToCartButton}
                            onClick={() => dispatch(addTo_Cart(product))}
                        >
                            <MdAddShoppingCart size={24} />
                            أضف إلى السلة
                        </button>
                    ) : (
                        <div className={styles.quantityControls}>
                            <button
                                className={styles.quantityButton}
                                onClick={() => dispatch(DicreaseQuantity(product.id))}
                            >
                                <MdRemove size={24} />
                            </button>
                            <strong>
                                {cartItems.find(item => item.id === product.id)?.quantity}
                            </strong>
                            <button
                                className={styles.quantityButton}
                                onClick={() => dispatch(addTo_Cart(product))}
                            >
                                <MdAdd size={24} />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className={styles.reviewsSection}>
                <ProductReviews id={product.id} />
            </div>
        </div>
    );
};

export default ProductPage;

// import React, { useState, useEffect } from "react";

// import "primeicons/primeicons.css";
// import './FoodDisplayMobileVersion.css'
// import { assets, food_list } from "../../assets/assets";
// import { useDispatch, useSelector } from "react-redux";
// import { addTo_Cart, cart_amount, DicreaseQuantity, shoping_cart } from "../../actions/action";

// const FoodDisplayMobileVersion = () => {
//   const CartItems = useSelector((state) => state.cartItems);
//   const [salad,setsalad]=useState([]) 
//   const food_list = useSelector((state) => state.food_list);
//   console.log(food_list);
  
//   const filteredSaladList = food_list.filter(item => item.category === 'Rolls');
//   const groupedFood = food_list.reduce((acc, item) => {
//      if(!acc[item.category]){
//       acc[item.category]=[]
//      }
//      acc[item.category].push(item)
//      return acc

//   },{})

//   const  groubedArray=Object.entries(groupedFood).map(([category,items])=>(
//     {
//       category,
//       items
//     }
//   ))
//   console.log(groubedArray);
  
  
  
  
  
  

//   useEffect(() => {
//     setsalad(filteredSaladList);
//   }, [food_list]);

//   const isInCart = (id) => {
//     return CartItems.some((item) => item._id === id);
//   };



//   const dispatch = useDispatch();

//   const handelAddItem = (produit) => {
//     dispatch(addTo_Cart(produit));
//   };

//   const DicreaseProdectQauntity = (id, item) => {
//     dispatch(DicreaseQuantity(id, item));
//   };


   
//   return (
//     <>
//     {
//       groubedArray.map(item=>
//         <div className="Food-desplay">
//       <hr className="Hr" />
//       <h1 className="QategoryName"> {item.category}</h1>
//         <div className="Food-desplay-list">
//           {item.items.map((item) => (
//             <div key={item._id} className="Cart">
//               <img src={item.image} alt={item.name} />
//               <div className="Food_item_info">
//                 <div className="Food_item_img_raiting">
//                   <p>{item.name}</p>
//                 </div>
//                 {/* <p className="food_item_desc">{item.description}</p> */}
//                 <div className="Price_and_button">
//                   <p className="Food_item_price"><span style={{marginRight:'7px'}}>درهم</span> {item.price}.00</p>
//                   {!isInCart(item._id) ? (
//                     <button
//                       className="Food_item_button"
//                       onClick={() => handelAddItem(item)}
//                     >
//                       Add to cart
//                     </button>
//                   ) : (
//                     <div className="Inc_or_dec_amount">
//                       <img
//                         onClick={() => DicreaseProdectQauntity(item._id, item)}
//                         src={assets.remove_icon_red}
//                         alt="Remove"
//                       />
//                       <strong>
//                         {CartItems.find((cartitem) => cartitem._id === item._id)
//                           ?.Quantity}
//                       </strong>
//                       <img
//                         onClick={() => handelAddItem(item)}
//                         src={assets.add_icon_green}
//                         alt="Add"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//     </div>
//       )
//     }
//     </>
//   );
// };

// export default FoodDisplayMobileVersion;

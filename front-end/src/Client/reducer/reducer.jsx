import { cart_amount } from "../actions/action";
import { food_list } from "../../Admin/assets/assets";
import { toast } from "react-toastify";
import { t } from "i18next";

const initState = {
    food_list:food_list,
    cartItems:localStorage.getItem('cartItems')?
              JSON.parse(localStorage.getItem('cartItems')):[],
    cartAmount:localStorage.getItem('cartAmount')?
                JSON.parse(localStorage.getItem('cartAmount')):0,
    product_info:[] , 
    Favorite:localStorage.getItem('FavoriteList')?
              JSON.parse(localStorage.getItem('FavoriteList')):[] ,
    orders: localStorage.getItem('orders')?
            JSON.parse(localStorage.getItem('orders')) :[],  
    reviews: localStorage.getItem('review')?
            JSON.parse(localStorage.getItem('review')) :[]  ,
    Users:[
            { id: 1, username: 'mustapha', Number_Phon: '0640606282', password: '1234', role: 'Directeur' },
            { id: 2, username: 'Mohssine', Number_Phon: '0644666688', password: '0000', role: 'Manager' },
            { id: 3, username: 'ayoub', Number_Phon: '0673897450', password: '4444', role: 'client' },
          ],
    toggelModalOpen:false,
    toggelcheckoutClicked:false,
    showRegister: false
  };
  
  
  export const ClientReducer = (state = initState, action) => {
    switch (action.type) {
      case 'addTo_cart': {
        const isMobile=window.innerWidth <= 576;
        const findIndex = state.cartItems.findIndex(
          (item) => item.id === action.produit.id
        );
      
        if (findIndex >=0) {
          const updatedCartItems = state.cartItems.map((item, index) =>
            index === findIndex
              ? { ...item, quantity: item.quantity + 1 } 
              : item 
          );
       
            toast.success(`Incease ${state.cartItems[findIndex].name} Quantity`,{
              position:isMobile ? 'top-left' :'bottom-left',
          
              style:isMobile?{ 
                display:'none',
              }:{
             
              }
            
              
            } )
          
          localStorage.setItem('cartItems',JSON.stringify(updatedCartItems))

          return {
            ...state,
            cartItems: updatedCartItems, 
          };
        } else {
          const newProduit = { ...action.produit, quantity: 1 };
          const updatedCartItems = [...state.cartItems, newProduit]; 
          localStorage.setItem('cartItems',JSON.stringify(updatedCartItems))
          localStorage.setItem('cartAmount',JSON.stringify(updatedCartItems.length))
          toast.success(`Product ${action.produit.name} added to cart`,{
            position:isMobile ? 'top-left' :'bottom-left',
            style:isMobile?{ 
            display:'none'
            }:{
           
            }
          
            
          } )

          return {
            ...state,cartItems:updatedCartItems,
           cartAmount: updatedCartItems.length,
          };
        }
      }
      case 'DicreaseQuantity': {
        const isMobile=window.innerWidth <= 576;
        const findIndexDic = state.cartItems.findIndex(item => item.id === action.paytoad.id);
      
        if (findIndexDic >= 0) {
          const updatedCartItems = state.cartItems.map((item, index) =>
            index === findIndexDic
              ? { ...item, quantity: item.quantity - 1 }
              : item
          );
          toast.info(`Dicrease ${updatedCartItems[findIndexDic].name} Quantity`,{
            position:isMobile ? 'top-left' :'bottom-left',
            style:isMobile?{ 
             display:'none'
            }:{
           
            }
          
            
          } )
          const filteredCartItems = updatedCartItems.filter(item => item.quantity > 0);

          localStorage.setItem('cartItems', JSON.stringify(filteredCartItems));
          localStorage.setItem('cartAmount',JSON.stringify(filteredCartItems.length))    
          return { ...state, cartItems: filteredCartItems,
            cartAmount: filteredCartItems.length,


           };
        }}

        case 'clear':
          return{
            ...state,cartItems:[],
            cartAmount:0

          }
          case 'addTo_Favorite': {
            const correntFavoriteList=localStorage.getItem('FavoriteList')?
            JSON.parse(localStorage.getItem('FavoriteList')):[]  
            const inList = correntFavoriteList.some(item => item.id === action.payload.id);
        
            let updatedList = inList
                ? correntFavoriteList.filter(item => item.id !== action.payload.id)  
                : [...state.Favorite, action.payload.product];  
             
            localStorage.setItem('FavoriteList', JSON.stringify(updatedList));
        
            return {
                ...state,
                Favorite: updatedList
            };
        }
        
          case 'addorder':{
            let updatedorders=[...state.orders,action.order]
            localStorage.setItem('orders',JSON.stringify(updatedorders))
             return{
            ...state,orders:updatedorders,
             
           }
          }
          case 'addreview':{
            let updatedreviews=[...state.reviews,action.review]
            localStorage.setItem('review',JSON.stringify(updatedreviews))
             return{
            ...state,reviews:updatedreviews,
             
           }
          }
          case 'AddUser':{
            let updatedUsers=[...state.Users,action.user]
            return{
            ...state,Users:updatedUsers,
             
           }
          }
          case 'SET_REORDER': {
            const updatedCartItems = [...state.cartItems];
          
            action.reorder.forEach((item) => {
              // استخدم product_id إذا كان موجود
              const productId = item.product_id || item.id;
              const reorderQuantity = Number(item.quantity) || 1;
          
              const findIndex = updatedCartItems.findIndex(
                (cartItem) => Number(cartItem.id) === Number(productId)
              );
          
              if (findIndex >= 0) {
                // زيد quantity
                updatedCartItems[findIndex].quantity += reorderQuantity;
              } else {
                // أول مرة يضيفه
                updatedCartItems.push({
                  ...item,
                  id: productId,
                  quantity: reorderQuantity,
                });
              }
            });
          
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            localStorage.setItem("cartAmount", JSON.stringify(updatedCartItems.length));
          
            return {
              ...state,
              cartItems: updatedCartItems,
              cartAmount: updatedCartItems.length,
            };
          }
          
          case 'toggelModalOpen':
            return{
              ...state,toggelModalOpen:!state.toggelModalOpen
            }
            case 'toggelcheckoutClicked':
            return{
              ...state,toggelcheckoutClicked:!state.toggelcheckoutClicked
            }
            case 'TOGGLE_REGISTER':
      return {
        ...state,
        showRegister: !state.showRegister
      };
            
          
          
          
        
       






      default:
        return state;  
    }
  };
  
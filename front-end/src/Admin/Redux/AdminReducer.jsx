import { Employees } from "../assets/assets";
import {menu_list} from '../assets/assets'
import { food_list } from "../assets/assets";
import { type_list } from "../assets/assets";
const initialState = {
    produits:food_list,
    Employees:Employees,
    Notifications:localStorage.getItem('notificationListe')?
    JSON.parse(localStorage.getItem('notificationListe')):[],
    ListeCategory:menu_list,
    reviews: localStorage.getItem('review')?
    JSON.parse(localStorage.getItem('review')):[],
    ListeTypes:type_list,
    orders:localStorage.getItem('orders')?
    JSON.parse(localStorage.getItem('orders')) :[]
};
export const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PRODUCT':{
            let allproducts=[...state.produits,action.payload]
            localStorage.setItem('products',JSON.stringify(allproducts))
            return { ...state, produits:allproducts  };
        }
        case 'DELETE_PRODUCT':
            return {
                ...state,
                produits: state.produits.filter((product) => product._id !== action.payload),
            };

        case 'UPDATE_PRODUCT':{
            let updatedproduit=state.produits.map((product) =>
                Number(product._id) === Number(action.payload.id ) ? { ...product, ...action.payload.newProduit } : product)
            localStorage.setItem('products',JSON.stringify(updatedproduit))
            return {
                ...state,
                produits: updatedproduit
                
            };
      }
      case 'UPDATE_PRODUCT_STATUS':{
               const updateproductsstatus= state.produits.map(product =>
                product._id === action.payload.id 
                  ? { ...product, status: action.payload.status } 
                  : product
              )
              localStorage.setItem('products',JSON.stringify(updateproductsstatus))

            return {
            ...state,
            produits:updateproductsstatus
        }};

        case 'UPDATE_TYPE_STATUS':{
               const  updateproductsstatus_byType= state.produits.map(product => 
                product.type == action.payload.type && product.disponible==false
                    ? { ...product, status: action.payload.newState }
                    : product
                )
                localStorage.setItem('products',JSON.stringify(updateproductsstatus_byType))
                

            return {
                ...state,
                produits:updateproductsstatus_byType
        }};
        
        case 'UPDATE_TYPE_STATUS_FROM_TYPES':
            return {
                ...state,
                ListeTypes: state.ListeTypes.map(product => 
                product.type_name === action.payload.type 
                    ? { ...product, status: action.payload.newState }
                    : product
                )
        };

        case 'ADD_Employee':
            return { ...state, Employees: [...state.Employees,action.payload] };

        case 'DELETE_Employee':
            return {
                ...state,
                Employees: state.Employees.filter((Employee) => Employee.Id_Employee !== action.payload),
            };
    
        case 'UPDATE_Employee':
            return {
                ...state,
                Employees: state.Employees.map((Employee) =>
                    Number(Employee.Id_Employee) === Number(action.payload.id ) ? { ...Employee, ...action.payload.newEmployee } : Employee
                ),
            };

        case 'AddNotification':{
            let notificationListe= [...state.Notifications,action.notification]
            localStorage.setItem('notificationListe',JSON.stringify(notificationListe))
            return { ...state, Notifications: notificationListe };

          }
             

        case 'ClearNotificationListe':
            return { ...state, Notifications: [] };
            
  
        case 'ADD_Category':{
            const newCC=[...state.ListeCategory, action.payload.newCategory]
            localStorage.setItem('ListeCategories',JSON.stringify(newCC))
            return {
                ...state,
                ListeCategory:newCC
              };
        }

        case 'HANDEL_REVIEW':{
              const updatedReviews = state.reviews.map((review) =>
              review.id === action.payload.id
                ? { ...review, statu: action.payload.statu }
                : review
            );
      
            localStorage.setItem('review', JSON.stringify(updatedReviews));
      
            return {
              ...state,
              reviews: updatedReviews,
            };
        }
          
        case 'UPDATE_PRODUCT_state':{
            const update_Prod_state = state.produits.map((prod) =>
                prod.category === action.payload.name
              ? { ...prod, status: action.payload.newState }
              : prod
          );
          localStorage.setItem('products', JSON.stringify(update_Prod_state));

          return {
            ...state,
            produits: update_Prod_state,
          };
      }
      
                
    case 'UPDATE_ORDER_STATUS':{
        const update_Order_state = state.orders.map((order) =>
            order.id === action.payload.orderId
          ? { ...order, statusOrder: action.payload.newStatus }
          : order
      );
        localStorage.setItem('orders', JSON.stringify(update_Order_state));
        return {
            ...state,
            orders: update_Order_state
            
        };
    }
      
    default:
            return state;
    }
};


export default reducer; // ✅ Ensure export default
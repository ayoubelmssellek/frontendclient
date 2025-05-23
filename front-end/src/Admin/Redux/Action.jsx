// Products Actions
export const Add=(id)=>{
    return{
      type:'ADD_PRODUCT',
      payload:id
    }
}
export const Delete=(id)=>{
    return{
      type:'DELETE_PRODUCT',
      payload:id
    }
}
export const Edit=(id,newProduit)=>{
  return{
    type:'UPDATE_PRODUCT',
    payload:{id,newProduit}
  }
}
export const EditState=(name,newState)=>{
  return{
    type:'UPDATE_PRODUCT_state',
    payload:{name,newState}
  }
}

export const UpdateStatusByType = (type,newState) => ({
  type: 'UPDATE_TYPE_STATUS',
  payload: {type,newState}
});
export const UpdateStatusFromType = (type,newState) => ({
  type: 'UPDATE_TYPE_STATUS_FROM_TYPES',
  payload: {type,newState}
});


export const UpdateStatus = (id, status) => ({
  type: 'UPDATE_PRODUCT_STATUS',
  payload: { id, status }
});
// Employees Actions

export const AddEmployee=(id)=>{
  return{
    type:'ADD_Employee',
    payload:id
  }
}
export const DeleteEmployee=(id)=>{
  return{
    type:'DELETE_Employee',
    payload:id
  }
}
export const EditEmployee=(id,newEmployee)=>{
return{
  type:'UPDATE_Employee',
  payload:{id,newEmployee}
}
}


export const AddNotification=(notification)=>{
  return{
      type:'AddNotification',
      notification
  }
}
export const ClearNotificationListe=()=>{
  return{
      type:'ClearNotificationListe',
      
  }
}

export const UpdateOrderStatus = (orderId, newStatus) => ({
  type: 'UPDATE_ORDER_STATUS',
  payload: { orderId, newStatus },
});


// Add category 
export const ADDCategory = (newCategory) => ({
  type: 'ADD_Category',
  payload: {newCategory},
});

export const HandelReview = (id,statu) => ({
  type: 'HANDEL_REVIEW',
  payload: {id,statu},
});

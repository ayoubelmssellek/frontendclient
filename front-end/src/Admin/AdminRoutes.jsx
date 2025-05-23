// import './App.css'
import './AdminStyles/Adminindex.css'
 import 'preline';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Products from './Pages/Products/Products';
import Dashboard from './Dashboard/Dashboard';
import Employees from './Employees/ListEmployees/Employees';
import ListeOrders from './Orders/ListeOrders';
import ViewOrderDetails from './ViewOrderDetails/ViewOrderDetails';

import Categoreis from './Categories/Categoreis';
import ViewCategoryDetails from './Categories/ViewCategoryDetails';
import ListeOffers from './SpicialOffers/ListeOffers';

import AdminProfile from './AdminProfile/AdminProfile';
import Notification from './Notification/Notifiication'
import SalesCompenent from './Sales/SalesCompenent/SalesCompenent';
import Customers from './Customers/Customers';
import  Reviews  from './Reviews/Reviews';
import TypeCompenet from './Types/TypesCompenet/TypesCompenet';
// import Login from './Admin/Pages/Login/Login';
import {Route, Routes } from 'react-router-dom';
function AdminRoutes() {
  

return (
    <div>
        <Routes>
          <Route path='/Dashboard/:role' element={<Dashboard/>} />
          <Route path='/Dashboard/:role/Products' element={<Products/>} />
          <Route path='/Dashboard/:role/Products/:Code' element={<Products/>} />
          <Route path='/Dashboard/:role/Employees' element={<Employees/>} />
          <Route path='/Dashboard/:role/ListeOrders' element={<ListeOrders/>} />
          <Route path='/Dashboard/:role/ViewOrderDetails/:Code' element={<ViewOrderDetails/>} />
          <Route path='/Dashboard/:role/Reviews' element={<Reviews/>} />
          <Route path='/Dashboard/:role/Categories' element={<Categoreis/>} />
          <Route path='/Dashboard/:role/Types' element={<TypeCompenet/>} />
          <Route path='/Dashboard/:role/Notification' element={<Notification/>} />
          <Route path='/Dashboard/:role/ViewCategoryDetails/:nameCategory' element={<ViewCategoryDetails/>} />
          <Route path='/Dashboard/:role/ListeOffers' element={<ListeOffers/>} />
          <Route path='/Dashboard/:role/AdminProfile' element={<AdminProfile/>} />
          <Route path='/Dashboard/:role/SalesCompenent' element={<SalesCompenent/>} />
          <Route path='/Dashboard/:role/Customers' element={<Customers/>} />
        </Routes>
    </div>
  )
}

export default AdminRoutes
{/* <Route path='/Login' element={<Login/>} /> */}
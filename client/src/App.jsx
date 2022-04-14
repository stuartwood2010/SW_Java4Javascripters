import { Routes, Route } from 'react-router-dom';
// import Cart from './pages/cart/Cart';
import Homepage from './pages/Homepage';
import Store from './pages/Store';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Detail from './pages/Detail';
import Navbar from './components/navbar/Navbar';
import { StoreProvider } from './utils/GlobalState';
import Cart from './components/cart/Cart';
import './style.scss';

function App() {
  return (
    <div className="sections">
      <StoreProvider>
        <div> 
          <Navbar/>
          <Routes>
            <Route
                path='/'
                element={<Homepage/>}
              />
              <Route
                path='/store'
                element={<Store/>}
              />
              <Route 
                path="/success" 
                element={<Success />} 
              />
              <Route 
                path="/orderHistory" 
                element={<OrderHistory />} 
              />
              <Route 
                path="/products/:id" 
                element={<Detail />} 
              />
          </Routes>                    
          <Cart/> 
        </div>
      </StoreProvider>    
    </div>
  )
}
export default App;
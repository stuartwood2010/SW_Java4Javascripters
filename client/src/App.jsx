import { Routes, Route } from 'react-router-dom';
import Cart from './pages/cart/Cart';
import Homepage from './pages/homepage/Homepage';
import Menu from './pages/menu/Menu';
import Store from './pages/store/Store';
import Navbar from './components/navbar/Navbar';
import { StoreProvider } from './utils/GlobalState';
import './app.scss';

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
                path='/menu'
                element={<Menu/>}
              />
              <Route
                path='/cart'
                element={<Cart/>}
              />
          </Routes>
        </div>
      </StoreProvider>    
    </div>
  )
}
export default App;
// import { useQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Homepage } from './pages/Homepage';
import { Menu } from './pages/Menu';
import { Store } from './pages/Store';
import Navbar from './components/Navbar';

function App() {
  return (
    <div>
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
    </div>
  )
}

export default App;
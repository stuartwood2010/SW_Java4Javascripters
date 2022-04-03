// import { useQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Homepage } from './pages/Homepage';
import { Login } from './pages/Login';
import { Menu } from './pages/Menu';
import { SignUp } from './pages/Signup';
import { Store } from './pages/Store';

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route
              path='/'
              element={<Homepage/>}
            />
            <Route
              path='/signup'
              element={<SignUp/>}
            />
            <Route
              path='/login'
              element={<Login/>}
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
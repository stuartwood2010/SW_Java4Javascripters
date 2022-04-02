// import { useQuery } from '@apollo/client';
import { Routes, Route } from 'react-router-dom';

import { Cart } from './components/Cart';
import { Homepage } from './components/Homepage';
import { Login } from './components/Login';
import { Menu } from './components/Menu';
import { SignUp } from './components/Signup';
import { Store } from './components/Store';

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

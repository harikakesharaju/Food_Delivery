import './App.css';
import Home from './Screens/Home';
import Login from './Screens/Login';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
//import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
import Signup from './Screens/Signup';
import { CardProvider } from './Components/ContextReducer';
import Cart from './Screens/Cart';
import Myorder from './Screens/Myorder';

function App() {
  return (
    <CardProvider>
      <Router>
    <div>
      <Routes> 
      <Route path='/' element={<Home/>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/createuser' element={<Signup></Signup>}></Route>
      <Route path='/myorders' element={<Myorder/>}></Route>
      </Routes>
    </div>
    </Router>
    </CardProvider>
    
  );
}

export default App;

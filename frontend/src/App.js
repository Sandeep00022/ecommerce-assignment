import logo from './logo.svg';
import './App.css';
import AddProduct from './components/AddProduct';
import Navbar from './components/Navbar';
import AllRoutes from './routers/AllRoutes';

function App() {
  return (
    <div className="App">
      <AllRoutes/>
    </div>
  );
}

export default App;

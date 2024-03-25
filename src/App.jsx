
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Cards from './components/pages/Cards';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/cards'>
            <Route path='klaysimai' element={<Cards />}/>
          </Route>
          <Route path='/user'>
            <Route path='login' element={<Login />}/>
            <Route path='register' element={<Register />}/>
          </Route>
        </Routes>
      </main>
      <Footer/>
    </>
    
  );
}

export default App;

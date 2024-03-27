
import './App.css';
import { Route, Routes} from 'react-router-dom';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Questions from './components/pages/Questions';
import Header from './components/UI/Header';
import Footer from './components/UI/Footer';
import AddNewQuestion from './components/pages/AddNewQuestion';
import OneQuestionPage from './components/pages/OneQuestionPage';


function App() {



  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route index element={<Home />}/>
          <Route path='/questions'>
            <Route path='klausimai' element={<Questions />}/>

            <Route path='naujas_klausimas' element={ <AddNewQuestion/>}/>
            <Route path=':id' element={<OneQuestionPage />}/>
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

//Pages
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
//Components
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
//3rd Party Libraries
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route index path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

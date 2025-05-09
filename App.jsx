import { Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Nav from './pages/components/Nav';
import Footer from './pages/components/Footer';
import Book from './pages/Book';
import BookSearch from './pages/Admin/BookSearch';
import AdminAddHotel from './pages/Admin/AdminAddHotel';
import ShowHotels from './pages/ShowHotels';
import Profile from './pages/Profile';

function App() {
  const location = useLocation();

  const isHome = location.pathname === '/home';

  return (
    <>
      {isHome && <Nav />}
      
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="/hotels" element={<ShowHotels />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/booksearch" element={<BookSearch />} />
        <Route path="/adminaddhotel" element={<AdminAddHotel />} />


      </Routes>
      
      {isHome && <Footer />}
    </>
  );
}

export default App;

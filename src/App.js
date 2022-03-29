import React, {useState, useEffect} from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import MainNavbar from './components/navigation/MainNavbar';
import SubNavbar from './components/navigation/SubNavbar';
import About from './pages/About/About';
import Footer from './components/Footer';
import MyBookings from './pages/MyBookings/MyBookings';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CreateService from './pages/CreateService/CreateService';
import MyServicePage from './pages/MyServicePage';
import PageNotFound from './pages/PageNotFound';
import ExperiencesPage from './pages/ExperiencesPage/ExperiencesPage';
import EditService from './pages/EditService/EditService';
import BookExperience from './pages/BookExperience/BookExperience';
import BookingRequests from './pages/BookingRequests/BookingRequests';

function App() {

  const [user, setUser] = useState(null);
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) {
      let userDoc = JSON.parse(atob(token.split('.')[1])).user // decode jwt token
      setUser(userDoc)      
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <MainNavbar user={user} setUser={setUser}/>
        <SubNavbar user={user} />
          <Routes>
            <Route path='/' element={<About />} />
            <Route path='/login' element={<LoginPage setUser={setUser}/>} />
            <Route path='/signup' element={<SignUpPage setUser={setUser}/>} />
            <Route path='/my-service' element={<MyServicePage user={user} />} />
            <Route path='/edit-service' element={<EditService />} />
            <Route path='/experiences' element={<ExperiencesPage />} />
            <Route path='/book-experience/:experienceId' element={
            user ? <BookExperience />
            :
            <LoginPage setUser={setUser} />
            } />
            <Route path='/my-bookings' element={
              user ? <MyBookings />
              :
              <LoginPage setUser={setUser}/>
            }/>
            <Route path='/create-service' element={
              user?.isServiceProvider ? <CreateService />
              :
              <PageNotFound />
            } />
            <Route path='/booking-requests' element={
              user?.isServiceProvider ? <BookingRequests />
              :
              <PageNotFound />
            } />
          </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

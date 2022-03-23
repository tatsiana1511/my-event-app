import logo from './logo.svg';
import './App.css';
import MainNavbar from './components/navigation/MainNavbar';
import SubNavbar from './components/navigation/SubNavbar';
import About from './About';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <MainNavbar />
      <SubNavbar />
      <About />
      <Footer />
    </div>
  );
}

export default App;

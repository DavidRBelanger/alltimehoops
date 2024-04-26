import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles/Homepage.css';
import Nav from './Components/Nav.js';
import logo from './Images/logo.png';
import Year from './Components/Year';
import Support from './Support.js';
import './Styles/404Error.css';
import About from './About.js';
import ShotChart from './ShotChart.js';
import StatsZone from './StatsZone.js';
import { Link } from 'react-router-dom';

function HomepageContent() {
  const navigate = useNavigate();
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const season = event.target.elements.search.value;
    if (season) {
      navigate('/year/' + season);
    }
  };
  return (
    <div className="App">
      <Nav title="Home" />
  
      <div className="main-container">
        <img id="main-logo" src={logo} alt="logo" />
        <h1 id="main-title">alltimehoops.com</h1>  
        <div className="buttons-container">
          <form onSubmit={handleFormSubmit}>
            <input type="text" id="search" placeholder="Enter an NBA Season:"></input>
            <input type="submit" value="Search"></input>
          </form>
          <Link to="/statszone">

          <button>Stats Zone</button>
          </Link>
        </div>
      </div>
    </div >
  );
}

const NotFoundPage = () => {
  return (
    <>
      <Nav title="404: Page Not Found" />
      <h1 id="error-title">404: Page Not Found</h1>
    </>
  );
}

// ADD NEW PAGES HERE
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageContent />} />
        <Route path="/year/:year" element={<Year />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="/shotchart" element={<ShotChart />} />
        <Route path="/statszone" element={<StatsZone />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}




export default App;

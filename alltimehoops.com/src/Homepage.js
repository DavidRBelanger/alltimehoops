import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles/Homepage.css';
import Nav from './Components/Nav.js';
import logo from './Images/logo.png';
import Dropdowns from './Components/Dropdowns.js';
import Year from './Components/Year'; // Make sure this file exists and has a default export
import ColoredLine from './Components/ColoredLine.js';
import Support from './Support.js';
import './Styles/404Error.css';
import About from './About.js';
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
      <Nav title="Home"/>
      <img id="main-logo" src={logo} alt="logo" />
      <h1 id="main-title">alltimehoops.com</h1>
      <h3 id="main-subtitle">A History-Focused Year-By-Year NBA Archive</h3>
      <Dropdowns navigate={navigate}/>

      <h1>OR</h1>
      <form onSubmit={handleFormSubmit}>
        <input type="text" id="search" placeholder="Enter an NBA Season"></input>
        <input type="submit" value="Search"></input>
      </form>
    </div>
  );
}

const NotFoundPage = () => {
  return (
    <>
    <Nav title="404: Page Not Found"/>
      <h1 id="error-title">404: Page Not Found</h1>
    </>
  );
}


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomepageContent />} />
        <Route path="/year/:year" element={<Year />} />
        <Route path="/support" element={<Support />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}




export default App;

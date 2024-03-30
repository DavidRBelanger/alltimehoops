import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Styles/Homepage.css';
import Nav from './Components/Nav.js';
import logo from './Images/logo.png';
import Dropdowns from './Components/Dropdowns.js';
import Year from './Components/Year';
import Support from './Support.js';
import './Styles/404Error.css';
import About from './About.js';
import ShotChart from './ShotChart.js';
/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * This file contains the main App component and the HomepageContent component.
 *
 * App Component:
 * - This is the main component of the application.
 * - It uses the react-router-dom library to define the application's routes.
 * - The "/" route renders the HomepageContent component.
 * - The "/year/:year" route renders the Year component.
 * - The "/support" route renders the Support component.
 * - The "/about" route renders the About component.
 * - Any other route renders the NotFoundPage component.
 *
 * HomepageContent Component:
 * - This component displays the homepage of the application.
 * - It uses the useNavigate hook from react-router-dom to navigate to different pages.
 * - It contains a form that allows the user to enter a season and navigate to the page for that season.
 * - It also contains a Dropdowns component that allows the user to select a season from a dropdown menu.
 *
 * NotFoundPage Component:
 * - This component displays a 404 error page.
 * - It contains a Nav component with the title "404: Page Not Found" and an error message.
 */

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
      <img id="main-logo" src={logo} alt="logo" />
      <h1 id="main-title">alltimehoops.com</h1>
      <h3 id="main-subtitle">A History-Focused Year-By-Year NBA Archive</h3>
      <Dropdowns navigate={navigate} />

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
      <Nav title="404: Page Not Found" />
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
        <Route path="shotchart" element={<ShotChart />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}




export default App;

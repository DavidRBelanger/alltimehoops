import Nav from './Components/Nav.js';
import './Styles/About.css';
import logo from './Images/logo.png';
function About() {
    return (
        <>
            <Nav title="About" />
            <div className="about-container">
                <img id="main-logo" src={logo} alt="logo" />
                <h1 id="main-title">alltimehoops.com</h1>
                <ul>

                </ul>
                <li>Information on Statistical Leaders and Drafted Players is accumulated from the NBA's official database, using
                    Swar's <a href="https://github.com/swar/nba_api">NBA_API Python Package</a>.</li>

                <li>Information on Award Winners and All-Star Teams is accumulated from Summitro Datta's
                    {' '}<a href="https://www.kaggle.com/datasets/sumitrodatta/nba-aba-baa-stats?resource=download">NBA Dataset</a></li>
                <li>Miscellaneous Facts are accumulated from each season's corresponding <a href="https://www.wikipedia.com/">Wikipedia</a> page
                Page, per the Creative Commons Attribution Share-Alike license</li>

            <p></p>
        </div >
        </>
    );
}

export default About;
/**
 * Last Verified: 3/21/2024 - David Belanger
 * Authors: David Belanger
 *
 * Nav is a React component that displays the navigation bar of the application.
 *
 * Props:
 * - title: The title to be displayed in the navigation bar.
 *
 * The component renders a div with the class "nav". Inside this div, it renders:
 * - A link to the home page with the application logo.
 * - A link to the home page with the application name.
 * - The title passed as a prop.
 * - A list of links to the "Graphs", "Support", and "About" pages.
 */

import '../Styles/GlobalStyle.css';
import '../Styles/Nav.css';
import logo from '../Images/logo.png';
import { Link } from 'react-router-dom';

function Nav( { title }) {
    return <>
        <div className = "nav">
            <Link to ="/">
                <img src={logo} alt="Logo" className="logo"></img>
            </Link>
            <Link to ="/">
                <h1>alltimehoops.com</h1>
            </Link>
           
            <h2>{title}</h2>

            <ul>
                <li><Link to ="/graphs">Graphs</Link></li>
                <li><Link to ="/support">Support</Link></li>
                <li><Link to ="/about">About</Link></li>
            </ul>
        </div>
    </>
}

export default Nav;
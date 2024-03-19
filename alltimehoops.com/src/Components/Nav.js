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
import Nav from './Components/Nav.js';
import './Styles/Graphs.css';
import shotChart from './Images/Graphs/shotchart.png';
import { Link } from 'react-router-dom';
function Graphs() {
    return (
        <div className="graph-container">
            <Nav title="Graphs" />
            <div className="graph-tile-container">
                <Tile
                    title="Shot Chart"
                    image={shotChart}
                    link="/shotchart" />
                <Tile/>
                <Tile/>
                <Tile/>
                <Tile/>
                <Tile/>
                <Tile/>
                <Tile/>
                <Tile/>
            </div >

        </div>
    );
}

function Tile({ title, image, link }) {
    return (
        <div className="graphs-tile">
        
            <Link to={link}>
                <img src={image} alt={title} />
                <h2>{title}</h2>
            </Link>
        </div>
    );
}

export default Graphs;
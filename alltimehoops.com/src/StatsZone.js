import Nav from './Components/Nav.js';
import './Styles/StatsZone.css';
import shotChart from './Images/StatsZone/shotchart.png'
import { Link } from 'react-router-dom';
function StatsZone() {
    return (
        <div className="stats-zone-container">
            <Nav title="Stats Zone" />
            <div className="stat-tile-container">
                <Tile
                    title="Shot Chart"
                    image={shotChart}
                    link="/shotchart" />
                <Tile
                    title="Draft Tool"
                    image={shotChart}
                    link="/drafttool" />
                />
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
        <div className="StatsZone-tile">
        
            <Link to={link}>
                <img src={image} alt={title} />
                <h2>{title}</h2>
            </Link>
        </div>
    );
}

export default StatsZone;
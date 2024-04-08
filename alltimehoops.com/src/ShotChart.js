import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { ResponsiveContainer, ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';
import Nav from './Components/Nav.js';
import { scaleLog, scaleSqrt, scaleLinear } from 'd3-scale';
import './Styles/ShotChart.css';
import courtImage from './Images/court.png'

const ShotChart = () => {
  const [shots, setShots] = useState([]);
  const [year, setYear] = useState(2022); // useState for year

  useEffect(() => {
    const fetchData = async () => {
      const seasonDoc = doc(collection(firestore, 'nba_shots2'), year.toString());
      const docSnap = await getDoc(seasonDoc);
      if (docSnap.exists()) {
        setShots(docSnap.data().shots);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, [year]); // year added to dependency array


  const maxShotCount = Math.max(...shots.map(shot => shot.SHOT_COUNT));
  const sizeScale = scaleLog().domain([1, maxShotCount]).range([0.1, 10]);
  // Create a linear color scale based on the order of shots
  // Define your base color in HSL format
  // Define your base color in HSL format

  const CustomShape = (props) => {
    const { cx, cy, payload, index } = props;
    const cellRadius = sizeScale(payload.SHOT_COUNT);

    // Limit the shot count to 50 for color scaling
    const limitedShotCount = payload.SHOT_COUNT;

    // Create a linear color scale from black to bright orange
    const colorScale = scaleLinear()
      .domain([0, limitedShotCount])
      .range(["gray", "orange"]);

    return (
      <circle
        cx={cx}
        cy={cy}
        r={cellRadius}
        fill={colorScale(limitedShotCount)}
        stroke="black"
        strokeWidth="1"
      />
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const distance = (Math.sqrt(Math.pow(data.LOC_X, 2) + Math.pow(data.LOC_Y, 2)) / 10); //nba database gives it in tenths of a foot for some dumb reason
      return (
        <div className="custom-tooltip">
          <p className="label">Distance to Hoop: {distance.toFixed(2)} ft.</p>
        </div>
      );
    }
    return null;
  };


  const viewportWidth = window.innerWidth;

  useEffect(() => {
    const handleResize = () => {
      setChartWidth(window.innerWidth < 640 ? 400 : 600);
      setChartHeight(window.innerWidth < 640 ? 250 : 400);
    };

    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [chartWidth, setChartWidth] = useState(window.innerWidth < 640 ? 400 : 600);
  const [chartHeight, setChartHeight] = useState(window.innerWidth < 640 ? 250 : 400);

  return (
    <>
      <Nav title="Shot Chart"></Nav>
      <div className="ShotChart">
        <h2>Selected Year: {year}-{(year + 1).toString().substring(2, 4)}</h2> {/* Add this line */}
        <div className="slidecontainer">
          <input
            type="range"
            min="1997"
            max="2022"
            value={year}
            className="slider"
            id="myRange"
            onChange={(e) => setYear(Number(e.target.value))}
          />
        </div>
        <div className="chart-container" style={{ width: '600px', height: '400px' }}>
          <ScatterChart width={chartWidth} height={chartHeight} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid stroke="none" />
            <XAxis dataKey={'LOC_X'} type="number" name='x' domain={[-300, 300]} hide={true} />
            <YAxis dataKey={'LOC_Y'} type="number" name='y' domain={[-100, 300]} hide={true} />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='Shots' data={shots} shape={<CustomShape />} />
          </ScatterChart>
        </div>
        <div className="note-container">

        <p>The 200 most attempted shots in the {year}-{(year + 1).toString().substring(2, 4)} season,</p>
        <p>given a 6" margin. Does not include Free Throw Attempts.</p>
        </div>
      </div>
    </>
  );
};

export default ShotChart;
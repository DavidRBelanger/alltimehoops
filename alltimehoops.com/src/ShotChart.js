import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { ScatterChart, CartesianGrid, XAxis, YAxis, Tooltip, Scatter } from 'recharts';
import Nav from './Components/Nav.js';
import { scaleLog, scaleSqrt } from 'd3-scale';
import './Styles/ShotChart.css';

const ShotChart = () => {
  const [shots, setShots] = useState([]);
  let year = 1996;
  useEffect(() => {
    const fetchData = async () => {
      const seasonDoc = doc(collection(firestore, 'nba_shots'), year.toString());
      const docSnap = await getDoc(seasonDoc);
      if (docSnap.exists()) {
        setShots(docSnap.data().shots);
      } else {
        console.log('No such document!');
      }
    };

    fetchData();
  }, []);

  const maxShotCount = Math.max(...shots.map(shot => shot.SHOT_COUNT));
  const colorScale = scaleLog().domain([1, maxShotCount]).range(['#8884d8', '#444499']);
  const sizeScale = scaleLog().domain([1, maxShotCount]).range([0.1, 10]);

  const CustomShape = (props) => {
    const { cx, cy, payload } = props;
    const cellRadius = sizeScale(payload.SHOT_COUNT);

    return <circle cx={cx} cy={cy} r={cellRadius} fill={colorScale(payload.SHOT_COUNT)} />;
  };

  return (
    <>
      <Nav title="Shot Chart"></Nav>
      <div className="ShotChart">

        <div className="slidecontainer">
          <input type="range" min="1" max="100" value="50" class="slider" id="myRange" />
        </div>
        <div className="chart-container">

          <ScatterChart width={400} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 60 }}>
            <CartesianGrid />
            <XAxis dataKey={'LOC_X'} type="number" name='x' domain={[-300, 300]} />
            <YAxis dataKey={'LOC_Y'} type="number" name='y' domain={[-300, 300]} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter name='Shots' data={shots} shape={<CustomShape />} />
          </ScatterChart>
        </div>
      </div>
    </>
  );
};

export default ShotChart;
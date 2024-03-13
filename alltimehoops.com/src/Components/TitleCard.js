import React from 'react';
import '../Styles/TitleCard.css';
function TitleCard({ title }) {
  return (
    <div className="title-card">
      <h1>{title}</h1>
    </div>
  );
}

export default TitleCard;
import React from 'react';
import Nav from './Components/Nav.js';
import './Styles/Support.css';
function Support() {
    return (
        <>
            <Nav />
            <div className="support">
                <h1>Support Page</h1>
                <p>Welcome to our support page!</p>
                {/* Add your support content here */}
            </div>
        </>
    );
}

export default Support;
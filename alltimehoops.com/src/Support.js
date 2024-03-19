import React from 'react';
import Nav from './Components/Nav.js';
import './Styles/Support.css';
import { firestore } from './firebase';

import { collection, addDoc } from 'firebase/firestore';

async function sendEmail(e) {
    e.preventDefault();

    try {
        const docRef = await addDoc(collection(firestore, 'bugReports'), {
            name: e.target.user_name.value,
            email: e.target.user_email.value,
            message: e.target.message.value,
            resolved: false,
        });
        console.log("Document written with ID: ", docRef.id);
        e.target.reset();
    } catch (error) {
        console.error("Error adding document: ", error);
    }
}
function Support() {
    return (
        <>
            <Nav title="Support"/>
            <div className="support">
                <h1>Support Page</h1>
                <p>If you have an issue with the website, let us know!</p>
                <form onSubmit={sendEmail}>
                    <div className="input-group">
                        <input type="text" name="user_name" placeholder="Your name" required />
                        <input type="email" name="user_email" placeholder="Your email" required />
                    </div>
                    <textarea name="message" placeholder="Your message" required></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </>
    );
}

export default Support;
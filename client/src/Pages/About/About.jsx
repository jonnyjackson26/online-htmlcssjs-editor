import React from 'react';
import './About.css';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <>
            
            <div >
                <h1>About</h1>
                
                <Link to="/">Go home</Link>
            </div>
        </>
    );
};

export default About;
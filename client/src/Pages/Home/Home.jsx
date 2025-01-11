import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {

  return (
    <div >
      <p>Home</p>
      <Link to="/editor">go to editor</Link>
      <br />
      <Link to="/about">go to about</Link>
    </div>
  );
};

export default Home;
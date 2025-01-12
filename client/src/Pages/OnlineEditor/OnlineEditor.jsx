import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./OnlineEditor.css";
import Editor from "../../Components/Editor/Editor";

const OnlineEditor = () => {

  return (
    <div>
      <Editor useBoilerPlate={true}/>
      {/*<Link to="/">go to home</Link>*/}
    </div>
  );
};

export default OnlineEditor;
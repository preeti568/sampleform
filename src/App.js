import React from "react";
import "./App.css";
import SampleForm from "./Component/sampleForm";
import { Navbar } from "react-bootstrap";

function App(props) {
  return (
    <div>
      <Navbar bg="info" expand="lg" className="m-2">
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      </Navbar>
      <SampleForm {...props} />;
    </div>
  );
}

export default App;

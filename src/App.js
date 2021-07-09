import "./App.css";
import React, { useState, useContext, createContext } from "react";
import Container from "components/Container";
import { Input } from "lib";

function App() {
    return (
        <div className="App">
            <Container />
            <Input />
        </div>
    );
}

export default App;

import "./App.css";
import React from "react";
import { PageContainer } from "components/PageContainer";
import { use100vh } from "react-div-100vh";

function App() {
    const height = use100vh();
    return (
        <div className="App" style={{ height }}>
            <PageContainer />
        </div>
    );
}

export default App;

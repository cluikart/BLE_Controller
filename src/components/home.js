import React from 'react';
import Clock from "./clock";
import Weather from "./weather";

class Home extends React.Component{
    render() {
        return (
        <div>    
            <p className="App-header">
            Home Component
            </p> 
            <Clock></Clock>
            <Weather/>
        </div>
        )
    };
}

export default Home;
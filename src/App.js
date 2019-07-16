import React from 'react';
import logo from './logo.svg';
import './App.css';
import pose from 'popmotion-pose';
import posed from 'react-pose';
import SplitText from 'react-pose-text';
import { Frame, useAnimation } from "framer";
import {slide as Menu} from 'react-burger-menu';
import {Route, NavLink, HashRouter} from "react-router-dom";

import Sidebar from "./components/SideBar";

import Home from "./components/home";
import Bluetooth from "./components/bluetooth";
//import { AppRegistry, Text, StyleSheet } from 'react-native';

const config = {
  fadeIn: {
    opacity: 1,
    transition: {duration: 3000}
    
  },
  fadeOut: {
    opacity: 0,
    transition: {duration: 3000}
  }
};
const item = posed.div(config);

console.log("Loading");

function toByteArray(hexString) {
  var result = [];
  for (var i = 0; i < hexString.length; i += 2) {
    result.push(parseInt(hexString.substr(i, 2), 16));
  }
  return result;
}



function App() {

  let controls = useAnimation();
  
  const simulateClick = (e) => { 
   this.ref.click();
  };

  // const componentDidMount() {
  //   console.log("Mounting");
  // };
var red;  
var w = new Uint8Array(1);

  function blueComp(e) {
    e.preventDefault();
    console.log("clicked");
    navigator.bluetooth.requestDevice({
      
      filters: [
        {services: [0xffe5]}
      ],
      optionalServices: [0xffe5]
    })
    .then(device => {return device.gatt.connect();})
    .then(server => {console.log(server.getPrimaryService('0000ffe5-0000-1000-8000-00805f9b34fb')); return server.getPrimaryService('0000ffe5-0000-1000-8000-00805f9b34fb');})
    .then(service => { return service.getCharacteristic('0000ffe6-0000-1000-8000-00805f9b34fb'); })
    .then(characteristic =>{
      console.log("> Characteristic: " + characteristic.uuid);
      if(characteristic.uuid === '0000ffe6-0000-1000-8000-00805f9b34fb'){
                
                w[0] = 250;
                red = characteristic;
                return characteristic.writeValue(w);
      }
      // Getting Battery Level Characteristic...
    //   console.log("Getting Characteristics");
    //   let queue = Promise.resolve();
    //   services.forEach(service=> {
    //     queue = queue.then(_ => service.getCharacteristics().then(characteristic =>{
    //       console.log("> Service: " + service.uuid);
    //       console.log("> Characteristic: " + characteristic.uuid);
    //       let a = new ArrayBuffer(8);
    //       let s = 255;
    //       let r = s.toString(16);
    //       let k = toByteArray(r);
    //       console.log(k);
    //       let w = new Uint8Array(1);
    //       w[0] = 200;
    //       if(characteristic.uuid === '0000ffe6-0000-1000-8000-00805f9b34fb'){
    //         red = characteristic;
    //         characteristic.writeValue(w);
    //       }
    //       // characteristics.forEach(characteristic => {
    //       //   console.log(">> Characteristic: " + characteristic.uuid + " " + getSupportedProperties(characteristic));
    //       // });
    //       }));
    // });
    //   console.log("> Characteristic: " + red.uuid);
    //   red.writeValue(9);
    //   return queue;
    })
    .catch(error =>{console.log(error.message);});
  };

  function setRed(red) {
    w[0] = 255;
    red.writeValue(w);
  }

  
  

  const seq = async () => {
    await controls.start({opacity :0, transition: {duration: 1}});
    await controls.start({opacity :1, transition: {duration: 1}});
    console.log("Animating");
    return await controls.start({opacity :0, transition: {duration: 1, delay: 3}});
    
  };
  
  return (
    <div>
      {/* <SplitText initialPose="fadeOut" pose="fadeIn" charPoses={config}>
        Animated Text
      </SplitText> */}
       <HashRouter>
            <Menu>
                <NavLink className="menu-item" to="/">
                    Home
                </NavLink>
                {/* onPointerUp={blueComp} */}
                <NavLink className="menu-item" to="/bluetooth" >
                    Bluetooth Manager
                </NavLink>
            </Menu>
            <div className="content">
              <Route exact path="/" component={Home}/>
              <Route path="/bluetooth" component={Bluetooth}/>
            </div>
         </HashRouter>
      
      

        


        {/* <Frame initial={{opacity: 0}}  animate={controls}  onTap={seq} size={150} background={"#fff"} radius={30}>
          <p>
            Hello
          </p> 
        </Frame> */}
          
          
        {/* <Frame animate={{controls}} transition={{duration: 3,loop: Infinity}} onTap={{seq}}/>
          <p>
          ref={e => this.ref = 1}
          Hello World
          </p> 
        </Frame> */}

        {/* //<item pose={pose}> */}
        
        {/* //</item>   */}
      
      
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );

}

export default App;

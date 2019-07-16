import React from 'react';
import {PhotoshopPicker} from 'react-color';

class Bluetooth extends React.Component{

    state = {
        color: {
            r: '255',
            g: '255',
            b: '255',
            a: '1',
        },
      };

    handleChange = (color) => {
        this.setState({color: color.rgb});
        console.log(color.rgb.r);
        setColor(color);
        //setRed(color.rgb.r);
    };  

    render() {
        return ( 
            <div className="App">
                <p className="App-header">
                    Bluetooth Component
                </p> 
                <PhotoshopPicker color={this.state.color}  onChange={this.handleChange}/>
                <button className="button" onClick={blueComp}>
                    Pair Device
                </button>
                {/* <button onClick={setRed(2)}>
                    Set Red
                </button> */}
            </div>
        );
    };
}

export default Bluetooth;


var red, green, blue, white;  
var blueChar;
var greenChar;
var whiteChar;
var w = new Uint8Array(1);

  function blueComp(e) {
    //e.preventDefault();
    console.log("clicked");
    navigator.bluetooth.requestDevice({
      
      filters: [
        {services: [0xffe5]}
      ],
      optionalServices: [0xffe5]
    })
    .then(device => {return device.gatt.connect();})
    .then(server => { return server.getPrimaryService('0000ffe5-0000-1000-8000-00805f9b34fb');})
    .then(service => { 
        whiteChar = service.getCharacteristic('0000ffea-0000-1000-8000-00805f9b34fb');
        blueChar = service.getCharacteristic('0000ffe8-0000-1000-8000-00805f9b34fb'); 
        greenChar = service.getCharacteristic('0000ffe7-0000-1000-8000-00805f9b34fb');
        return service.getCharacteristic('0000ffe6-0000-1000-8000-00805f9b34fb'); })
    .then(characteristic =>{
      setChars();  
      console.log("> Characteristic: " + characteristic.uuid);
      if(characteristic.uuid === '0000ffe6-0000-1000-8000-00805f9b34fb'){
                
                w[0] = 250;
                red = characteristic;
                console.log(red);
                return characteristic.writeValue(w);
      }
    })
    .catch(error =>{console.log(error.message);});
  };

  function setChars() {
    whiteChar.then(char => {
        white = char;
    });
    blueChar.then(char => {
        blue = char;
    });
    greenChar.then(char => {
        green = char;
    });
    
  }

  function setRed(r) {
    console.log("Red Value: " + r);  
    w[0] = r;
    red.writeValue(w);
  }
  function setGreen(r) {
    console.log("Red Value: " + r);  
    w[0] = r;
    green.writeValue(w);
  }

  function setBlue(r) {
    console.log("Red Value: " + r);  
    w[0] = r;
    blue.writeValue(w);
  }

  function setWhite(r) {
    console.log("Red Value: " + r);  
    w[0] = r;
    white.writeValue(w);
  }

  function setColor(color) {
      setRed(color.rgb.r);
      setGreen(color.rgb.g);
      setBlue(color.rgb.b);
      //setWhite(color.rgb.a);
  }
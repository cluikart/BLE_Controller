import React from 'react';
import WeatherIcon from "react-icons-weather";

const Api_Key = '45cf752700ddb042ab7333ef2b775610';
var lon, lat;
var temp, hum, wea;

class Weather extends React.Component {

    constructor(props) {
        super(props);
        this.handleLoad = this.getWeather.bind(this);
        this.getWeather = this.getWeather.bind(this);
        this.getLocation = this.getLocation.bind(this);
        this.showPosition = this.showPosition.bind(this);
        this.state = {
            temp: "",
            humidity: "",
            weather: "",
            iconId: "800",
            lat: 0,
            long: 0,
        }
     }

     
    getWeather = async () => {
        const city = 'Atlanta';
        const country = 'United States of America';
        
        const call = await fetch("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&units=imperial&APPID=e9b433f7ed306860db69ea25723a5f48");
        //const call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${Api_Key}`);
        const response = await call.json();
        hum = response.main.humidity;
        temp = response.main.temp;
        wea = response.weather[0].description;
        const icon = response.weather[0].id;
        this.setState({temp: temp, humidity: hum, weather: wea , iconId: icon});
        console.log(hum + " " + temp + " " + wea);
        console.log(response);
        
    }
    getLocation() {
        
        if (navigator.geolocation) {
          
          navigator.geolocation.getCurrentPosition(position => {
            
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            this.setState({lat: lat, long: lon});
            this.getWeather();
            
          });
        } else {
          console.log("Not Supported");
        }
      }
      
      showPosition(position) {
        console.log(position);
       console.log("Latitude: " + position.coords.latitude + 
        "<br>Longitude: " + position.coords.longitude); 
      }

      componentDidMount() {
        //window.addEventListener('load', this.getWeather);
        window.addEventListener('load', this.getLocation);
     }
    
    

    render(){
        return(
            <div className="weather">
                <WeatherIcon name="owm" iconId={this.state.iconId} className="icon"/>
                <p className="weather-text"> Temperature: {this.state.temp}</p>
                <p className="weather-text">Humidity: {this.state.humidity}</p>
                <p className="weather-text">Forecast: {this.state.weather}</p>
            </div>
        );
    }
}
export default Weather;


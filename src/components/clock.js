import React from 'react';

class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            time: new Date().toLocaleString(),
        }
    }
    componentDidMount() {
        this.intervalID = setInterval(
            () => this.tick(),
            1000
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalID);
    }
    tick() {
        this.setState({
           time: new Date().toLocaleString(),
        });
    }
    render(){
        return(
            <div className="Clock">
            <p className="Clock-Text">{this.state.time}</p>
            </div>
        );
    };
}

export default Clock;
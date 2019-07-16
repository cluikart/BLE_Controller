import React from 'react';
import {slide as Menu} from 'react-burger-menu';
import {Route, NavLink, HashRouter} from "react-router-dom";

import Home from "./home";
import Bluetooth from "./bluetooth";

export default props => {
    return(
        <p></p>
        // <HashRouter>
            // <Menu>
            //     <NavLink className="menu-item" to="/">
            //         Home
            //     </NavLink>

            //     <NavLink className="menu-item" to="/bluetooth">
            //         Bluetooth Manager
            //     </NavLink>
            // </Menu>
            // <div>
            // <Route path="/" component={Home}/>
            // <Route path="/bluetooth" component={Bluetooth}/>
            // </div>
        // </HashRouter>
    );
}
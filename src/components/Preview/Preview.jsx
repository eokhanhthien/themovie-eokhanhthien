import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Preview.css"

function Preview(props) {
    return (
        <div className="Home">
 
        <div className="row no-gutters">
          <div className="navBar-left">
            <div className="row no-gutters">
              <div className="icon_film"><img src="./image/icon.png" alt="" /> </div> 
              <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px'}}>FilmHot</div>   
            </div>
            <div className="menu mt-40px">MENU</div>
            <div className="menu"> <NavLink to="/"><i className="fas fa-home text-xl " />Home</NavLink></div>
            <div className="menu active_navbar-left"> <NavLink to="/Preview"><i className="fas fa-compass text-xl " />Discovery</NavLink></div>
            <div className="menu"><i className="fas fa-desktop text-xl " />Explore</div>
            <div className="menu"><i className="fas fa-history text-xl " />History</div>
            <div className="menu mt-40px">PERSONAL</div>
            <div className="menu"><i className="fas fa-sign-in-alt text-xl" />Sign in</div>
          </div>

          <div className="Preview-Container">
            
          </div>
          </div>
            
        </div>
    );
}

export default Preview;
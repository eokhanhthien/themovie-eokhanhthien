import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink,
  } from "react-router-dom";

function MovieItem(props) {
    return (
        <div className="Home-film-item ">
        <NavLink to={`/DetailVideo/${props.id}/${props.category}`}>
        <div className="Home-film-img">
         {props.imageUrl && <img src={props.imageUrl} alt="" />}
        </div>
        </NavLink>
        <div className="Home-film-name">
          {props.title}
        </div>
    </div>
    );
}

export default MovieItem;
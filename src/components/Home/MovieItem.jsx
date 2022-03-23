import React, { useEffect, useRef } from 'react';
import {
    NavLink,
  } from "react-router-dom";

function MovieItem(props) {

  
  const imgRef = useRef()
  useEffect(()=>{
    const img = imgRef.current;
    const observer = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        img.setAttribute("src",img.alt)
      }
    })
// console.log(img);
    if(img) observer.observe(img)

    return ()=>{
    if(img) observer.unobserve(img)
    }
    
  },[])

    return (
        <div className="Home-film-item ">
        <NavLink to={`/DetailVideo/${props.id}/${props.category}`}>
        <div className="Home-film-img">
         {props.imageUrl && <img src="../image/img-lazy.png" alt={props.imageUrl}  ref={imgRef} />}
        </div>
        </NavLink>
        <div className="Home-film-name">
          {props.title}
        </div>
    </div>
    );
}

export default MovieItem;
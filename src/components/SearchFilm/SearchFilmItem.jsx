import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { horizontalSize } from '../Functional/horizontalSize';
import "../DetailVideo/DetailVideo.css"
import "./SearchFilm.css"

import { useDispatch } from "react-redux";
import {addToHistory} from "../../reduxtoolkit/HistorySlide"

function SearchFilmItem(props) {
    const imgRef = useRef()
    useEffect(()=>{
      const img = imgRef.current;
      const observer = new IntersectionObserver(entries =>{
        if(entries[0].isIntersecting){
        img.setAttribute("src",img.alt)
        img.classList.add("Search-film-img-appear")
        }
      })
  // console.log(img);
  // console.log(img.className) 
      if(img){ observer.observe(img)
      }
      return ()=>{
      if(img) observer.unobserve(img)
      }
      
    },[])
  // console.log(props)

  const dispatch = useDispatch();
  function onAddToHistory(film) {
    // props.onAddToCart(item);
    dispatch(addToHistory(film))   
  }

    return (
        <div  className="col l-1-33 m-3 c-6">
            <div onClick={()=>onAddToHistory(props)} className="Search-film-item-search ">
                <NavLink to={`/DetailVideo/${props.id}/${props.domainType}`}>
                <div className="Search-film-img">
               {props && <img src="../image/img-lazy.png" alt={horizontalSize(props.coverVerticalUrl,180,240)} ref={imgRef} />}
                </div>
                </NavLink>
                <div className="Search-film-name">
                {props.name}
                </div>
            </div>
            </div>
    );
}

export default SearchFilmItem;
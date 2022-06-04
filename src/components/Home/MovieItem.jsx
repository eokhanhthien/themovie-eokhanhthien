import React, { useEffect, useRef } from 'react';
import {
    NavLink,
  } from "react-router-dom";
import { horizontalSize } from '../Functional/horizontalSize';
import { useDispatch } from "react-redux";
import {addToHistory} from "../../reduxtoolkit/HistorySlide"
function MovieItem(props) {
  const imgRef = useRef()
  useEffect(()=>{
    const img = imgRef.current;
    const observer = new IntersectionObserver(entries =>{
      if(entries[0].isIntersecting){
        img.setAttribute("src",img.alt)
        img.classList.add("Home-film-img-appear")

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


  const dispatch = useDispatch();
  function onAddToHistory(film) {
    // props.onAddToCart(item);
    dispatch(addToHistory(film))
    
}

// console.log(props)

  // console.log(horizontalSize(props.imageUrl,183,242))
    return (
        <div onClick={()=>onAddToHistory(props)} className="Home-film-item ">
        <NavLink  to={`/DetailVideo/${props.id}/${props.category}`}>
        <div className="Home-film-img">
         {props.imageUrl && <img className='img-thumnail' src="../image/img-lazy.png" alt={horizontalSize(props.imageUrl,366,484)}  ref={imgRef} />}
        </div>
        </NavLink>
        <div className="Home-film-name">
          {props.title}
        </div>
    </div>
    );
}

export default MovieItem;
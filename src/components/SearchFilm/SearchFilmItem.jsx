import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { horizontalSize } from '../Functional/horizontalSize';

function SearchFilmItem(props) {
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
  // console.log(props)

    return (
        <div  className="col l-1-33 m-3 c-6">
            <div className="Home-film-item-search ">
                <NavLink to={`/DetailVideo/${props.id}/${props.domainType}`}>
                <div className="Home-film-img">
               {props && <img src="../image/img-lazy.png" alt={horizontalSize(props.coverVerticalUrl,332,440)} ref={imgRef} />}
                </div>
                </NavLink>
                <div className="Home-film-name">
                {props.name}
                </div>
            </div>
            </div>
    );
}

export default SearchFilmItem;
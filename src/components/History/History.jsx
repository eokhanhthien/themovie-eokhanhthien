import React, { useEffect, useRef, useState } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import postSearchwithKeyWord from '../../api/postSearchwithKeyWord';
import SkeletonsSearchFilm from '../Skeletons/SkeletonsSearchFilm';
import "../SearchFilm/SearchFilm.css"
import "./History.css"
import "../DetailVideo/DetailVideo.css"
import { horizontalSize } from '../Functional/horizontalSize';
// import SearchFilmItem from './SearchFilmItem';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {removeHistory} from "../../reduxtoolkit/HistorySlide"
import SearchFilmItem from '../SearchFilm/SearchFilmItem';

function History(props) {
    const {keyword} = useParams();
    const [dataSearchTerm, setDataSearchTerm] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const typingTimeoutRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('');

    const history= useSelector(state => state.history)
    const dispatch = useDispatch();

    useEffect(()=>{
        (async function() {
          setIsLoading(false)
          let dataSearch= await postSearchwithKeyWord.postSearchwithKeyWord({
            searchKeyWord:keyword ,
        })
        if(dataSearch){
          setDataSearchTerm(dataSearch.data.data)
          setIsLoading(true)
        }
        }
        )()
      },[keyword])
    
      useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

      function handleSearchTermChange(e) {
        if(typingTimeoutRef.current){
          clearTimeout(typingTimeoutRef.current)
        };
      
       typingTimeoutRef.current = setTimeout(()=>{
          setSearchTerm(e.target.value)
          // console.log(e.target.value)
      },500)
      }
    
      function handleRemoveLocalHistory() {
        dispatch(removeHistory())

      }
     
      console.log(history.history)
    return (
        <div className='searchFilm-Container'>
          
          <div className="watchMovie-header row">
          <div className="col l-6 m-6 c-6">
         <div className="row no-gutters">
              <NavLink to="/"><div className="watchMovie-icon_film"><img src="../../image/icon.png" alt="" /> </div> </NavLink>  
              <NavLink to="/"> <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px',lineHeight: '31px'}}>FilmHot</div> </NavLink>  
            </div>
          </div>
          <div className="col l-6 m-6 c-6">
            <div className="Search-film-watch">
              <input onChange={handleSearchTermChange} className="Search-film-input-watch" type="text" placeholder="Search..." />
              <NavLink to={`/Search/${searchTerm}`}> <i className="fas fa-search text-xl icon-search" /></NavLink>
            </div>
          </div>
        </div>

        <div className="row">
            <div className="Search-title-name col l-11">Watch history</div>
            <div onClick = {()=>handleRemoveLocalHistory()} className="History-clean col l-1"><i className="fas fa-trash"></i> Clear</div>
        </div>

{history.history.length >0 ? <div className='row'>
        {history ? history.history.map((item,index)=>{
            return (
            <SearchFilmItem key={index}
            id={item.id}
            domainType={item.category}
            coverVerticalUrl={item.imageUrl}
            name={item.title}
            ></SearchFilmItem>
            )
        }) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item,index1)=>{
            return (
                <SkeletonsSearchFilm key={index1}></SkeletonsSearchFilm>
            )
        })

        }
    
        </div> :
        <div className='info-empty-history'>
          <img src="/../image/cinema.svg" alt="" />
          <div className='info-empty-text'>No Watch history found</div>
          <div className='info-empty-custom-color'><NavLink to="/">Discover more</NavLink></div>
        </div>
        }

        </div>
    );
}

export default History;
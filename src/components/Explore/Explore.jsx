import React, { useEffect, useRef, useState } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import postSearchwithKeyWord from '../../api/postSearchwithKeyWord';
import SkeletonsSearchFilm from '../Skeletons/SkeletonsSearchFilm';
import "../SearchFilm/SearchFilm.css"
// import "./History.css"
import "../DetailVideo/DetailVideo.css"
import SearchFilmItem from '../SearchFilm/SearchFilmItem';
import "./Explore.css"
import postAdvancedSearch from '../../api/postAdvancedSearch';

function Explore(props) {
    const {keyword} = useParams();
    const [dataSearchTerm, setDataSearchTerm] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const typingTimeoutRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('');

    const [dataAllFilm, setdataAllFilm] = useState('');
    

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


      useEffect(()=>{
        (async function() {
          setIsLoading(false)
          let dataSearch= await postAdvancedSearch.postAdvancedSearch({
        })
        if(dataSearch){
          setdataAllFilm(dataSearch.data.data.searchResults);
          setIsLoading(true)
        }
        }
        )()
      },[])
      console.log(dataAllFilm)



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

        <div className="row no-gutters">
            <div className="Explore-title Explore-title-active">TV Series</div>
            <div className="Explore-title">Movie</div>
            <div className="Explore-title">Anime</div>
        </div>

        <div className="row no-gutters mt-20px">
          <select className='Filter-option' >
            <option name="" id="">All regions</option>
            <option name="" id="">America</option>
            <option name="" id="">Korea</option>
            <option name="" id="">U.K</option>
            <option name="" id="">Japan</option>
            <option name="" id="">Thailand</option>
            <option name="" id="">Europe</option>
            <option name="" id="">China</option>
            <option name="" id="">India</option>
            <option name="" id="">Australia</option>
            <option name="" id="">Indonesia</option>
            <option name="" id="">Other</option>
          </select>

          <select className='Filter-option' >
            <option name="" id="">All Categories</option>
            <option name="" id="">Drama</option>
            <option name="" id="">Action</option>
            <option name="" id="">Romance</option>
            <option name="" id="">Fantasy</option>
            <option name="" id="">Animation</option>
            <option name="" id="">Suspense</option>
            <option name="" id="">Sci-Fi</option>
            <option name="" id="">Horror</option>
            <option name="" id="">Comedy</option>
            <option name="" id="">Crime</option>
            <option name="" id="">Adventure</option>
            <option name="" id="">Thriller</option>
            <option name="" id="">Family</option>
            <option name="" id="">Musical</option>
            <option name="" id="">War</option>
            <option name="" id="">LGBTQ</option>
            <option name="" id="">Catastrophe</option>
            <option name="" id="">Documentary</option>
            <option name="" id="">other</option>
          </select>

        <select className='Filter-option' >
            <option name="" id="">All Time Periods</option>
            <option name="" id="">2022</option>
            <option name="" id="">2021</option>
            <option name="" id="">2020</option>
            <option name="" id="">2019</option>
            <option name="" id="">2018</option>
            <option name="" id="">2017</option>
            <option name="" id="">2011-2015</option>
            <option name="" id="">2000-2010</option>
            <option name="" id="">Before</option>
          </select>


          <select className='Filter-option' >
            <option name="" id="">All Subtitles</option>
            <option name="" id="">Manual Translation</option>
          </select>

        

          <select className='Filter-option' >
            <option name="" id="">Recent</option>
            <option name="" id="">Popularity</option>
          </select>
        </div>

        <div className='row jus-between'>
        {isLoading && dataAllFilm ? dataAllFilm.map((item,index)=>{
            return (
            <SearchFilmItem key={index}
            id={item.id}
            domainType={item.domainType}
            coverVerticalUrl={item.coverVerticalUrl}
            name={item.name}
            ></SearchFilmItem>
            )
        }) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item,index1)=>{
            return (
                <SkeletonsSearchFilm key={index1}></SkeletonsSearchFilm>
            )
        })

        }
        </div>

        </div>
    );
}

export default Explore;
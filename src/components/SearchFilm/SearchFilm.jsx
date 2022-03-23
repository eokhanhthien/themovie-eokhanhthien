import React, { useEffect, useState } from 'react';
import { NavLink,useParams } from 'react-router-dom';
import getHome from '../../api/getHome';
import SkeletonsSearchFilm from '../Skeletons/SkeletonsSearchFilm';
import "./SearchFilm.css"

function SearchFilm(props) {
    const {keyword} = useParams();
    const [dataSearchTerm, setDataSearchTerm] = useState();
    useEffect(()=>{
        (async function() {
          let dataSearch= await getHome.postSearchwithKeyWord({
            searchKeyWord:keyword ,
        })
        if(dataSearch){
          setDataSearchTerm(dataSearch.data.data)
        }
        }
        )()
      },[keyword])
    
    //   console.log(dataSearchTerm)
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
              <input className="Search-film-input-watch" type="text" placeholder="Search..." />
              <i className="fas fa-search text-xl icon-search" />
            </div>
          </div>
        </div>

        <div className='Search-title-name'>{`Search result for "${keyword}"`}</div>

        <div className='row'>
        {dataSearchTerm ? dataSearchTerm.searchResults.map((item,index)=>{
            return (
            <div key={index} className="col l-1-33 m-3 c-6">
            <div className="Home-film-item-search ">
                <NavLink to={`/DetailVideo/${item.id}/${item.domainType}`}>
                <div className="Home-film-img">
               {dataSearchTerm && <img src={item.coverVerticalUrl} alt="" />}
                </div>
                </NavLink>
                <div className="Home-film-name">
                {item.name}
                </div>
            </div>
            </div>)
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

export default SearchFilm;
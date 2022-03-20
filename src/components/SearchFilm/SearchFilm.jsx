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
            <div key={index} className="col l-1-5 m-3 c-6">
            <div className="Home-film-item ">
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
        }) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25].map((item,index)=>{
            return (
                <SkeletonsSearchFilm></SkeletonsSearchFilm>
            )
        })

        }
            {/* <div className="col l-1-5 m-3 c-6">
            <div className="Home-film-item ">
                <NavLink to={`/DetailVideo/${props.id}/${props.category}`}>
                <div className="Home-film-img">
                <img src="https://images.weserv.nl/?url=https%3A%2F%2Fimg.netpop.app%2Fcover%2F20211102%2F1635850594262_6affe1d15f6823cd564189426ad54a3d%E5%90%8D%E4%BE%A6%E6%8E%A2%E6%9F%AF%E5%8D%97%EF%BC%9A%E9%9B%B6%E7%9A%84%E6%89%A7%E8%A1%8C%E4%BA%BA.png&w=250&h=&fit=outside" alt="" />
                </div>
                </NavLink>
                <div className="Home-film-name">
                1234
                </div>
            </div>
            </div> */}
            


        </div>

        </div>
    );
}

export default SearchFilm;
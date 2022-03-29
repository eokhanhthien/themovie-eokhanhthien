import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import postSearchwithKeyWord from '../../api/postSearchwithKeyWord';
import SkeletonsSearchFilm from '../Skeletons/SkeletonsSearchFilm';
import "./SearchMobile.css"

function SearchMobile(props) {
    
    const typingTimeoutRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSearchTerm, setDataSearchTerm] = useState();


    const [isSearch, setisSearch] = useState(true);
    const [isActiveModal, setIsActiveModal] = useState(false);

    useEffect(()=>{
        (async function() {
          let dataSearch= await postSearchwithKeyWord.postSearchwithKeyWord({
            searchKeyWord:searchTerm ,
        })
        if(dataSearch){
          setDataSearchTerm(dataSearch.data.data)
        }
        }
        )()
      },[searchTerm])



    function handleSearchTermChange(e) {
        if(typingTimeoutRef.current){
          clearTimeout(typingTimeoutRef.current)
        };
      
       typingTimeoutRef.current = setTimeout(()=>{
          setSearchTerm(e.target.value)
          // console.log(e.target.value)
      },500)
      }

      
function handleOpenModalHome() {
  setIsActiveModal(!isActiveModal)
}
      
    //  console.log(dataSearchTerm)

    return (
        <div className='Search-Mobile-container'>
            <div className="grid wide">
                <div className="row">
                <div className="col l-6 m-6 c-6 menu-navbar-mobie">
            <div className="row no-gutters">
            <NavLink to="/"><div className="watchMovie-icon_film"><img src="/../image/icon.png" alt="" /> </div> </NavLink>  
            <NavLink to="/"> <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px', lineHeight: '31px'}}>FilmHot</div> </NavLink>  
            </div>
          </div>
          <div className="col l-6 m-6 c-6 menu-navbar-mobie">
            <div className="Search-film-watch">
            <i onClick={()=>handleOpenModalHome()} className="fas fa-bars icon-home-list"></i>
            </div>
          </div>
                </div>
                <div className="row">
                    <div className="col l-12 m-12 c-12 Search-Mobile-container-title">Search for your favorite movies</div>
                    <div className="col l-12 m-12 c-12 Search-Mobile-container-title">
                        <div className="Search-film">
                        <input onChange={handleSearchTermChange}  className="Search-film-input" type="text" placeholder="Search..." />
                        </div>
                    </div>


                </div>
            

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

            <div className={isActiveModal ? 'Modal-home Modal-home-active':'Modal-home'}>
        <div className="row no-gutters">
              <div className="icon_film"><img src="./image/icon.png" alt="" /> </div> 
              <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px'}}>FilmHot</div>   
            </div>
            <div className="menu mt-40px">MENU</div>
            <div className="menu"><NavLink to="/"><i className="fas fa-home text-xl " />Home</NavLink></div>
            <div className="menu"><i className="fas fa-compass text-xl " />Discovery</div>
            <div className="menu"><i className="fas fa-desktop text-xl " />Explore</div>
            <div className="menu"><i className="fas fa-history text-xl " />History</div>
            <div className="menu">  <NavLink to="/SearchMobile"><i className="fas fa-search text-xl"></i>Search</NavLink></div>
            <div className="menu mt-40px">PERSONAL</div>
            <div className="menu"><i className="fas fa-sign-in-alt text-xl" />Sign in</div>
        
        
        </div>
        <div onClick={()=>handleOpenModalHome()} className={isActiveModal ? 'OverLay-Modal-home OverLay-Modal-home-active':'OverLay-Modal-home' }></div>

        </div>  
    );
}

export default SearchMobile;
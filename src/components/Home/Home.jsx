import React, { useEffect, useRef, useState } from 'react';
import getHome from '../../api/getHome';
import postSearchwithKeyWord from '../../api/postSearchwithKeyWord';


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";
import "swiper/components/pagination/pagination.scss";
import "../DetailVideo/DetailVideo.css"

// import Swiper core and required modules
import SwiperCore, { Navigation ,Autoplay,Pagination } from "swiper";
import SkeletonsBanner from '../Skeletons/SkeletonsBanner';
import SkeletonsMovie from '../Skeletons/SkeletonsMovie';
import SkeletonsTopsearch from '../Skeletons/SkeletonsTopsearch';
import MovieItem from './MovieItem';
import { NavLink } from 'react-router-dom';

import { horizontalSize } from '../Functional/horizontalSize';

// install Swiper modules
SwiperCore.use([Navigation,Autoplay,Pagination]);




function Home(props) {
    const [isLoading, SetisLoading] = useState(false);

    const [homeBanner, sethomeBanner] = useState([]);
    const [homeTrending, sethomeTrending] = useState([]);
    const [homeHotDrama,sethomeHotDrama] = useState([]);
    const [homeDarkFairyTales,sethomeDarkFairyTales] = useState([]);
    const [homeNewestReleases,sethomeNewestReleases] = useState([]);
    const [topSearchhome,settopSearchhome] =useState([]);




    const typingTimeoutRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('');
    const [dataSearchTerm, setDataSearchTerm] = useState();

    const [isSearch, setisSearch] = useState(true);
    const [isActiveModal, setIsActiveModal] = useState(false);


    useEffect (()=>{
        (async function() {
            let dataHome= await getHome.getAll("/homePage/getHome" ,{
                page:0,
            })
    
            let topSearch = await getHome.getAll("/search/v1/searchLeaderboard")

            if(dataHome){
   
              dataHome.recommendItems.forEach(e => {
                if(e.homeSectionType === "BANNER"){
                  sethomeBanner(e.recommendContentVOList)
                }

                else if(e.homeSectionName === "Trending Now"){
                  sethomeTrending(e.recommendContentVOList)
                }

                else if(e.homeSectionName === "Hot K-Drama"){
                  sethomeHotDrama(e.recommendContentVOList)
                  sethomeNewestReleases(e.recommendContentVOList)

                }
                else if(e.homeSectionName === "Movie Selection"){
                  sethomeDarkFairyTales(e.recommendContentVOList)
                }
                // else if(e.homeSectionName === "Hot K-Drama"){
                //   sethomeNewestReleases(e.recommendContentVOList)
                // }
              });
              SetisLoading(true);
            }
            if(topSearch){
              settopSearchhome(topSearch.list)
            }              
        }    
        )();
    },[])

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


    return (
        <div className="Home">
 
        <div className="row no-gutters">
          <div className="navBar-left">
            <div className="row no-gutters">
              <div className="icon_film"><img src="./image/icon.png" alt="" /> </div> 
              <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px'}}>FilmHot</div>   
            </div>
            <div className="menu mt-40px">MENU</div>
            <div className="menu active_navbar-left"> <NavLink to="/"><i className="fas fa-home text-xl " />Home</NavLink></div>
            <div className="menu"><NavLink to="/Preview"><i className="fas fa-compass text-xl " />Discovery</NavLink></div>
            <div className="menu"><i className="fas fa-desktop text-xl " />Explore</div>
            <div className="menu"><NavLink to="/History"><i className="fas fa-history text-xl " />History</NavLink></div>
            <div className="menu mt-40px">PERSONAL</div>
            <div className="menu"><i className="fas fa-sign-in-alt text-xl" />Sign in</div>
          </div>

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

          <div className="Home-content">
            
       {isLoading ? <Swiper  className="Home-banner" 
                autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                }}  
                loop={true}
                navigation={true} 
                modules={[Navigation,Pagination]}
                pagination={{ clickable: true }}
       
       >
            {
                 homeBanner.map((item,index)=>{
                    return (<SwiperSlide key={index}><img src={horizontalSize(item.imageUrl,1189,520)} alt="" /></SwiperSlide>);
                })
            }
      </Swiper>:<SkeletonsBanner></SkeletonsBanner>}




            <div className="Home-title">Trending Now</div>
     
            {isLoading ? 
            <Swiper   
            navigation={true} modules={[Navigation]}
            // slidesPerGroup={6}
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup:2
              },
              // when window width is >= 640px
              640: {
                slidesPerGroup:3,
                slidesPerView: 3
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                slidesPerGroup:3

              },
              1025: {
                slidesPerView: 6,
                slidesPerGroup:6

              },
            }}>
            {
                 homeTrending.map((item,index)=>{
                    return (
                    <SwiperSlide 
                    key={index}
                    >
                      <MovieItem
                      category={item.category}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}></MovieItem>
                    </SwiperSlide>);
                })
            }
          </Swiper>:<SkeletonsMovie></SkeletonsMovie>}


              
            <div className="Home-title">Hot K-Drama</div>
            {isLoading ? 
            <Swiper   
            navigation={true} modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup:2

              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                slidesPerGroup:2

              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                slidesPerGroup:3

              },
              1023: {
                slidesPerView: 6,
                slidesPerGroup:6

              },
            }}>
            {
                 homeHotDrama.map((item,index)=>{
                    return (<SwiperSlide key={index}>
                <MovieItem
                      category={item.category}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}></MovieItem>
                    </SwiperSlide>);
                })
            }
          </Swiper>:<SkeletonsMovie></SkeletonsMovie>}



          <div className="Home-title">Dark Fairy Tales</div>
            {isLoading ? 
            <Swiper   
            navigation={true} modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup:2

              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                slidesPerGroup:2

              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                slidesPerGroup:3

              },
              1023: {
                slidesPerView: 6,
                slidesPerGroup:6

              },
            }}>
            {
                 homeDarkFairyTales.map((item,index)=>{
                    return (<SwiperSlide key={index}>
                <MovieItem
                      category={item.category}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}></MovieItem>
                    </SwiperSlide>);
                })
            }
          </Swiper>:<SkeletonsMovie></SkeletonsMovie>}


          <div className="Home-title">Classic</div>
          {isLoading ? 
            <Swiper   
            navigation={true} modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
                slidesPerGroup:2

              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
                slidesPerGroup:2

              },
              // when window width is >= 768px
              768: {
                slidesPerView: 3,
                slidesPerGroup:3

              },
              1023: {
                slidesPerView: 6,
                slidesPerGroup:6

              },
            }}>
            {
                 homeNewestReleases.map((item,index)=>{
                    return (<SwiperSlide key={index}>
                <MovieItem
                      category={item.category}
                      id={item.id}
                      imageUrl={item.imageUrl}
                      title={item.title}></MovieItem>
                    </SwiperSlide>);
                })
            }
          </Swiper>:<SkeletonsMovie></SkeletonsMovie>}


          </div>



          <div className="navBar-right">
            <div className="Search-film">
              <input onChange={handleSearchTermChange}  className="Search-film-input" type="text" placeholder="Search..." />
              <NavLink to={`/Search/${searchTerm}`}> <i className="fas fa-search text-xl icon-search" /></NavLink>
             {isSearch && <div className='Modal-search' >
                {dataSearchTerm && dataSearchTerm.searchResults.map((item,index)=>{
               return  <div key={index}
               id={item.id}
               category={item.domainType}
               className='Search-film-item'>  <NavLink to={`/DetailVideo/${item.id}/${item.domainType}`}>{item.name}</NavLink></div>
                })
                }
             
              </div>}
            </div>
            <div className="Home-title">Top Searches</div>

            {isLoading?
              topSearchhome.map((item,index)=>{
                return (
                    <div key={index} className="top-search-item">
                 <NavLink to={`/DetailVideo/${item.id}/${item.domainType}`}>  
                    <div className="row no-gutters">
                      <div className="top-search-img col l-5">
                        <img src={item.cover} alt="" />
                      </div>
                      <div className="top-search-name col l-7">{item.title}</div>
                    </div>
                </NavLink> 
                  </div>
                )
              }) : [1,2,3,4,5,6,7,8,9].map((item,index)=>{
                return (<SkeletonsTopsearch key={index}></SkeletonsTopsearch>)
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
            <div className="menu"><NavLink to="/Preview"><i className="fas fa-compass text-xl " />Discovery</NavLink></div>
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

export default Home;
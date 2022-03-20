import React, { useEffect, useRef, useState } from 'react';
import getHome from '../../api/getHome';


import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.scss";
import "swiper/components/navigation/navigation.scss";

// import Swiper core and required modules
import SwiperCore, { Navigation ,Autoplay } from "swiper";
import SkeletonsBanner from '../Skeletons/SkeletonsBanner';
import SkeletonsMovie from '../Skeletons/SkeletonsMovie';
import SkeletonsTopsearch from '../Skeletons/SkeletonsTopsearch';
import MovieItem from './MovieItem';
import { NavLink } from 'react-router-dom';


// install Swiper modules
SwiperCore.use([Navigation,Autoplay]);




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


    useEffect (()=>{
        (async function() {
            let dataHome= await getHome.getAll("/homePage/getHome" ,{
                page:0,
            })
    
            let topSearch = await getHome.getAll("/search/v1/searchLeaderboard")

            if(dataHome&&topSearch){
              sethomeBanner(dataHome.recommendItems[1].recommendContentVOList)
              sethomeTrending(dataHome.recommendItems[4].recommendContentVOList)
              sethomeHotDrama(dataHome.recommendItems[2].recommendContentVOList)
              sethomeDarkFairyTales(dataHome.recommendItems[7].recommendContentVOList)
              sethomeNewestReleases(dataHome.recommendItems[5].recommendContentVOList)
              settopSearchhome(topSearch.list)
              SetisLoading(true);
            }


               
        }    
        )();
    },[])

    useEffect(()=>{
      (async function() {
        let dataSearch= await getHome.postSearchwithKeyWord({
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


console.log(dataSearchTerm)
    return (
        <div className="Home">
 
        <div className="row no-gutters">
          <div className="navBar-left">
            <div className="row no-gutters">
              <div className="icon_film"><img src="./image/icon.png" alt="" /> </div> 
              <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px'}}>FilmHot</div>   
            </div>
            <div className="menu mt-40px">MENU</div>
            <div className="menu"><i className="fas fa-home text-xl " />Home</div>
            <div className="menu"><i className="fas fa-compass text-xl " />Discovery</div>
            <div className="menu"><i className="fas fa-desktop text-xl " />Explore</div>
            <div className="menu"><i className="fas fa-history text-xl " />History</div>
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
            <i className="fas fa-bars icon-home-list"></i>
            </div>
          </div>

          <div className="Home-content">
            
       {isLoading ? <Swiper  className="Home-banner" navigation={true} modules={[Navigation]}>
            {
                 homeBanner.map((item,index)=>{
                    return (<SwiperSlide key={index}><img src={item.imageUrl} alt="" /></SwiperSlide>);
                })
            }
      </Swiper>:<SkeletonsBanner></SkeletonsBanner>}




            <div className="Home-title">Trending Now</div>
     
            {isLoading ? 
            <Swiper   
            navigation={true} modules={[Navigation]}
            breakpoints={{
              0: {
                slidesPerView: 2,
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 4,
              },
              1023: {
                slidesPerView: 6,
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
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 4,
              },
              1023: {
                slidesPerView: 6,
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
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 4,
              },
              1023: {
                slidesPerView: 6,
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
              },
              // when window width is >= 640px
              640: {
                slidesPerView: 2,
              },
              // when window width is >= 768px
              768: {
                slidesPerView: 4,
              },
              1023: {
                slidesPerView: 6,
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
                    <div className="row no-gutters">
                      <div className="top-search-img col l-5">
                        <img src={item.cover} alt="" />
                      </div>
                      <div className="top-search-name col l-7">{item.title}</div>
                    </div>
                  </div>
                )
              }) : [1,2,3,4,5,6,7,8,9].map((item,index)=>{
                return (<SkeletonsTopsearch key={index}></SkeletonsTopsearch>)
              })
            }


          </div>
        </div>
      </div>
      
    );
}

export default Home;
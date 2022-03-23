import React, { useEffect, useState } from 'react';
import "./DetailVideo.css"
import { NavLink, useParams } from "react-router-dom";
import getHome from '../../api/getHome';
import SkeletonsLikeList from '../Skeletons/SkeletonsLikeList';

function WatchMovie(props) {
  const { id, category } = useParams();
  const [dataDetail, setdataDetail] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [episodeId,setEpisodeId] = useState();
  const [definition,setDefinition] = useState();
  useEffect(()=>{
    (async function () {
      const getDataDetail = await getHome.getDetail({id,category});
      setIsLoading(false)
      if(getDataDetail){
        setdataDetail(getDataDetail.data.data)
        setEpisodeId(getDataDetail.data.data.episodeVo[0].id)
        setDefinition(getDataDetail.data.data.episodeVo[0].definitionList[0].code)
        setIsLoading(true)
      }
      
 
    })()   
  },[id])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
 
  // console.log(dataDetail)
  // console.log(category,id,episodeId,definition)
    return (
        <div className="watchMovie-Container">
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
        <div className="watchMovie-content row ">
          <div className="col l-9 m-12 c-12">
           {isLoading ? <div className="video-container" ><img src={dataDetail.coverHorizontalUrl} alt="" /></div> : <div className="img-Detail-Skeleton" ></div>}
          </div>
          <div className="col l-3 m-12 c-12 ">
            <div className="Home-title-detail">Similar to this</div>
           <div className='Similar-container'>
          {isLoading ?  dataDetail.likeList.map((item,index)=>{
            return( 
            <div key={index} className="watch-item">
          <NavLink to={`/DetailVideo/${item.id}/${item.category}`}>  
            <div className="row no-gutters">
              <div className="watch-img col l-3">
                <img src={item.upImgUrl} alt="" />
              </div>
              <div className="Similar col l-9">{item.upName}</div>
            </div>
          </NavLink> 
          </div>)
          })  : [1,2,3,4,5,6,7].map((item,index)=>{
            return ( <SkeletonsLikeList key={index}></SkeletonsLikeList>)
          })
          
          }
        </div>



          </div>
        </div>
        <div className="btn-watch-now">
        <NavLink to={`/WatchMovie/${id}/${category}/${episodeId}/${definition}`}> <button>WATCH NOW</button> </NavLink>
        </div>
       {isLoading ? <div className="name-Video">{dataDetail.aliasName}</div>:<div className="text-Name-detail-skeletons" ></div>}
        <div className="row no-gutters"> 
          <div className="row no-gutters">
            <div className="video-Star"><img src="../../image/star.png" alt="" /></div>
           {dataDetail && <div className="video-point"> {dataDetail.score}</div> }  
          </div>
          <div className="row no-gutters">
            <div className="video-Star m-l-20px"><img src="../../image/calendar.png" alt="" /></div>
           {dataDetail && <div className="video-point"> {dataDetail.year}</div>   }
          </div>
        </div>
        <div className="tags-video row no-gutters">
          {
            dataDetail && dataDetail.tagNameList.map((item,index)=>{
              return (<div key={index} className="tag-item">{item}</div>)
            })
          }
       
        </div>
        <div className="row col l-9">
          {dataDetail && <div className="description-video">{dataDetail.introduction}</div>}
          <div className="comment-video">Comment</div>
          <div className="row no-gutters border-commnet">
            <div className="user-img-commnet"><img src="../../image/default-avatar.png" alt="" /></div>
            <div className="user-img-commnet-text"> You need to Sign in to comment</div>   
          </div>
        </div>
      </div>
      
    );
}

export default WatchMovie;
import React, { useEffect, useRef, useState } from 'react';
import "./WatchMovie.css"
import "../DetailVideo/DetailVideo.css"
import ReactHlsPlayer from 'react-hls-player';
import getDetail from '../../api/getDetail';
import getMediaUrl from '../../api/getMediaUrl';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';


function WatchMovie(props) {
  const { id, category, episodeId,definition } = useParams();
  const [urlMedia, setUrlMedia] = useState();
  const [dataDetail, setdataDetail] = useState();

  const [episodeIdCurrent, setepisodeIdCurrent] = useState(episodeId);

  const [subtitleCurrent, setSubtitleCurrent] = useState(0);
  const [linkVNSubtitle, setlinkVNSubtitle] = useState("");


  const typingTimeoutRef = useRef(null)
  const [searchTerm, setSearchTerm] = useState('');

  // console.log(episodeIdCurrent)
    useEffect(()=>{
        (async function() {
            let mediaUrl = await getMediaUrl.getMediaUrl({
                id,
                category,
                episodeId:episodeIdCurrent,
                definition,
            })
            if(mediaUrl){
              setUrlMedia(mediaUrl.data.data);
            }

            const getDataDetail = await getDetail.getDetail({id,category});
            if(getDataDetail){
              setdataDetail(getDataDetail.data.data)
              const linkVNSubtitleGET = getDataDetail.data.data.episodeVo[subtitleCurrent].subtitlingList.filter((item) => item.languageAbbr === 'vi');
              if(linkVNSubtitleGET.length > 0){
                setlinkVNSubtitle(linkVNSubtitleGET)
              }
              
   
            }
            
            
        }    
        )();
        
        

    },[episodeIdCurrent])

    useEffect(() => {
      window.scrollTo(0, 0)
    }, [])
    
// console.log(dataDetail);
// console.log(subtitleCurrent);
    

    function handleReload() {
        window.location.reload();
    }

    function handleChangeEpisodes(idChange,subtitle) {
      setepisodeIdCurrent( (idChange).toString())
      setSubtitleCurrent(subtitle)
    }

    function handleSearchTermChange(e) {
      if(typingTimeoutRef.current){
        clearTimeout(typingTimeoutRef.current)
      };
    
     typingTimeoutRef.current = setTimeout(()=>{
        setSearchTerm(e.target.value)
        // console.log(e.target.value)
    },500)
    }

    return (
        <div className="container-watch">   
        <div className="grid wide">

        <div className="watchMovie-header row ">
          <div className="col l-6 m-6 c-6">
            <div className="row no-gutters">
            <NavLink to="/"><div className="watchMovie-icon_film"><img src="/../image/icon.png" alt="" /> </div> </NavLink>  
            <NavLink to="/"> <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px', lineHeight: '31px'}}>FilmHot</div> </NavLink>  
            </div>
          </div>
          <div className="col l-6 m-6 c-6">
            <div className="Search-film-watch">
            <input onChange={handleSearchTermChange} className="Search-film-input-watch" type="text" placeholder="Search..." />
              <NavLink to={`/Search/${searchTerm}`}> <i className="fas fa-search text-xl icon-search" /></NavLink>
            </div>
          </div>
        </div>
{/* https://ezexpress.tk/ */}
{/* https://ezexpress.tk/ */}

     {urlMedia && dataDetail  ?  <ReactHlsPlayer
        poster={dataDetail.coverHorizontalUrl}
        src={`${urlMedia.mediaUrl}`}
        autoPlay={false}
        controls={true}
        width="100%"
        height="auto"
        crossOrigin="anonymous"
      >
   {linkVNSubtitle && <track src={`https://srt-to-vtt.vercel.app/?url=${linkVNSubtitle.length ?linkVNSubtitle[0].subtitlingUrl : linkVNSubtitle}&fbclid=IwAR3MvrIZO03DsPBEwaHtgglomtEH_10tzzzxxw-COoSRUbTfh3wAHbRD6oc`} default />}

        </ReactHlsPlayer>  : <div className='img-Detail-Skeleton' ></div>
    }

    <div className="Warning-video">Nếu sau 15s không tải được phim, vui lòng nhấn vào <button onClick={()=>handleReload()}>Reload</button></div>
    {dataDetail ? <div className="name-Video">{dataDetail.name}</div>:<div className="text-Name-detail-skeletons" ></div>}
    
    <div className='Episodes-title'>Episodes</div>
    <div className="row sm-gutter">
      {
        dataDetail ? dataDetail.episodeVo.map((item,index)=>{
          return (
            <div key={index} className='col l-0-6 m-2-4 c-2-4'>
          <button  
            onClick={()=>handleChangeEpisodes(item.id,index)}
            className={episodeIdCurrent == item.id ?'Episodes-btn Episodes-btn-active':'Episodes-btn col'}>{index+1}</button>
            </div>)
        }) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15].map((item,index)=>{
          return (
            <div key={index} className='col l-1 m-2-4 c-2-4'>
          <div  
            className="Skeleton-Episodes"></div>
            </div>)
        })
      }
    
    </div>

       <div className="row no-gutters"> 
          <div className="row no-gutters">
            <div className="video-Star"><img src="/../image/star.png" alt="" /></div>
           {dataDetail && <div className="video-point"> {dataDetail.score}</div> }  
          </div>
          <div className="row no-gutters">
            <div className="video-Star m-l-20px"><img src="/../image/calendar.png" alt="" /></div>
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
        {dataDetail && <div className="description-video">{dataDetail.introduction}</div>}
          <div className="row no-gutters border-commnet">
            <div className="user-img-commnet"><img src="/../image/default-avatar.png" alt="" /></div>
            <div className="user-img-commnet-text"> You need to Sign in to comment</div>   
          </div>

      </div>
      </div>
    );
}

export default WatchMovie;
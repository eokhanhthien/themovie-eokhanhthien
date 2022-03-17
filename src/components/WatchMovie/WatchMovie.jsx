import React, { useEffect, useState } from 'react';
import "./WatchMovie.css"
import ReactHlsPlayer from 'react-hls-player';
import getHome from '../../api/getHome';
import { useParams } from 'react-router';
import { NavLink } from 'react-router-dom';


function WatchMovie(props) {
  const { id, category, episodeId,definition } = useParams();
  const [urlMedia, setUrlMedia] = useState();
  const [dataDetail, setdataDetail] = useState();

  const [episodeIdCurrent, setepisodeIdCurrent] = useState(episodeId);

  const [subtitleCurrent, setSubtitleCurrent] = useState(0);
  const [linkVNSubtitle, setlinkVNSubtitle] = useState("");

  // console.log(episodeIdCurrent)
    useEffect(()=>{
        (async function() {
            let mediaUrl = await getHome.getMediaUrl({
                id,
                category,
                episodeId:episodeIdCurrent,
                definition,
            })
            if(mediaUrl){
              setUrlMedia(mediaUrl.data.data);
            }

            const getDataDetail = await getHome.getDetail({id,category});
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
    
console.log(linkVNSubtitle);
// console.log(subtitleCurrent);
    

    function handleReload() {
        window.location.reload();
    }

    function handleChangeEpisodes(idChange,subtitle) {
      setepisodeIdCurrent( (idChange).toString())
      setSubtitleCurrent(subtitle)
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
              <input className="Search-film-input-watch" type="text" placeholder="Search..." />
              <i className="fas fa-search text-xl icon-search" />
            </div>
          </div>
        </div>


     {urlMedia && dataDetail  ?  <ReactHlsPlayer
        poster={dataDetail.coverHorizontalUrl}
        src={urlMedia.mediaUrl}
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
    {dataDetail ? <div className="name-Video">{`${dataDetail.aliasName} tập ${subtitleCurrent+1}`}</div>:<div className="text-Name-detail-skeletons" ></div>}
    
    <div className='Episodes-title'>Episodes</div>
    <div className="row ">
      {
        dataDetail && dataDetail.episodeVo.map((item,index)=>{
          return (
            <div key={index} className='col l-1 m-2-4 c-2-4'>
          <button  
            onClick={()=>handleChangeEpisodes(item.id,index)}
            className={episodeIdCurrent == item.id ?'Episodes-btn Episodes-btn-active':'Episodes-btn col'}>{index+1}</button>
            </div>)
        })
      }
    
    </div>

          <div className="row no-gutters border-commnet">
            <div className="user-img-commnet"><img src="/../image/default-avatar.png" alt="" /></div>
            <div className="user-img-commnet-text"> You need to Sign in to comment</div>   
          </div>

      </div>
      </div>
    );
}

export default WatchMovie;
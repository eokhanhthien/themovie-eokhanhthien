import React, { useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { NavLink } from 'react-router-dom';
import "./Preview.css"
import getPreview from '../../api/getPreview';
import getPreviewVideoMedia from '../../api/getPreviewVideoMedia';
import "../DetailVideo/DetailVideo.css"

function Preview(props) {
  const [dataPreview, setDataPreview] = useState();
  const [dataCallMedia, setdataCallMedia] = useState()

  const [isActiveModal, setIsActiveModal] = useState(false);


  const [array, setArray] = useState([])

    useEffect(()=>{
      (async function() {
    try {     let dataPeoplePreview = await getPreview.getPreview({
          page:0
         })
        setDataPreview(dataPeoplePreview.data.data)    

        for(let i=0;i<3;i++ ){

          let dataVideoMedia1 = await getPreviewVideoMedia.getPreviewVideoMedia({
            category:dataPeoplePreview.data.data[i].category,
            contentId: dataPeoplePreview.data.data[i].id,
            episodeId: dataPeoplePreview.data.data[i].mediaInfo.id,
            definition: dataPeoplePreview.data.data[i].mediaInfo.definitionList[0].code, 
        })

        // setArray([...array , dataVideoMedia1.data.data[0].mediaUrl])      Chỉ cập nhật lại

        //Push vào array state
        setArray(oldArray => [...oldArray, dataVideoMedia1.data.data[0].mediaUrl])        
      }





        let dataVideoMedia = await getPreviewVideoMedia.getPreviewVideoMedia({
          category:dataPeoplePreview.data.data[0].category,
          contentId: dataPeoplePreview.data.data[0].id,
          episodeId: dataPeoplePreview.data.data[0].mediaInfo.id,
          definition: dataPeoplePreview.data.data[0].mediaInfo.definitionList[0].code, 
        })

        if(dataVideoMedia){
          setdataCallMedia(dataVideoMedia.data)
        }

         }
         catch(e){
          console.log(e)
         }
      
      }

    )()
    },[])

    function handleOpenModalHome() {
      setIsActiveModal(!isActiveModal)
    }

    // console.log(dataPreview);
    // console.log(array[0]);


    return (
        <div className="Home">
 
        <div className="row no-gutters">
          <div className="navBar-left">
            <div className="row no-gutters">
              <div className="icon_film"><img src="./image/icon.png" alt="" /> </div> 
              <div style={{fontWeight: 600, color: 'white', marginLeft: '12px', fontSize: '19px'}}>FilmHot</div>   
            </div>
            <div className="menu mt-40px">MENU</div>
            <div className="menu"> <NavLink to="/"><i className="fas fa-home text-xl " />Home</NavLink></div>
            <div className="menu active_navbar-left"> <NavLink to="/Preview"><i className="fas fa-compass text-xl " />Discovery</NavLink></div>
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
            <i onClick={()=>handleOpenModalHome()} className="fas fa-bars icon-home-list"></i>
            </div>
          </div>
          
          <div className="Preview-Container row no-gutters">

            {
              dataPreview && dataPreview.map((item,index)=>{
                return (
              <div key={index} className="col l-12 m-12 c-12">
                <div className="Video_preview_item">
                    <div className="row no-gutters">
                        <div className="Preview_img_title col l-1 m-1 c-1">
                          <img src={item.upInfo.upImgUrl} alt="" />
                        </div>
                        <div className="Preview_img_name col l-11 m-11 c-11">
                          <div>{item.upInfo.upName}</div>
                          <div>{item.introduction}</div>
                         
                        </div>
                        <div className="col l-10 m-10 c-10 video-custom-preview">
                   {dataCallMedia  && array && <ReactHlsPlayer
                              poster={item.coverHorizontalUrl}
                              src={array[index]}
                              autoPlay={false}
                              controls={true}
                              width="100%"
                              height="auto"
                              crossOrigin="anonymous"
                            >

                     </ReactHlsPlayer>}
                        </div>
                        <div className="col l-2 m-2 c-2 Preview_img_btn">

                          <div className='Preview_img_btn_item'>
                            <button> <i className="fas fa-heart Preview_img_btn_item_heart"></i></button>
                               <div>{item.likeCount}</div> 
                          </div>

                          <div className='Preview_img_btn_item'>
                          <NavLink to={`/DetailVideo/${item.refList[0].id}/${item.refList[0].category}`}> <button><i className="fas fa-external-link-alt Preview_img_btn_item_opem"></i></button></NavLink> 
                               <div>Open</div> 
                          </div>

                        </div>
                    </div>
                </div>
              </div>
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

export default Preview;
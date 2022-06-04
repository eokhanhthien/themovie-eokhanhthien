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
import "../Skeletons/Skeletons.css"

function Explore(props) {
    const {keyword} = useParams();
    const [dataSearchTerm, setDataSearchTerm] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const typingTimeoutRef = useRef(null)
    const [searchTerm, setSearchTerm] = useState('');

    const [dataAllFilm, setdataAllFilm] = useState('');
    const [searchConfig, setsearchConfig] = useState('');

    // typeID la id cua loai phim , TV , anime .....
    const [typeID, settypeID] = useState(2); 
    const [paramFilter, setparamFilter] = useState("TV,SETI,MINISERIES,VARIETY,TALK,COMIC,DOCUMENTARY"); 


     // typeIDFilters la id cua loai loc theo nuoc,thoi gian.....
    const [typeIDFilters, settypeIDFilters] = useState("");
    

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

      const [filters , setFilters]  = useState({
              size: 50,
              param: "",
              area: "",
              category: "",
              year: "",
              subtitles: "",
              order: "up"
            })


      useEffect(()=>{
        (async function() {
          setIsLoading(false)
          let allFilm= await postAdvancedSearch.postAdvancedSearch({
            param:filters.param,
            area:filters.area,
            category:filters.category,
            year:filters.year
        })
        let Config= await postAdvancedSearch.getSearchConfig({
        })
        if(allFilm && Config){
          setdataAllFilm(allFilm.data.data.searchResults);
          setsearchConfig(Config.data.data)
          setIsLoading(true)
        }
        }
        )()
      },[filters])
      // console.log(dataAllFilm)
      // console.log(searchConfig)



      

      function SortFilm(id_sort_fiml,params) {
        settypeID(id_sort_fiml)
        setparamFilter(params)
        setFilters({
          ...filters,
          param :params,
        })
      }

      function handleSetFilters(id) {
               settypeIDFilters(id)
      }


      function handleChange(e) {
        if(typeIDFilters===4 || typeIDFilters===1 || typeIDFilters===7){
          setFilters({
            ...filters,
            area: e.target.value,
            param :paramFilter,
          })
        }
        else if(typeIDFilters===5 || typeIDFilters===2 || typeIDFilters===8){
          setFilters({
            ...filters,
            category: e.target.value,
          })
        }

        else if(typeIDFilters===6 || typeIDFilters===3 || typeIDFilters===9){
          setFilters({
            ...filters,
            year: e.target.value,
          })
        }
      }

// console.log(filters)
// console.log(typeID)
// console.log(paramFilter)
// console.log(filters)

      
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
          {searchConfig.length > 0? searchConfig.map((item,index)=>{
            return ( <div key={index} onClick={()=>SortFilm(item.id, item.params)} className={item.id===typeID ? "Explore-title Explore-title-active":"Explore-title"}>{item.name}</div>)
          }) : [0,1,2].map((item,index)=><div key={index} className="Explore-title-skeleton"></div>)  }
        </div>

        <div className="row no-gutters mt-mb-20px">
          {/* Filter de loc ra Id va map long map de lap lien tuc */}
        {searchConfig.length > 0? searchConfig.filter(item=> item.id === typeID).map((item1)=>{
          return ( item1.screeningItems.map((item3,index)=>{
             return (<select key={index} onClick={()=>handleSetFilters(item3.id)} onChange={handleChange}  className='Filter-option' >
             {
               item3.items.map((item4,index)=>{
                 return ( <option key={index} className="option-filter" value={item4.params}  name="" id="">{item4.name}</option>)
               })
             }
             
           </select>)
           }))
        }
          ) : [0,1,2,3,4].map((item,index)=><div key={index} className="Explore-title-skeleton-filter"></div>) }


        
        </div>

        {dataAllFilm.length>0 ? <div className='row'>
        {isLoading && dataAllFilm ? dataAllFilm.map((item,index)=>{
            return (
            <SearchFilmItem key={index}
            id={item.id}
            domainType={item.domainType}
            coverVerticalUrl={item.coverVerticalUrl}
            name={item.name}

            category={item.domainType}
            imageUrl={item.coverVerticalUrl}
            title={item.name}
            ></SearchFilmItem>
            )
        }) : [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item,index1)=>{
            return (
                <SkeletonsSearchFilm key={index1}></SkeletonsSearchFilm>
            )
        })

        }
        </div> : <div className='not-found-film'>Nothing more to see</div>}

        </div>
    )
}

export default Explore;
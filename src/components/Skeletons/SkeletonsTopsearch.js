import React from 'react';
import Shimmer from './Shimmer';
import "./Skeletons.css"

function SkeletonsTopsearch(props) {
    return (
        <div  className="top-search-item animation-shimmer">
        <div className="row no-gutters">
          <div className="top-search-img col l-5 m-5 c-5">
           <div className='img-thumbnail'></div>
          </div>
          <div className="top-search-name col l-7 m-7 c-7"><div className='text-16px-skeletons'></div></div>
        </div>
        <Shimmer></Shimmer>
      </div>
    );
}

export default SkeletonsTopsearch;
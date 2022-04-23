import React from 'react';
import Shimmer from './Shimmer';

function SkeletonsLikeList(props) {
    return (
        <div className="watch-item animation-shimmer">
            <div className="row ">
              <div className="watch-img col l-3 m-3 c-3">
                <div className='SkeletonsLikeList-thumb'></div>
              </div>
              <div className="SkeletonsLikeList-text-container col l-9 m-9 c-9">
              <div className='SkeletonsLikeList-text'></div>
              </div>
            </div>
            <Shimmer></Shimmer>
          </div>
    );
}

export default SkeletonsLikeList;
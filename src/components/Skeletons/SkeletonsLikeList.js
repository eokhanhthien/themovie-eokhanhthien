import React from 'react';


function SkeletonsLikeList(props) {
    return (
        <div className="watch-item ">
            <div className="row ">
              <div className="watch-img col l-3 m-3 c-3">
                <div className='SkeletonsLikeList-thumb'></div>
              </div>
              <div className="SkeletonsLikeList-text-container col l-9 m-9 c-9">
              <div className='SkeletonsLikeList-text'></div>
              </div>
            </div>
          </div>
    );
}

export default SkeletonsLikeList;
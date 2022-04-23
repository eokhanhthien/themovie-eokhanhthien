import React from 'react';
import Shimmer from './Shimmer';
import "./Skeletons.css"

function SkeletonsBanner(props) {
    return (
        <div className="Home-banner animation-shimmer">
            <div className='img-banner'></div>
            <Shimmer></Shimmer>
        </div>
    );
}

export default SkeletonsBanner;
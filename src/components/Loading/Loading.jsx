import React from 'react';
import "./Loading.css"

function Loading(props) {
    return (
        <div className='Loading-container'>
         <span className='Loading-item'></span>
         <span className='Loading-item'></span>
         <span className='Loading-item'></span>
         <span className='Loading-item'></span>
        </div>
    );
}

export default Loading;
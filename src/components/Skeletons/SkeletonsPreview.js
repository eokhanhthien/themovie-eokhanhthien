import React from 'react';
import "./Skeletons.css"
function SkeletonsPreview(props) {
    return (
        <div className="col l-12 m-12 c-12">
        <div className="Video_preview_item">
            <div className="row no-gutters">
                <div className=" col l-1 m-1 c-1">

                  <div className="Preview_img_title-Skeleton"></div>

                </div>

                <div className=" col l-11 m-11 c-11">
                    <div className='Preview_img_name-Skeleton'> </div>
                </div>

                <div className="col l-10 m-10 c-10 video-custom-preview-Skeleton"></div>

                <div className="col l-2 m-2 c-2 Preview_img_btn">

                  <div className='Preview_img_btn_item'>
                    <button> <div className='Preview_img_btn-Skeleton'></div> </button></div>

                <div className='Preview_img_btn_item'>
                 <button> <div className='Preview_img_btn-Skeleton'></div> </button></div>

                </div>
            </div>
        </div>
      </div>
    );
}

export default SkeletonsPreview;
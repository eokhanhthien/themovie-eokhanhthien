import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
import Home from './Home/Home';
import DetailVideo from "./DetailVideo/DetailVideo.jsx";
import WatchMovie from './WatchMovie/WatchMovie';
import SearchFilm from './SearchFilm/SearchFilm';
import Preview from './Preview/Preview';
import SearchMobile from './SearchMobile/SearchMobile';

function dieuhuongURL(props) {
    return (
        <Routes>
        <Route exact path="" element={<Home></Home>} />
        <Route exact path="/Preview" element={<Preview></Preview>} />
        <Route exact path="/SearchMobile" element={<SearchMobile></SearchMobile>} />
        <Route exact path='/DetailVideo/:id/:category' element={<DetailVideo></DetailVideo>} />
        <Route exact path='/WatchMovie/:id/:category/:episodeId/:definition' element={<WatchMovie></WatchMovie>} />
        <Route exact path='/Search/:keyword' element={<SearchFilm></SearchFilm>} />
        </Routes>
    );
}

export default dieuhuongURL;
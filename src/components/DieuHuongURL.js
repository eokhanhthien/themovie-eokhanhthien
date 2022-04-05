import React, { Suspense } from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
  } from "react-router-dom";
// import Home from './Home/Home';
// import DetailVideo from "./DetailVideo/DetailVideo.jsx";
// import WatchMovie from './WatchMovie/WatchMovie';
// import SearchFilm from './SearchFilm/SearchFilm';
// import Preview from './Preview/Preview';
// import SearchMobile from './SearchMobile/SearchMobile';
const Home = React.lazy(() => import('./Home/Home'));
const DetailVideo = React.lazy(() => import('./DetailVideo/DetailVideo.jsx'));
const WatchMovie = React.lazy(() => import('./WatchMovie/WatchMovie'));
const SearchFilm = React.lazy(() => import('./SearchFilm/SearchFilm'));
const Preview = React.lazy(() => import('./Preview/Preview'));
const SearchMobile = React.lazy(() => import('./SearchMobile/SearchMobile'));


function dieuhuongURL(props) {
    return (
        <Routes>
        <Route exact path="" element={ <Suspense fallback={<div>Loading...</div>}><Home></Home></Suspense>} />
        <Route exact path="/Preview" element={<Suspense fallback={<div>Loading...</div>}><Preview></Preview></Suspense>} />
        <Route exact path="/SearchMobile" element={<Suspense fallback={<div>Loading...</div>}><SearchMobile></SearchMobile></Suspense>} />
        <Route exact path='/DetailVideo/:id/:category' element={<Suspense fallback={<div>Loading...</div>}><DetailVideo></DetailVideo></Suspense>} />
        <Route exact path='/WatchMovie/:id/:category/:episodeId/:definition' element={<Suspense fallback={<div>Loading...</div>}><WatchMovie></WatchMovie></Suspense>} />
        <Route exact path='/Search/:keyword' element={<Suspense fallback={<div>Loading...</div>}><SearchFilm></SearchFilm></Suspense>} />
        </Routes>
    );
}

export default dieuhuongURL;
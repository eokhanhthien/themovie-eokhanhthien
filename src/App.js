import './css/App.css';
import "./css/responsize.css"
import "./css/FontAwesome.Pro.6.0.0.alpha3/fontawesome6/pro/css/all.min.css"
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DieuHuongURL from './components/DieuHuongURL';

function App() {

  return (
    <Router>
      <DieuHuongURL></DieuHuongURL>
    </Router>

  );
}

export default App;

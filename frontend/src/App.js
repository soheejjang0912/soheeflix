import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom" 
import Home from "./routes/Home";
import List from "./routes/List";
import Detail from "./routes/Detail";
import Recommend from "./routes/Recommend";
import "./css/App.module.css";
import Backend from "./routes/Backend";

function App() {
  return(
    <Router basename={process.env.PUBLIC_URL}> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<List />}/>
        <Route path="/movie/:id" element={<Detail />}/>
        <Route path="/recommend" element={<Recommend />}/>
        <Route path="/backend" element={<Backend />}/>
      </Routes>
    </Router>
  );
}

export default App;

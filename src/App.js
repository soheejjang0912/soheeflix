import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom" 
import Home from "./routes/Home";
import List from "./routes/List";
import Detail from "./routes/Detail";
import "./css/App.module.css";

function App() {
  return(
    <Router> 
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/movie" element={<List />}/>
        <Route path="/movie/:id" element={<Detail />}/>
      </Routes>
    </Router>
  );
}

export default App;

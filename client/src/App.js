import { Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home";
import News from "./pages/News";
import  Tags  from "./components/Tags";
import NavbarC from "./components/NavbarC";

function App() {
  return (
    <>
<NavbarC/>
  <Routes>

<Route path="/" element={<News/>}/>

</Routes>
</>
  );
}

export default App;

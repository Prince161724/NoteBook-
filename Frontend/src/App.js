import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Sign_up';
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';

function App() {
  return (
    <>
    <NoteState>
      <BrowserRouter>
    <Navbar/>
      <Alert/>
      <div>
    <Routes>
  <Route path="/Home" element={<Home />} />
  <Route path="/" element={<Login />} />
  <Route path="/Signup" element={<Signup/>} />
  <Route path="/about" element={<About />} />
</Routes>
</div>

    </BrowserRouter>
    </NoteState>
    </>
  );
}

export default App;

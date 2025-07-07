import React ,{useContext}from 'react'
import nextContext from '../context/notes/noteContext';
import Notes from './Notes'
import Addnote from './Addnote'
import Alert from './Alert'
const Home=()=>{
return(
    <><div className="container" style={{ marginTop: "50px" }}
> 
    <Notes />
    </div>
    </>
)
}
export default Home;
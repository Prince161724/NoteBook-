import React ,{useContext}from 'react'
import nextContext from '../context/notes/noteContext';
import Notes from './Notes'
import Addnote from './Addnote'
const Home=()=>{
return(
    <>
    <Notes />
    </>
)
}
export default Home;
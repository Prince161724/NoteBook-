import React ,{useContext,useState}from 'react';
import nextContext from '../context/notes/noteContext';
import Notes from './Notes'
const Addnote = () => {
    const Context=useContext(nextContext);
    const {addnote,setNote,note,handleclick,Showalert,alert}=Context;
    
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
    return(
    <div className="container my-3">
        <h1>Add a Note Below</h1>
        <div className="container my-3">
            <form>
                <div className="form-group">
                    <label htmlFor="Title">Title</label>
                    <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="title" name="title" onChange={onChange} value={note.title}/>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="description" name="description" onChange={onChange} value={note.description}/>
                </div>
                 <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Tag</label>
                    <input type="text" className="form-control" id="tag" placeholder="tag" name="tag" onChange={onChange} value={note.tag}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={(e)=>{handleclick(e,note.title,note.description,note.tag);
                    Showalert("Note Added Successfully")
                }}>Add Note</button>
            </form>
        </div>
        
    </div>)
}



export default Addnote;
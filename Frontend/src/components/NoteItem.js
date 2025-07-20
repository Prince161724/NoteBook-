import React,{useContext,useRef} from 'react';
import nextContext from '../context/notes/noteContext';
const host = "http://localhost:5000";
const NoteItem = (props) => {
  const Context=useContext(nextContext);
  const {Notes2,setNote,Showalert,alert,fetchnotes,setNotes}=Context;
  const {updatenote}=props;
    const { title, description,tag} = props.note;
    const { note,id } = props;
    
    
    const ref=useRef(null);
    const updatenote2 = (note) => {
    //console.log("Notes =c",note);
    note.id?Deletenote(note.id):Deletenote(note._id);
        //console.log("Note to be deleted = ",id);
    }
        //console.log("Its being Printed");
    //Delete the Note
    const Deletenote = async (id) => {
      //console.log("id To be deleted = ",id)
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({id})
    });
    const json = await response.json();
    //console.log("Deleted response:", json);
    const newNotes = Notes2.filter(note => note.id !== id);
    setNotes(newNotes);
    fetchnotes();
  };
  


    return (
        <>
            <div className="col-md-4 p-2">
                <div className="card m-2">
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <i className="fa-solid fa-pen mx-2" onClick={() => updatenote(note)
                        }></i>
                        <i
                          className="fa-solid fa-trash mx-2" ref={ref}
                          onClick={() => {
                            updatenote2(note)
                            Showalert("Note Deleted SuccessFully")
                          }}
                        ></i>

                    </div>
                </div>
            </div>
        </>
    );
}

export default NoteItem;

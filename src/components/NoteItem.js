import React,{useContext} from 'react';
import nextContext from '../context/notes/noteContext';
const host = "http://localhost:5000";
const NoteItem = (props) => {
  const Context=useContext(nextContext);
  const {Notes2,setNotes}=Context;
  const {updatenote}=props;
    const { title, description, _id,tag} = props.note;
    let { Deletenote,note } = props; 
    Deletenote = async (id) => {
    const url = `${host}/api/notes/deleteNote/${id}`;
    console.log("Deleted")
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWYyZWIxNTg0MzhjNmUzOTUxN2IzMSIsImlhdCI6MTc1MTA2OTE0N30.EjjnWS10-6B-px0ty9jwJtpRMtWe5IRstr7EsTmpCVI'
      },
      body: JSON.stringify({ id})
    });
    const json = await response.json();
    console.log("Deleted response:", json);
    const newNotes = Notes2.filter(note => note._id !== id);
    setNotes(newNotes);
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
                          className="fa-solid fa-trash mx-2"
                          onClick={() => {
                            Deletenote(_id);
                            
                          }}
                        ></i>

                    </div>
                </div>
            </div>
        </>
    );
}

export default NoteItem;

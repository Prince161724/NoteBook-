import React, { useState,useRef } from 'react';
import noteContext from './noteContext';


const host = "http://localhost:5000"; // ✅ Use http if you're running locally, not https

const Notesinitial = [
];

// 🟢 Component starts
const NoteState = (props) => {
  const refClose=useRef(null);
  const [note,setNote]=useState({id:"", title:"",description:"",tag:""});

  const [Notes2, setNotes] = useState(Notesinitial); // ✅ square brackets were wrong

  // 🔴 Delete Note
  const Deletenote = async (id) => {
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

  // 🟡 Edit Note
  const Editnote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT', // ✅ Update method should be PUT (not POST)
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWYyZWIxNTg0MzhjNmUzOTUxN2IzMSIsImlhdCI6MTc1MTA2OTE0N30.EjjnWS10-6B-px0ty9jwJtpRMtWe5IRstr7EsTmpCVI'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    //console.log("Edit response:", json);
    
    
    const updatedNotes = Notes2.map(note =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };
  const handleclick=(e)=>{
        e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    }
    const handleclick2=(note)=>{
        refClose.current.click();
        //console.log(note);
        setNote({ title: "", description: "", tag: "" });
    }
  // 🟢 Add Note
  const addnote = async (title, description, tag) => {
    const url = `${host}/api/notes/AddNotes`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWYyZWIxNTg0MzhjNmUzOTUxN2IzMSIsImlhdCI6MTc1MTA2OTE0N30.EjjnWS10-6B-px0ty9jwJtpRMtWe5IRstr7EsTmpCVI'
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log("Add response:", json);

    // Dummy note for frontend update
    const newNote = {
      "_id": json._id || Math.random().toString(36), // fake ID if server doesn’t return
      "user": "685f2eb158438c6e39517b31",
      "title": title,
      "description": description,
      "tag": tag,
      "__v": 0
    };

    setNotes(Notes2.concat(newNote));
  };

  const fetchnotes = async () => {
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4NWYyZWIxNTg0MzhjNmUzOTUxN2IzMSIsImlhdCI6MTc1MTA2OTE0N30.EjjnWS10-6B-px0ty9jwJtpRMtWe5IRstr7EsTmpCVI'
      }
    });
    const json = await response.json();
    //console.log("Fetched response:", json);

    setNotes(json);
  };

  return (
    <noteContext.Provider value={{ Notes2, addnote, Deletenote, Editnote, setNotes,fetchnotes,note,setNote,handleclick,handleclick2,refClose }}>
        {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

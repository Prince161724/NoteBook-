import React, { useState, useRef, useEffect } from 'react';
import noteContext from './noteContext';


const host = "http://localhost:5000";

const Notesinitial = [
];

const NoteState = (props) => {
  const [token, setToken] = useState("");
  const [alert, Showalert] = useState("");
  useEffect(() => {
    if (alert !== "") {
      const timer = setTimeout(() => {
        Showalert("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", title: "", description: "", tag: "" });

  const [Notes2, setNotes] = useState(Notesinitial);


  // 🟡 Edit Note
  const Editnote = async (id, title, description, tag) => {
    //console.log("note Id to be edited is = ",id);
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ id,title, description, tag })
    });
    const json = await response.json();


    const updatedNotes = Notes2.map(note =>
      note._id === id ?{ ...note, title, description, tag }:note
    );
    setNotes(updatedNotes);
  };
  const handleclick = (e,title,description,tag) => {
    e.preventDefault();
    addnote(title, description, tag);
    //console.log("The title = ",title,"teh description to be Printed = ",description,"The tag To be Printed = ",tag)
    setNote({ title: "", description: "", tag: "" });
  }
  const handleclick2 = (note) => {
    refClose.current.click();
    setNote(note);
  }
  // 🟢 Add Note
  const addnote = async (title, description, tag) => {
    const url = `${host}/api/notes/AddNotes`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    //console.log("Added Note response:", json);


    const newNote = {
      "id":json,
      "title": title,
      "description": description,
      "tag": tag
    };

    setNotes(Notes2.concat(newNote));
  };

  const fetchnotes = async () => {
    const url = `${host}/api/notes/fetchnotes`;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    //console.log("Fetch Notes");
    setNotes(json);
  };

  return (
    <noteContext.Provider value={{ Notes2, addnote, Showalert, alert,  Editnote, setNotes, fetchnotes, note, setNote, handleclick, handleclick2, refClose, token, setToken }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

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


  const Deletenote = async (id) => {
    const url = `${host}/api/notes/deleteNote/${id}`;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ id })
    });
    const json = await response.json();
    console.log("Deleted response:", json);
    const newNotes = Notes2.filter(note => note._id !== id);
    setNotes(newNotes);

    Showalert("Deleted Note Successfully");
  };


  // 🟡 Edit Note
  const Editnote = async (id, title, description, tag) => {
    const url = `${host}/api/notes/updatenote/${id}`;
    console.log("The Edited Note to be is = " + id);
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();


    const updatedNotes = Notes2.map(note =>
      note._id === id ? { ...note, title, description, tag } : note
    );
    setNotes(updatedNotes);
  };
  const handleclick = (e) => {
    e.preventDefault();
    addnote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
  }
  const handleclick2 = (note) => {
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
        'authenticationtoken': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log("Add response:", json);


    const newNote = {
      "_id": json._id || Math.random().toString(36),
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
        'authenticationtoken': localStorage.getItem('token')
      }
    });
    const json = await response.json();

    setNotes(json);

  };

  return (
    <noteContext.Provider value={{ Notes2, addnote, Showalert, alert, Deletenote, Editnote, setNotes, fetchnotes, note, setNote, handleclick, handleclick2, refClose, token, setToken }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

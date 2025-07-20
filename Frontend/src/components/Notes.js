import react, { useContext, useEffect, useRef, useState } from 'react';
import nextContext from '../context/notes/noteContext';
import NoteItem from './NoteItem'
import Addnote from './Addnote';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
    let history = useNavigate();
    const Context = useContext(nextContext);
    const { Notes2, setNotes, fetchnotes, note, setNote, handleclick2, refClose, Editnote, Showalert, alert, token, setToken } = Context;

    useEffect(() => {
        if (token) {
            fetchnotes();
        }
        else {
            history("/");
        }
    }, [token])
    const ref = useRef(null);

    const updatenote = (currentnote) => {
        ref.current.click();
        setNote(currentnote);
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value });
    }
    return (<>
        <div className="container my-4">
            <Addnote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-toggle="modal" data-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <div className="form-group">
                                <label htmlFor="Title">Title</label>
                                <input type="text" className="form-control" id="title" aria-describedby="emailHelp" placeholder="title" name="title" onChange={onChange} value={note.title} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Description</label>
                                <input type="text" className="form-control" id="description" placeholder="description" name="description" onChange={onChange} value={note.description} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Tag</label>
                                <input type="text" className="form-control" id="tag" placeholder="tag" name="tag" onChange={onChange} value={note.tag} />
                            </div>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            ...
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" ref={refClose}>Close</button>
                            <button type="button" className="btn btn-primary" onClick={() => {
                                {
                                    handleclick2(note);
                                    Editnote(note.id?note.id:note._id, note.title, note.description, note.tag);
                                    Showalert("Updated Successfully");
                                }
                            }}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <h2>Your Notes</h2>
            <div className="row my-4">
                {Notes2.map((Notes2) => {
                    return <NoteItem note={Notes2}   updatenote={updatenote} />
                }) }
            </div>
        </div>
    </>
    )
}

export default Notes;
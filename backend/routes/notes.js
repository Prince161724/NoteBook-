const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Fetch all notes for logged-in user
router.get('/fetchnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

// Add a new note
router.post(
  '/AddNotes',
  fetchuser,
  [
    body('title', 'Enter a valid Title').exists(),
    body('description', 'There should be some description too').exists(),
  ],
  async (req, res) => {
    try {
      //console.log("fetchuser yaha hai= "+fetchuser);
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, description, tag } = req.body;

      const newNote = new Notes({
        title,
        description,
        tag,
        user: req.user
      });
      console.log("user = " + req.user);

      const savedNote = await newNote.save();
      res.json(savedNote.id);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// 🔹 Update an existing note
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
    // Find the note to update
    const note = await Notes.findById(req.params.id);
    console.log("note = " + req.params.id);

    console.log("note = " + note._id);
    if (!note) {
      return res.status(404).send("Note not found");
    }
    console.log("note = " + note.id);
    if (note._id.toString() !== req.params.id) {
      return res.status(401).send("Helped");
    }


    // Create new updated object
    const newNote = {};
    if (title) newNote.title = title;
    if (description) newNote.description = description;
    if (tag) newNote.tag = tag;
    res.json("Modified");

    // Update note
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// 🔹 Delete a note
router.delete('/deleteNote/:id', fetchuser, async (req, res) => {
  try {
    const note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Note not found");
    }

    // Allow delete only if user owns this note
    console.log("Going");
    if (note._id.toString() !== req.params.id) {
      return res.status(401).send("Not Authorized");
    }

    await Notes.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

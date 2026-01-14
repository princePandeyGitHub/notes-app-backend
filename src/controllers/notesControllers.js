import dayjs from 'dayjs';
import Notes from '../../models/Notes.js';

// controller to fetch notes
const fetchNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });

        if (!notes || notes.length === 0) {
            return res.status(404).json({
                message: "Notes not found.",
                status: 404
            })
        }

        res.json({
            message: "Showing all the notes.",
            notes: notes,
            status: 200,
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching notes",
            error: err.message 
        });
    }
}

// controller to fetch a specific note through id
const fetchNoteById = async (req, res) => {
    try {
        const note = await Notes.findOne({_id: req.params.id, user: req.user.id});

        if (!note) {
            return res.status(404).json({
                message: "Note not found",
                status: 404
            })
        }

        res.json({
            message: "Showing a specific note.",
            note: note,
            status: 200
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Error fetching note",
            error: err.message 
        });
    }
}

// controller to create note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const newNote = await Notes.create({
            title: title,
            content: content,
            user: req.user.id,
            createdAt: new Date()
        });

        res.json({
            message: "Note has been successfully created.",
            note: newNote,
            status: 200,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ 
            message: "Error creating note",
            error: err.message 
        });
    }
}

// controller to update notes
const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        const updatedNote = await Notes.findOneAndUpdate(
            {_id: req.params.id, user: req.user.id},
            {
                title: title,
                content: content
            },
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).json({
                message: "Note not found",
                status: 404,
            })
        }

        res.json({
            message: "Note Updated Successfully",
            note: updatedNote,
            status: 200,
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Error updating note",
            error: err.message 
        });
    }
}

// controller to delete a note
const deleteNote = async (req, res) => {
    try {

        const deletedNote = await Notes.findOneAndDelete({_id: req.params.id, user:req.user.id});

        if (!deletedNote) {
            return res.status(404).json({
                message: "Note not found",
                status: 404,
            })
        }

        res.json({
            message: "Note Deleted Successfully",
            note: deletedNote,
            status: 200
        })
    } catch (err) {
        res.status(500).json({ 
            message: "Error deleting note",
            error: err.message 
        });
    }
}

export { fetchNotes, createNote, fetchNoteById, updateNote, deleteNote }
import express from 'express';

// importing controllers
import { fetchNotes, createNote, fetchNoteById, updateNote, deleteNote } from '../controllers/notesControllers.js';

const router = express.Router();

router.get('/notes',fetchNotes);

router.get('/notes/:id',fetchNoteById);

router.post('/notes',createNote);

router.put('/notes/:id',updateNote);

router.delete('/notes/:id',deleteNote);


export default router;
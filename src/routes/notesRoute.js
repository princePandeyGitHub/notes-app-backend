import express from 'express';

// importing middlewares
import authMiddleware from '../middlewares/authMiddleware.js';

// importing controllers
import { fetchNotes, createNote, fetchNoteById, updateNote, deleteNote } from '../controllers/notesControllers.js';

const router = express.Router();

router.get('/notes', authMiddleware, fetchNotes);

router.get('/notes/:id', authMiddleware, fetchNoteById);

router.post('/notes', authMiddleware, createNote);

router.put('/notes/:id', authMiddleware, updateNote);

router.delete('/notes/:id', authMiddleware, deleteNote);


export default router;
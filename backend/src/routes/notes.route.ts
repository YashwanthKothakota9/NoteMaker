import express from 'express';
import * as NotesController from '../controllers/notes.controller';

const router = express.Router();

router.get('/', NotesController.getNotes);
router.get('/:noteId', NotesController.getNote);

router.post('/', NotesController.createNote);

router.patch('/:noteId', NotesController.updateNote);

router.delete('/:noteId', NotesController.deleteNote);

export default router;

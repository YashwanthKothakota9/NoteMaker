import { RequestHandler } from 'express';
import NoteModel from '../models/notes.model';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    const notes = await NoteModel.find();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;
  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }

    const note = await NoteModel.findById(noteId);
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

interface CreateNoteBody {
  title: string;
  text: string;
}

export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody,
  unknown
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  try {
    if (!title || !text) {
      throw createHttpError(400, 'Bad Request Title and text are required');
    }

    const newNote = await NoteModel.create({
      title,
      text,
    });

    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

interface UpdateNoteParams {
  noteId: string;
}

interface UpdateNoteBody {
  title: string;
  text: string;
}

export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }
    if (!newTitle || !newText) {
      throw createHttpError(400, 'Bad Request Title and text are required');
    }
    const note = await NoteModel.findById(noteId);
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }

    note.title = newTitle;
    note.text = newText;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId;

  try {
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, 'Invalid note id');
    }
    const note = await NoteModel.findById(noteId);
    if (!note) {
      throw createHttpError(404, 'Note not found');
    }
    await note.remove();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

import { Note as NoteModel } from '@/models/note';
import { Loader, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddNoteDialog from './add-note-dialog';
import NoteCard from './note-card';

import * as NotesApi from '@/network/notes_api';
import { useToast } from './ui/use-toast';

const NotesPageLoggedInView = () => {
  const [notesLoading, setNotesLoading] = useState(true);
  const [notesError, setNotesError] = useState<Error | null>(null);

  const { toast } = useToast();

  const [notes, setNotes] = useState<NoteModel[]>([]);

  const [updateNote, setUpdateNote] = useState<NoteModel | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      setNotesLoading(true);
      setNotesError(null);
      const data = await NotesApi.fetchNotes();
      setNotes(data);
    } catch (error) {
      setNotesError(error as Error);
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Failed to fetch notes',
      });
    } finally {
      setNotesLoading(false);
    }
  }

  async function deleteNote(note: NoteModel) {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes((prevNotes) => prevNotes.filter((n) => n._id !== note._id));
      toast({
        description: 'Note deleted successfully!!',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Failed to delete note',
      });
    }
  }

  function onUpdateNote(note: NoteModel) {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n._id === note._id ? note : n))
    );
  }

  const refetchNotes = () => {
    fetchNotes();
  };

  if (notesLoading) {
    return (
      <div className="flex items-center justify-center gap-2 border border-[#3f2009] bg-[#f9eb8f] p-4 m-2 rounded-md">
        <Loader className="w-4 h-4 text-[#3f2009] animate-spin" />
        <p className="text-[#3f2009]">Loading...</p>
      </div>
    );
  }

  if (notesError) {
    return (
      <div className="flex items-center justify-center gap-2 border border-red-400 bg-red-300 p-4 m-2 rounded-md">
        <XCircle className="w-4 h-4 text-red-500" />
        <p className="text-red-500">
          Something went wrong, please try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center mt-8 mb-8">
        <AddNoteDialog
          onSubmit={refetchNotes}
          updateNote={updateNote}
          onUpdateNote={onUpdateNote}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {notes.map((note) => (
          <NoteCard
            note={note}
            key={note._id}
            onDeleteNote={deleteNote}
            onUpdateNote={setUpdateNote}
          />
        ))}
      </div>
    </>
  );
};

export default NotesPageLoggedInView;

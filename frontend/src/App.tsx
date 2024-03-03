import { useEffect, useState } from 'react';
import { Note as NoteModel } from '@/models/note';
import NoteCard from '@/components/note-card';
import * as NotesApi from '@/network/notes_api';
import AddNoteDialog from './components/add-note-dialog';
import { toast } from './components/ui/use-toast';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [updateNote, setUpdateNote] = useState<NoteModel | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const data = await NotesApi.fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        description: 'Failed to fetch notes',
      });
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

  // async function updateNote(noteId: string, note: NoteModel) {
  //   try {
  //     const newNote = await NotesApi.updateNote(noteId, note);
  //     setNotes((prevNotes) =>
  //       prevNotes.map((n) => (n._id === noteId ? newNote : n))
  //     );
  //     toast({
  //       description: 'Note updated successfully!!',
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     toast({
  //       variant: 'destructive',
  //       description: 'Failed to update note',
  //     });
  //   }
  // }

  function onUpdateNote(note: NoteModel) {
    setNotes((prevNotes) =>
      prevNotes.map((n) => (n._id === note._id ? note : n))
    );
  }

  const refetchNotes = () => {
    fetchNotes();
  };

  return (
    <main className="container">
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
    </main>
  );
}

export default App;

import { useEffect, useState } from 'react';
import { Note as NoteModel } from '@/models/note';
import NoteCard from '@/components/note-card';
import * as NotesApi from '@/network/notes_api';
import AddNoteDialog from './components/add-note-dialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const data = await NotesApi.fetchNotes();
      setNotes(data);
    } catch (error) {
      console.error(error);
      alert('Error fetching notes');
    }
  }

  const refetchNotes = () => {
    fetchNotes();
  };

  return (
    <main className="container">
      <div className="flex items-center justify-center mt-8 mb-8">
        <AddNoteDialog onSubmit={refetchNotes} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {notes.map((note) => (
          <NoteCard note={note} key={note._id} />
        ))}
      </div>
    </main>
  );
}

export default App;

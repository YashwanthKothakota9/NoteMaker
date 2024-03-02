import { useEffect, useState } from 'react';
import { Note as NoteModel } from '@/models/note';
import NoteCard from '@/components/note-card';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error(error);
        alert('Error fetching notes');
      }
    }
    fetchNotes();
  }, []);

  return (
    <main className="container">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-8">
        {notes.map((note) => (
          <NoteCard note={note} key={note._id} />
        ))}
      </div>
    </main>
  );
}

export default App;

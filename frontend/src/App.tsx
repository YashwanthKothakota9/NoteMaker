import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Note } from '@/models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
    <div>
      <h1 className="text-5xl">React App</h1>
      <Button>Click me</Button>
      {JSON.stringify(notes)}
    </div>
  );
}

export default App;

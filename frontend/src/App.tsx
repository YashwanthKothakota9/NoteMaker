import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Note } from '@/models/note';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  return (
    <div>
      <h1 className="text-5xl">React App</h1>
      <Button>Click me</Button>
    </div>
  );
}

export default App;

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NoteForm } from './note-form';
import { useEffect, useState } from 'react';
import { Note as NoteModel } from '@/models/note';

interface AddNoteDialogProps {
  onSubmit: () => void;
  updateNote: NoteModel | null;
  onUpdateNote: (note: NoteModel) => void;
}

const AddNoteDialog = ({
  onSubmit,
  updateNote,
  onUpdateNote,
}: AddNoteDialogProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (updateNote) {
      setDialogOpen(true);
    }
  }, [updateNote]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-[#3f2009] text-[#f9eb8f] hover:bg-[#804c13] hover:text-[#fbf7c6]"
        >
          Add Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-[#fbf7c6] text-[#3f2009]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
          <DialogDescription className="text-[#804c13]">
            Add your personal note here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <NoteForm
            closeForm={setDialogOpen}
            onFormSubmit={onSubmit}
            updateNote={updateNote}
            onUpdateNote={onUpdateNote}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNoteDialog;

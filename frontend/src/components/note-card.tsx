import { Note as NoteModel } from '@/models/note';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { formatDate } from '@/lib/utils';
import { Pencil, Trash2 } from 'lucide-react';

interface NoteCardProps {
  note: NoteModel;
  onDeleteNote: (note: NoteModel) => void;
  onUpdateNote: (note: NoteModel) => void;
}

const NoteCard = ({ note, onDeleteNote, onUpdateNote }: NoteCardProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated at: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created at: ' + formatDate(createdAt);
  }

  return (
    <Card className="flex flex-col bg-[#f9eb8f] text-[#3f2009] border-l-[#c1860d] border-l-8">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{title}</CardTitle>
        <div className="flex flex-row gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Pencil
                  className="w-4 h-4 cursor-pointer text-[#3f2009] hover:text-[#804c13]"
                  onClick={() => onUpdateNote(note)}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#3f2009]">
                <p className="text-[#f9eb8f]">Edit Note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Trash2
                  className="w-4 h-4 text-red-700 cursor-pointer hover:text-red-500"
                  onClick={() => onDeleteNote(note)}
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#3f2009]">
                <p className="text-[#f9eb8f]">Delete Note</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div>
          <p className="whitespace-pre text-wrap">{text}</p>
        </div>
      </CardContent>
      <CardFooter className="px-6 py-2 flex items-center border-t-2 border-t-[#c1860d]">
        <p className="align-baseline text-[#6d3e16] text-sm">
          {createdUpdatedText}
        </p>
      </CardFooter>
    </Card>
  );
};

export default NoteCard;

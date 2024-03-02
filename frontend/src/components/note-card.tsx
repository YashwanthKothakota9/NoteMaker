import { Note as NoteModel } from '@/models/note';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatDate } from '@/lib/utils';

interface NoteCardProps {
  note: NoteModel;
}

const NoteCard = ({ note }: NoteCardProps) => {
  const { title, text, createdAt, updatedAt } = note;

  let createdUpdatedText: string;
  if (updatedAt > createdAt) {
    createdUpdatedText = 'Updated at: ' + formatDate(updatedAt);
  } else {
    createdUpdatedText = 'Created at: ' + formatDate(createdAt);
  }

  return (
    <Card className="flex flex-col bg-[#f9eb8f] text-[#3f2009] border-l-[#c1860d] border-l-8">
      <CardHeader className="flex justify-between">
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <div>
          <p className="whitespace-pre">{text}</p>
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

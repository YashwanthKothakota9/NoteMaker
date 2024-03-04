import NotesPageLoggedInView from '@/components/notes-page-logged-in-view';
import NotesPageLoggedOutView from '@/components/notes-page-logged-out-view';
import { User } from '@/models/user';

interface NotesPageProps {
  loggedInUser: User | null;
}

const NotesPage = ({ loggedInUser }: NotesPageProps) => {
  return (
    <main className="container">
      {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
    </main>
  );
};

export default NotesPage;

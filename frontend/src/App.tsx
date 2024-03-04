import { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import { User } from './models/user';
import * as NotesApi from '@/network/notes_api';
import NotesPageLoggedInView from './components/notes-page-logged-in-view';
import NotesPageLoggedOutView from './components/notes-page-logged-out-view';

function App() {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await NotesApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoggedInUser();
  }, []);

  return (
    <>
      <NavBar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <main className="container">
        {loggedInUser ? <NotesPageLoggedInView /> : <NotesPageLoggedOutView />}
      </main>
    </>
  );
}

export default App;

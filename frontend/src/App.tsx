import * as NotesApi from '@/network/notes_api';
import { useEffect, useState } from 'react';
import NavBar from './components/navbar';
import { User } from './models/user';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotesPage from './pages/notes-page';
import PageNotFound from './pages/page-not-found';

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
    <BrowserRouter>
      <NavBar
        loggedInUser={loggedInUser}
        setLoggedInUser={setLoggedInUser}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />
      <main className="container">
        <Routes>
          <Route path="/" element={<NotesPage loggedInUser={loggedInUser} />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;

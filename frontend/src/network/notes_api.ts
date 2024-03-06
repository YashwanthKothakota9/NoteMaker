import { ConflictError, UnauthorizedError } from '@/errors/http-errors';
import { Note } from '@/models/note';
import { User } from '@/models/user';

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    // const errorBody = await response.json();
    // const errorMessage = errorBody.error;
    if (response.status === 401) {
      throw new UnauthorizedError();
    } else if (response.status === 409) {
      throw new ConflictError();
    } else {
      throw Error('Request failed with status: ' + response.status);
    }
  }
}

export async function getLoggedInUser(): Promise<User> {
  const response = await fetchData(
    'https://notemaker-92dr.onrender.com/api/users',
    { method: 'GET' }
  );
  return response.json();
}

export interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
}

export async function signUp(credentials: SignUpCredentials): Promise<User> {
  const response = await fetchData(
    'https://notemaker-92dr.onrender.com/api/users/signup',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export async function logIn(credentials: LoginCredentials): Promise<User> {
  const response = await fetchData(
    'https://notemaker-92dr.onrender.com/api/users/login',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    }
  );
  return response.json();
}

export async function logOut() {
  await fetchData('https://notemaker-92dr.onrender.com/api/users/logout', {
    method: 'POST',
  });
}

export async function fetchNotes(): Promise<Note[]> {
  const response = await fetchData(
    'https://notemaker-92dr.onrender.com/api/notes',
    {
      method: 'GET',
    }
  );
  return response.json();
}

export interface NoteInput {
  title: string;
  text: string;
}

export async function createNote(note: NoteInput): Promise<Note> {
  const response = await fetchData(
    'https://notemaker-92dr.onrender.com/api/notes',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    }
  );

  return response.json();
}

export async function updateNote(
  noteId: string,
  note: NoteInput
): Promise<Note> {
  const response = await fetchData(
    `https://notemaker-92dr.onrender.com/api/notes/${noteId}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(note),
    }
  );
  return response.json();
}

export async function deleteNote(noteId: string): Promise<void> {
  await fetchData(`https://notemaker-92dr.onrender.com/api/notes/${noteId}`, {
    method: 'DELETE',
  });
}

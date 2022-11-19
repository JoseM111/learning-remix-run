// NotesList.tsx
import { Link } from '@remix-run/react';
import type { ReactElement } from 'react';
import type { NotesListType, NotesType } from '~/types/types';
import NotesListStyles from './NotesListStyles.css';

// links function for NotesListStyles
export const links = () => [{ rel: 'stylesheet', href: NotesListStyles }];
// =========================================================

function NotesList({ notes }: NotesListType): ReactElement {
  return (
    <ul id="note-list">
      {notes.map((note: NotesType, index: number) => (
        <li key={note.id} className="note">
          {/*
              this will take the note to the dynamic route of $notesId.
              which will then render the note in its own page, once the
              note card is clicked. the to={notes.note.id} is appended a
              /note.id as a dynamic segment. this feature is not only
              available for dynamic routes but instead all routes. which
              will then render the card pressed by its unique id
          */}
          <Link to={note.id}>
            <article>
              <header>
                <ul className="note-meta">
                  <li>#{index + 1}</li>
                  <li>
                    <time dateTime={note.id}>
                      {new Date(note.id).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </time>
                  </li>
                </ul>
                <h2>{note.title}</h2>
              </header>
              <p>{note.content}</p>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
// ########################################################

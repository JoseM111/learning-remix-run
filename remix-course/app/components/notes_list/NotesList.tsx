// NotesList.tsx
import type { ReactElement } from 'react';
import type { NotesListType, NotesType } from '~/types/types';
import NotesListStyles from './NotesListStyles.css';

function NotesList({ notes }: NotesListType): ReactElement {
  return (
    <ul id="note-list">
      {notes.map((note: NotesType, index: number) => (
        <li key={note.id} className="note">
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
        </li>
      ))}
    </ul>
  );
}

export default NotesList;
// ########################################################

// links function for NotesListStyles
export function links() {
  return [{ rel: 'stylesheet', href: NotesListStyles }];
}

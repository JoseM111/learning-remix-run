// NewNotes.tsx
import newNotesStyles from 'app/components/new_notes/NewNotesStyles.css';
import type { ReactElement } from "react"

function NewNotes(): ReactElement {
  return (
    // side-note: `method` is a default HTML attribute for the <form> element
    // this behavior is the browser default in the past via `event.preventDefault()`.
    // by default, upon submitting the form, the browser will send an HTTP request to the server
    // this component by default will send the post request to the route `/notes` since it is
    // being used in the notes.tsx file/page
    <form method="post" id="note-form">
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button>Add Note</button>
      </div>
    </form>
  );
}

export default NewNotes;

export function links() {
  return [{ rel: 'stylesheet', href: newNotesStyles }];
}

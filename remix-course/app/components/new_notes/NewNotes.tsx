// NewNotes.tsx
import { Form, useActionData, useTransition as useNavigation } from '@remix-run/react';
import newNotesStyles from 'app/components/new_notes/NewNotesStyles.css';
import type { ReactElement } from 'react';

function NewNotes(): ReactElement {
  const navigation = useNavigation();
  const isSubmitting: boolean = navigation.state === 'submitting';
  const buttonLabelState: string = isSubmitting ? 'Adding...' : 'Add Note';
  // Returns the JSON parsed data from the current route's action data
  const actionNotesData = useActionData();

  const actionDataStyles = {
    fontSize: '2rem',
    color: 'dodgerblue',
    fontFamily: 'agave Nerd Font Mono',
  };

  const isTitleToShort = actionNotesData?.message && <p style={actionDataStyles}>{actionNotesData.message}</p>;

  return (
    // side-note: `method` is a default HTML attribute for the <form> element
    // this behavior is the browser default in the past via `event.preventDefault()`.
    // by default, upon submitting the form, the browser will send an HTTP request to the server
    // this component by default will send the post request to the route `/notes` since it is
    // being used in the notes.tsx file/page
    <Form method="post" id="note-form">
      {/*If the title is at least 5 characters long, the
       note will be added to the list, but if not than the
       `actionNotesData.message` will render in the notes page*/}
      {isTitleToShort}
      <p>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" required />
      </p>
      <p>
        <label htmlFor="content">Content</label>
        <textarea id="content" name="content" rows={5} required />
      </p>
      <div className="form-actions">
        <button disabled={isSubmitting}>{buttonLabelState}</button>
      </div>
    </Form>
  );
}

export default NewNotes;

export function links() {
  return [{ rel: 'stylesheet', href: newNotesStyles }];
}

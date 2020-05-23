import React from "react";
import axios from "axios";
import styles from '../pages/writingpad.module.css'

const Note = ({ note, reloadNotes }) => {
  const handleDelete = () => {
    axios.post('/.netlify/functions/delete-note', { id: note._id}).then(reloadNotes);
  }

  return (
    <> 
      <p>{note.text}</p>
      <button onClick={handleDelete}>Delete</button>
   </>
  )
};

export default Note;
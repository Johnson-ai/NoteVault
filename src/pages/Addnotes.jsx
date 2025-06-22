import { useState } from 'react';

const AddNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleAddNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add token if you're using authentication (optional)
          // 'Authorization': `Bearer ${yourToken}`
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();
      console.log(data);
      alert('Note added successfully');
      setTitle('');
      setContent('');
    } catch (err) {
      console.error('Failed to add note:', err);
      alert('Error adding note');
    }
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form onSubmit={handleAddNote}>
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
};

export default AddNote;

import React, { useEffect, useState } from "react";
import axios from "axios";

const NotesManager = ({ token }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [error, setError] = useState("");

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5050/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(res.data);
      setLoading(false);
    } catch {
      setError("Failed to load notes");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async () => {
    if (!newTitle.trim()) {
      setError("Note title is required");
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:5050/api/notes",
        { title: newTitle, content: newContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes([res.data, ...notes]);
      setNewTitle("");
      setNewContent("");
      setError("");
    } catch {
      setError("Failed to add note");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setError("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setError("");
  };

  const saveEdit = async () => {
    if (!editTitle.trim()) {
      setError("Note title is required");
      return;
    }
    try {
      const res = await axios.put(
        `http://localhost:5050/api/notes/${editingId}`,
        { title: editTitle, content: editContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(notes.map((n) => (n._id === editingId ? res.data : n)));
      setEditingId(null);
      setError("");
    } catch {
      setError("Failed to update note");
    }
  };

  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      await axios.delete(`http://localhost:5050/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(notes.filter((n) => n._id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  if (loading) return <div>Loading notes...</div>;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      {error && <div className="mb-4 text-red-600 font-semibold">{error}</div>}

      {/* Add New Note */}
      <div className="mb-6 p-4 border rounded shadow bg-purple-50">
        <input
          type="text"
          placeholder="New note title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <textarea
          placeholder="New note content (optional)"
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
          rows={3}
        />
        <button
          onClick={handleAddNote}
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <div className="space-y-4">
        {notes.length === 0 && (
          <p className="text-gray-600">No notes yet. Add your first note!</p>
        )}

        {notes.map((note) => (
          <div
            key={note._id}
            className="border p-4 rounded shadow bg-white flex flex-col"
          >
            {editingId === note._id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="mb-2 p-2 border rounded"
                />
                <textarea
                  rows={4}
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="mb-2 p-2 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={saveEdit}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold mb-1">{note.title}</h3>
                <p className="whitespace-pre-wrap mb-3">{note.content}</p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => startEdit(note)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteNote(note._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesManager;

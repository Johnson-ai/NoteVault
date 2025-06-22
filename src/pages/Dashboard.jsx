import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [notes, setNotes] = useState([]);
  const [notesLoading, setNotesLoading] = useState(false);
  const [quickNote, setQuickNote] = useState("");
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNoteContent, setEditNoteContent] = useState("");
  const navigate = useNavigate();
  const fileInputRef = useRef();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    // Fetch user data
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5050/api/auth/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(res.data);
        setLoading(false);
      } catch (err) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    // Fetch user notes
    const fetchNotes = async () => {
      setNotesLoading(true);
      try {
        const res = await axios.get("http://localhost:5050/api/notes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setNotes(res.data);
      } catch (err) {
        setError("Failed to load notes");
      } finally {
        setNotesLoading(false);
      }
    };

    fetchUser();
    fetchNotes();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    setError("");
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const res = await axios.post(
        "http://localhost:5050/api/upload/profile-picture",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUserData((prev) => ({
        ...prev,
        profilePicture: res.data.profilePicture,
      }));
    } catch {
      setError("Failed to upload profile picture");
    } finally {
      setUploading(false);
    }
  };

  // Notes CRUD handlers

  const handleQuickAddChange = (e) => {
    setQuickNote(e.target.value);
  };

  const handleQuickAddSubmit = async () => {
    if (!quickNote.trim()) return;
    setError("");
    try {
      const res = await axios.post(
        "http://localhost:5050/api/notes",
        { content: quickNote },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) => [res.data, ...prev]);
      setQuickNote("");
    } catch {
      setError("Failed to add note");
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5050/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch {
      setError("Failed to delete note");
    }
  };

  const startEditNote = (note) => {
    setEditNoteId(note._id);
    setEditNoteContent(note.content);
  };

  const cancelEditNote = () => {
    setEditNoteId(null);
    setEditNoteContent("");
  };

  const saveEditNote = async () => {
    if (!editNoteContent.trim()) return;
    try {
      const res = await axios.put(
        `http://localhost:5050/api/notes/${editNoteId}`,
        { content: editNoteContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) =>
        prev.map((note) =>
          note._id === editNoteId ? { ...note, content: res.data.content } : note
        )
      );
      cancelEditNote();
    } catch {
      setError("Failed to update note");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-xl font-semibold">
        Loading your dashboard...
      </div>
    );
  }

  const defaultAvatar =
    "https://cdn-icons-png.flaticon.com/512/149/149071.png";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-red-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <header className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-6">
            <div className="relative">
              <img
                src={
                  userData.profilePicture
                    ? `http://localhost:5050${userData.profilePicture}`
                    : defaultAvatar
                }
                alt="Profile"
                className={`w-16 h-16 rounded-full object-cover border-2 border-purple-600 cursor-pointer ${
                  uploading ? "opacity-50" : "opacity-100"
                }`}
                onClick={() => fileInputRef.current.click()}
                title="Click to change profile picture"
              />
              {uploading && (
                <div className="absolute inset-0 bg-purple-600 bg-opacity-60 flex items-center justify-center rounded-full text-white font-bold">
                  Uploading...
                </div>
              )}
            </div>
            <h1 className="text-4xl font-extrabold text-purple-700">
              Welcome, {userData.username || userData.email}
            </h1>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md font-semibold transition duration-300"
          >
            Logout
          </button>
        </header>

        {error && (
          <div className="mb-4 text-red-600 font-semibold">{error}</div>
        )}

        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        <section className="grid gap-8 md:grid-cols-3 mb-12">
          {/* Notes Section */}
          <div className="bg-purple-50 border border-purple-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-purple-800 flex items-center gap-2">
              📒 Your Notes
            </h2>

            {notesLoading ? (
              <p className="text-purple-600">Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-purple-600">No notes yet.</p>
            ) : (
              <ul className="max-h-64 overflow-auto space-y-3">
                {notes.map((note) => (
                  <li
                    key={note._id}
                    className="bg-white p-3 rounded shadow-sm flex justify-between items-start"
                  >
                    {editNoteId === note._id ? (
                      <textarea
                        className="w-full border border-purple-400 rounded p-2 resize-none"
                        rows={3}
                        value={editNoteContent}
                        onChange={(e) => setEditNoteContent(e.target.value)}
                      />
                    ) : (
                      <p className="whitespace-pre-wrap">{note.content}</p>
                    )}

                    <div className="flex flex-col ml-4 space-y-2">
                      {editNoteId === note._id ? (
                        <>
                          <button
                            onClick={saveEditNote}
                            className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={cancelEditNote}
                            className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-500 transition"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => startEditNote(note)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteNote(note._id)}
                            className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quick Add Note */}
          <div className="bg-pink-50 border border-pink-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-pink-700 flex items-center gap-2">
              ➕ Quick Add
            </h2>
            <textarea
              className="w-full border border-pink-400 rounded p-2 mb-3 resize-none"
              rows={4}
              placeholder="Write a quick note..."
              value={quickNote}
              onChange={handleQuickAddChange}
            />
            <button
              onClick={handleQuickAddSubmit}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded font-semibold transition"
            >
              Add Note
            </button>
          </div>

          {/* Settings */}
          <div className="bg-red-50 border border-red-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-bold mb-4 text-red-700 flex items-center gap-2">
              ⚙️ Settings
            </h2>
            <p className="text-red-600">
              Manage your profile, change password, and configure preferences.
            </p>
            {/* You can expand this section with actual settings forms */}
          </div>
        </section>

        <section className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Stats Panel */}
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Your Stats</h3>
            <ul className="text-gray-600 list-disc list-inside">
              <li>
                Total Notes:{" "}
                <span className="font-semibold">{notes.length}</span>
              </li>
              <li>
                Last Login: <span className="font-semibold">Coming Soon</span>
              </li>
              <li>
                Account Created: <span className="font-semibold">Coming Soon</span>
              </li>
            </ul>
          </div>

          {/* Support Panel */}
          <div className="bg-white border rounded-lg p-6 shadow-md">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Need Help?</h3>
            <p className="text-gray-600 mb-4">
              Reach out if you face any issues or want new features.
            </p>
            <a
              href="mailto:support@notevault.com"
              className="inline-block bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              Contact Support
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

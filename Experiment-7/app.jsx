function loadNotes() {
    try {
        const savedNotes = localStorage.getItem("notes");
        return savedNotes ? JSON.parse(savedNotes) : [];
    } catch (error) {
        console.error("Could not load notes.", error);
        return [];
    }
}

function App() {
    const [notes, setNotes] = React.useState(loadNotes);
    const [title, setTitle] = React.useState("");
    const [content, setContent] = React.useState("");
    const [editingId, setEditingId] = React.useState(null);

    React.useEffect(() => {
        try {
            localStorage.setItem("notes", JSON.stringify(notes));
        } catch (error) {
            console.error("Could not save notes.", error);
        }
    }, [notes]);

    function handleSubmit(event) {
        event.preventDefault();

        if (editingId === null) {
            const newNote = {
                id: Date.now(),
                title: title.trim(),
                content: content.trim(),
            };
            setNotes([newNote, ...notes]);
        } else {
            const updatedNotes = notes.map((note) => {
                if (note.id === editingId) {
                    return { ...note, title: title.trim(), content: content.trim() };
                }
                return note;
            });
            setNotes(updatedNotes);
        }

        setTitle("");
        setContent("");
        setEditingId(null);
    }

    function handleEdit(note) {
        setTitle(note.title);
        setContent(note.content);
        setEditingId(note.id);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function handleDelete(id) {
        const shouldDelete = window.confirm("Delete this note?");
        if (!shouldDelete) return;

        const remainingNotes = notes.filter((note) => note.id !== id);
        setNotes(remainingNotes);

        if (editingId === id) {
            setTitle("");
            setContent("");
            setEditingId(null);
        }
    }

    function handleCancel() {
        setTitle("");
        setContent("");
        setEditingId(null);
    }

    return (
        <main className="container">
            <header className="page-header">
                <h1>My Notes</h1>
                <p>A simple place to keep your notes.</p>
            </header>

            <section className="note-form-section" aria-labelledby="form-heading">
                <h2 id="form-heading">{editingId === null ? "Add a note" : "Edit note"}</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="note-title">Title</label>
                    <input
                        id="note-title"
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />

                    <label htmlFor="note-content">Content</label>
                    <textarea
                        id="note-content"
                        placeholder="Write your note here"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        required
                    />

                    <div className="form-buttons">
                        <button className="primary-button" type="submit">
                            {editingId === null ? "Add Note" : "Update Note"}
                        </button>
                        {editingId !== null && (
                            <button className="cancel-button" type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </section>

            <section className="notes-section" aria-labelledby="notes-heading">
                <h2 id="notes-heading">Your Notes</h2>
                {notes.length === 0 ? (
                    <p className="empty-message">No notes yet. Add one above.</p>
                ) : (
                    <div className="notes-list">
                        {notes.map((note) => (
                            <article className="note-card" key={note.id}>
                                <h3>{note.title}</h3>
                                <p>{note.content}</p>
                                <div className="note-buttons">
                                    <button className="edit-button" type="button" onClick={() => handleEdit(note)}>
                                        Edit
                                    </button>
                                    <button className="delete-button" type="button" onClick={() => handleDelete(note.id)}>
                                        Delete
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import { useState } from 'react';

export default function EntryForm({ onEntryCreated }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Happy');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      await onEntryCreated({ title, content, mood });
      setTitle('');
      setContent('');
      setMood('Happy');
    } catch (err) {
      console.error(err);
      alert('Error creating entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>New Journal Entry</h3>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        style={styles.input}
      />
      <textarea
        placeholder="What's on your mind today?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
        rows="4"
        style={styles.textarea}
      />
      <div style={styles.row}>
        <label>
          Mood:{' '}
          <select value={mood} onChange={(e) => setMood(e.target.value)} style={styles.select}>
            <option value="Happy">😊 Happy</option>
            <option value="Reflective">🤔 Reflective</option>
            <option value="Calm">😌 Calm</option>
            <option value="Productive">⚡ Productive</option>
            <option value="Sad">😢 Sad</option>
          </select>
        </label>
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Saving...' : 'Add Entry'}
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    background: '#ffffff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    marginBottom: '2rem',
  },
  input: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '0.6rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  select: {
    padding: '0.4rem',
    borderRadius: '4px',
    marginLeft: '0.5rem',
  },
  button: {
    padding: '0.6rem 1.2rem',
    background: '#0070f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};
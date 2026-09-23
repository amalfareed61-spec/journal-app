import { useEffect, useState } from 'react';
import { fetchEntries, createEntry, deleteEntry } from './api';
import EntryForm from './components/EntryForm';
import EntryList from './components/EntryList';

export default function App() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadEntries = async () => {
    try {
      const data = await fetchEntries();
      setEntries(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  const handleCreateEntry = async (entryData) => {
    const newEntry = await createEntry(entryData);
    setEntries((prev) => [newEntry, ...prev]);
  };

  const handleDeleteEntry = async (id) => {
    await deleteEntry(id);
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Personal Journal</h1>
      </header>
      <main>
        <EntryForm onEntryCreated={handleCreateEntry} />
        {loading ? <p style={{ textAlign: 'center' }}>Loading entries...</p> : <EntryList entries={entries} onDelete={handleDeleteEntry} />}
      </main>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '650px',
    margin: '0 auto',
    padding: '2rem 1rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
};
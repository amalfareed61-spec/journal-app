export default function EntryList({ entries, onDelete }) {
  if (entries.length === 0) {
    return <p style={{ textAlign: 'center', color: '#666' }}>No journal entries yet. Add your first one above!</p>;
  }

  return (
    <div style={styles.list}>
      {entries.map((entry) => (
        <div key={entry.id} style={styles.card}>
          <div style={styles.cardHeader}>
            <h4>{entry.title}</h4>
            <span style={styles.badge}>{entry.mood}</span>
          </div>
          <p style={styles.content}>{entry.content}</p>
          <div style={styles.cardFooter}>
            <small style={{ color: '#888' }}>
              {new Date(entry.created_at).toLocaleString()}
            </small>
            <button onClick={() => onDelete(entry.id)} style={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  card: {
    background: '#ffffff',
    padding: '1.2rem',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem',
  },
  badge: {
    background: '#e0f2fe',
    color: '#0369a1',
    padding: '0.2rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
  },
  content: {
    color: '#333',
    lineHeight: '1.5',
    whiteSpace: 'pre-wrap',
  },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '1rem',
    borderTop: '1px solid #f0f0f0',
    paddingTop: '0.5rem',
  },
  deleteBtn: {
    background: '#ef4444',
    color: '#fff',
    border: 'none',
    padding: '0.3rem 0.7rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.8rem',
  },
};
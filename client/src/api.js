const API_URL = 'http://localhost:5000/api/entries';

export const fetchEntries = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch entries');
  return res.json();
};

export const createEntry = async (entryData) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entryData),
  });
  if (!res.ok) throw new Error('Failed to create entry');
  return res.json();
};

export const deleteEntry = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete entry');
  return res.json();
};
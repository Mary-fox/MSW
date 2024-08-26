// App.tsx
import React, { useEffect, useState } from 'react';

const App: React.FC = () => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [name, setName] = useState('');

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  
  const handleAddUser = () => {
    fetch('/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    })
      .then((res) => res.json())
      .then((newUser) => setUsers((prev) => [...prev, newUser]));
  };

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={handleAddUser}>Add User</button>
    </div>
  );
};

export default App;

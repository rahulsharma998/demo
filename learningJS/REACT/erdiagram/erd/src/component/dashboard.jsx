import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';

function Dashboard() {
  const [user, setUser] = useState(null);
  const [diagrams, setDiagrams] = useState([]);
  const [folders, setFolders] = useState(['All']);
  const [sortParam, setSortParam] = useState('creationDate');
  const [selectedFolder, setSelectedFolder] = useState('All');

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      fetchDiagrams();
    } else {
      navigate('/login');
    }
    const storedFolders = JSON.parse(localStorage.getItem('folders')) || ['All'];
    setFolders(storedFolders);
  }, [navigate]);

  const fetchDiagrams = () => {
    const storedDiagrams = JSON.parse(localStorage.getItem('diagrams')) || [];
    setDiagrams(storedDiagrams);
  };

  const handleNewDiagram = () => {
    const newDiagram = {
      id: Date.now().toString(), 
      name: 'Untitled Diagram',
      folder: selectedFolder,
      creationDate: new Date().toISOString(),
      userId: user.id,
    };

    const updatedDiagrams = [...diagrams, newDiagram];
    setDiagrams(updatedDiagrams);
    localStorage.setItem('diagrams', JSON.stringify(updatedDiagrams));
    navigate(`/editor/${newDiagram.id}`);
  };

  const handleOpenDiagram = (id) => {
    navigate(`/editor/${id}`);
  };

  const handleDeleteDiagram = (id) => {
    const updatedDiagrams = diagrams.filter(diagram => diagram.id !== id);
    setDiagrams(updatedDiagrams);
    localStorage.setItem('diagrams', JSON.stringify(updatedDiagrams));
  };

  const handleNewFolder = () => {
    const folderName = prompt('Enter new folder name:');
    if (folderName && !folders.includes(folderName)) {
      const updatedFolders = [...folders, folderName];
      setFolders(updatedFolders);
      localStorage.setItem('folders', JSON.stringify(updatedFolders));
    }
  };

  const handleSortChange = (e) => {
    setSortParam(e.target.value);
  };

  const handleFolderChange = (e) => {
    setSelectedFolder(e.target.value);
  };

  const filteredDiagrams = diagrams.filter(diagram =>
    selectedFolder === 'All' || diagram.folder === selectedFolder
  );

  const sortedDiagrams = filteredDiagrams.sort((a, b) => {
    if (sortParam === 'creationDate') return new Date(b.creationDate) - new Date(a.creationDate);
    if (sortParam === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  return (
    <div className="dashboard">
      {user && <h2>Welcome, {user.displayName || user.email}!</h2>}

      <button onClick={handleNewDiagram} className="dashboard-button">New Diagram</button>
      <button onClick={handleNewFolder} className="dashboard-button">New Folder</button>

      <div className="filters">
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select id="sort" value={sortParam} onChange={handleSortChange}>
            <option value="creationDate">Creation Date</option>
            <option value="name">Name</option>
          </select>
        </div>
        <div>
          <label htmlFor="folder">Filter by Folder:</label>
          <select id="folder" value={selectedFolder} onChange={handleFolderChange}>
            {folders.map(folder => (
              <option key={folder} value={folder}>{folder}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="diagram-grid">
        {sortedDiagrams.map(diagram => (
          <div key={diagram.id} className="diagram-card">
            <h3>{diagram.name}</h3>
            <p>Folder: {diagram.folder}</p>
            <p>Created on: {new Date(diagram.creationDate).toLocaleString()}</p>
            <button onClick={() => handleOpenDiagram(diagram.id)} className="dashboard-button">Edit</button>
            <button onClick={() => handleDeleteDiagram(diagram.id)} className="dashboard-button delete-button">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

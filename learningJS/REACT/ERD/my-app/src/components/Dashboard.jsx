import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/dashboard.css';

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
    //   navigate('/login');
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
      <div className="sidebar">
        <div className="user-profile">
          {user && <h3>{user.displayName || user.email}</h3>}
        </div>

        <button onClick={handleNewFolder} className="button new-folder-btn">New Folder</button>
        <div className="folders-list">
          {folders.map((folder, index) => (
            <button key={index} onClick={() => setSelectedFolder(folder)} className="folder-btn">
              {folder}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button onClick={handleNewDiagram} className="button new-diagram-btn">New Diagram</button>

          <div className="filters">
            <select value={sortParam} onChange={handleSortChange} className="select">
              <option value="creationDate">Sort by Date</option>
              <option value="name">Sort by Name</option>
            </select>
            <select value={selectedFolder} onChange={handleFolderChange} className="select">
              {folders.map((folder) => (
                <option key={folder} value={folder}>{folder}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="diagram-grid">
          {sortedDiagrams.map((diagram) => (
            <div key={diagram.id} className="diagram-card">
              <h3>{diagram.name}</h3>
              <p>Created on: {new Date(diagram.creationDate).toLocaleDateString()}</p>
              <button onClick={() => handleOpenDiagram(diagram.id)} className="button">Edit</button>
              <button onClick={() => handleDeleteDiagram(diagram.id)} className="button delete-btn">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

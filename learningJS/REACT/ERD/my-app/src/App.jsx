import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/editor/:id" element={<h2>Editor Placeholder</h2>} /> {/* Placeholder for editor */}
        <Route path="/editor/new" element={<h2>Editor for New Diagram</h2>} /> {/* Placeholder for new diagram */}
      </Routes>
    </Router>
  );
}

export default App;

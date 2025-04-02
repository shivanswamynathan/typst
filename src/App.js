// src/App.js
import React, { useState } from 'react';
import TypstCanvasRenderer from './components/TypstCanvasRenderer';
import TypstEditor from './components/TypstEditor';
import './styles.css';

function App() {
  const [typstCode, setTypstCode] = useState('#set page(width: 400pt, height: 200pt, margin: 10pt)\n\n= Hello, Typst!\n\nThis is a *simple* document rendered directly to canvas.\n\n#text(red)[You can edit this text] and see the changes in real-time.');

  return (
    <div className="app">
      <header className="app-header">
        <h1>Typst Canvas Renderer</h1>
      </header>
      
      <main className="app-content">
        <div className="editor-section">
          <h2>Typst Editor</h2>
          <TypstEditor value={typstCode} onChange={setTypstCode} />
        </div>
        
        <div className="renderer-section">
          <h2>Canvas Preview</h2>
          <TypstCanvasRenderer typstContent={typstCode} />
        </div>
      </main>
    </div>
  );
}

export default App;
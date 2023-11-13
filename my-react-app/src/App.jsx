// App.jsx
import React, { useState } from 'react';
import Reflect from './Reflect';
import ChapterChat from './ChapterChat';
import Nbar from './Nbar';
import './App.css';

function App() {
  const [currentRoute, setCurrentRoute] = useState('home');

  return (
    <div id="app">
      <Nbar setCurrentRoute={setCurrentRoute} />

      {currentRoute === 'reflect' && <Reflect />}
      {currentRoute === 'chapter-chat' && <ChapterChat />}
      {currentRoute === 'home' && (
        <div>
          <h1>Home Page</h1>
          
        </div>
      )}
    </div>
  );
}

export default App;

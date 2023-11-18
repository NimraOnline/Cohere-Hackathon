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
          <h1>  </h1>
          <div id='container'>
            <div id='userinput'>
            <h2> Welcome! </h2>
            Explore the Tadabur tab to delve deeper into the profound meanings of the verses. Enhanced with insights from Ibn Kathir Tafsir and RAG, enrich your understanding of the sacred text.            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;

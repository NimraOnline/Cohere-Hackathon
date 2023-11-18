// App.jsx
import React, { useState } from 'react';
import Reflect from './Reflect';
import ChapterChat from './ChapterChat';
import Nbar from './Nbar';
import './App.css';
import myImage from './style/Schema.png'

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
            <h2> How it works </h2>
            <h5>Click on the Tadabor Tab to begin!</h5>
            <img src={myImage} alt="Schema" className="image-container" />
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default App;

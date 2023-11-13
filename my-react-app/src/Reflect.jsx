// Reflect.jsx
import React, { useState } from 'react';
import happy from './style/emojis/happy.png';
import neutral from './style/emojis/neutral.png';
import confused from './style/emojis/confused.png';
import sad from './style/emojis/sad.png';
import stressed from './style/emojis/stressed.png';
import angry from './style/emojis/angry.png';

function Reflect() {
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [selectedObjective, setSelectedObjective] = useState('');
    const [spiritualBoosterVisible, setSpiritualBoosterVisible] = useState(false);

    const handleEmotionClick = (emotion) => {
        setSelectedEmotion(emotion);
    };

    const handleObjectiveInput = (event) => {
        setSelectedObjective(event.target.value);
    };

    const handleSpiritualBoosterClick = () => {
        setSpiritualBoosterVisible(!spiritualBoosterVisible);
        setSelectedEmotion('');

    };

  const handleSubmit = async () => {
    // Handle submission, send data to the backend, and get results
    // Update the state or perform any other necessary actions
  };

  return (
    <div className="main">
      <h1></h1>
      <div id='container'>
        <div id='userinput'>

            <div className='user-objective'>
                {/* Objective Selection */}
                <center>
                <h3 htmlFor="object">Enter any Topic of Interest</h3>
                </center>
                    <div className='input-container'>
                        <input type="text" value={selectedObjective} onChange={handleObjectiveInput} 
                        placeholder="Tadabor Topic"
                        />
                    </div>

            </div>
            <div className='submit-button'>
                {/* Submit Button */}
                <button id='submit-button' onClick={handleSubmit}>Discover Verses for Me</button>
            </div>
            
            <div>
            {spiritualBoosterVisible && (
                <div className='spiritual-booster-content'>
                    <center>I am feeling {selectedEmotion}</center>
                    <div>
                    {/* Emotion Selection */}
                        <div className="emoji-buttons">
                        <img src={happy} alt="Happy" 
                        className={selectedEmotion === 'Happy' ? 'selected' : ''}
                        onClick={() => handleEmotionClick('Happy')}
                        />
                        <img src={neutral} alt="Neutral"
                        className={selectedEmotion === 'Neutral' ? 'selected' : ''}
                        onClick={() => handleEmotionClick('Neutral')}
                        />
                        <img src={stressed} alt="Stressed"
                        className={selectedEmotion === 'Stressed' ? 'selected' : ''}
                        onClick={() => handleEmotionClick('Stressed')}
                        />
                        <img src={confused} alt="Confused"
                        className={selectedEmotion === 'Confused' ? 'selected' : ''}
                        onClick={() => handleEmotionClick('Confused')}
                        />
                        <img src={sad} alt="Sad"
                        className={selectedEmotion === 'Sad' ? 'selected' : ''}
                        onClick={() => handleEmotionClick('Sad')}
                        />
                        <img src={angry} alt="Angry"
                        className={selectedEmotion === 'Angry' ? 'selected' : ''}
                        onClick={() => handleEmotionClick('Angry')}
                        />
                        </div>
                    </div>
                </div>
              )}
            </div>
            <button
                id='spiritual-booster-button'
                onClick={handleSpiritualBoosterClick}
                className='booster-button'
              >
               <h3> {spiritualBoosterVisible ? '⛔ Remove' : '✨ Add'} Spiritual Booster</h3>
              </button>

        </div>
        {/* Display Results */}
        {/* You can render the results here based on the backend response */}
      </div>
    </div>
  );
}

export default Reflect;

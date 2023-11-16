// Reflect.jsx
import React, { useState } from 'react';
import happy from './style/emojis/happy.png';
import neutral from './style/emojis/neutral.png';
import confused from './style/emojis/confused.png';
import sad from './style/emojis/sad.png';
import stressed from './style/emojis/stressed.png';
import angry from './style/emojis/angry.png';
import LoadingAnimation from './loadingComponent.jsx';

function Reflect() {
  
    const [selectedEmotion, setSelectedEmotion] = useState('');
    const [selectedObjective, setSelectedObjective] = useState('');
    const [spiritualBoosterVisible, setSpiritualBoosterVisible] = useState(false);
    const [generated, setGenerated] = useState('');
    const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    try {
        // Prepare the data to be sent to the backend
        const data = {
          emotion: selectedEmotion,
          objective: selectedObjective,
        };
  
        // Using fetch to send data to the Flask backend
        const response = await fetch('http://127.0.0.1:5000/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const result = await response.json();
        setIsLoading(false);
        setGenerated(result.generated)
  
        // Update the state or perform any other necessary actions
      } catch (error) {
        console.error('Error:', error);
      }
    };

  return (
    <div className="main">
      <h1></h1>
      <div id='container'>
        <div id='userinput'>
          {isLoading ? (
          // Show loading animation when isLoading is true
          <LoadingAnimation />
          ) : (
          <div class='user-objective'>  
            {generated ? (
                // If a generated value exists, show it
                <div>
                  <p>{generated}</p>
                </div>
            ) : (
            <div id='userinput2'>
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
            )}
          </div>
          )}
        </div>

        {/* Display Results */}
        {/* You can render the results here based on the backend response */}
      </div>
    </div>
  );
}

export default Reflect;

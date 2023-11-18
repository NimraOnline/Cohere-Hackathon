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
    const [generated2, setGenerated2] = useState('');
    const [generated3, setGenerated3] = useState('');

    const [questions, setQuestions] = useState('');

    const [verse1, setVerse1] = useState('');
    const [verse2, setVerse2] = useState('');
    const [verse3, setVerse3] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [popupContent, setPopupContent] = useState('');

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
        const response = await fetch('https://tadabor-fb4f5dd9029a.herokuapp.com/submit', {
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

        setVerse1(result.metadata[0])
        setVerse2(result.metadata[1])
        setVerse3(result.metadata[2])

        setGenerated(result.generated[0])
        setGenerated2(result.generated[1])
        setGenerated3(result.generated[2])
  
        // Update the state or perform any other necessary actions
      } catch (error) {
        console.error('Error:', error);
      }
    };
  const handleReflect = async (metadata) => {
    setIsLoading(true);

    const response = await fetch('https://tadabor-fb4f5dd9029a.herokuapp.com/reflect', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(metadata),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    if (response.status=="200"){
      setPopupContent('');
      setPopupContent(questions);
    }

    const result = await response.json();
    setIsLoading(false);

    setQuestions(result.questions);

    setPopupContent(questions);

  };

  const handleButtonClick = (content) => {
      // Set the content for the popup based on the button clicked
      const firstKey = Object.keys(content)[0];
      const generatedContent = content[firstKey];

      setPopupContent(generatedContent);
    };

  const handleCloseButtonClick = () => {
      // Close the popup by resetting the content
      setPopupContent('');
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
                <div className='user-objective'>
                  <h2>{selectedObjective}</h2>
                  <div className='verses'>
                    <div className='verse'>
                      {/* Button for generated1 */}
                      <p id='arabic'>{verse1.Arabic}</p>

                      <div className='subverse'>
                        <p>{verse1.English}</p>
                      </div>

                      <h4>Quran {verse1.Citation}</h4>
                      <div className='buttons_div'>
                        <button id='generated' onClick={() => handleButtonClick({generated})}>Explain</button>
                        <button id='generated' onClick={() => handleReflect(verse1)}>Reflect on this!</button>
                      </div>
                    </div>
                    <div className='verse'>
                      {/* Button for generated2 */}
                      <p id='arabic'>{verse2.Arabic}</p>

                      <div className='subverse'>
                        <p>{verse2.English}</p>
                      </div>

                      <h4>Quran {verse2.Citation}</h4>
                      <div className='buttons_div'>
                        <button id='generated' onClick={() => handleButtonClick({generated2})}>Explain</button>
                        <button id='generated' onClick={() => handleReflect(verse2)}>Reflect on this!</button>
                      </div>
                    </div>
                    <div className='verse'>
                      {/* Button for generated3 */}
                      <p id='arabic'>{verse3.Arabic}</p>

                      <div className='subverse'>
                        <p>{verse3.English}</p>
                      </div>
                      <h4>Quran {verse3.Citation}</h4>
                      <div className='buttons_div'>
                        <button id='generated' onClick={() => handleButtonClick({generated3})}>Explain</button>
                        <button id='generated' onClick={() => handleReflect(verse3)}>Reflect on this!</button>
                      </div>
                    </div>
                {/* Popup */}
                {popupContent && (
                <div className="popup">
                  {/* Render the dynamic content for the popup */}
                  <p>{popupContent}</p>

                  {/* Close button */}
                  <button id='close' onClick={handleCloseButtonClick}>Close</button>
                </div>
                )}
                </div>
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

import React, { useEffect } from 'react';
import lottie from 'lottie-web';
import animationData from './style/lotties/Searching.json';

const LoadingAnimation = () => {
    useEffect(() => {
      const container = document.getElementById('verse-loading');
  
      lottie.loadAnimation({
        container: container,
        animationData: animationData,
        loop: true, // Set to true if you want the animation to loop
        renderer: 'svg', // Choose the renderer: svg / canvas / html
      });
  
      return () => {
        // Clean up animation when the component unmounts
        lottie.destroy();
      };
    }, []);
  
    return (
    <div>
        <div id="verse-loading"></div>
        <center>
        <h4>Searching</h4>
        </center>
    </div>
    )};
  
  export default LoadingAnimation;
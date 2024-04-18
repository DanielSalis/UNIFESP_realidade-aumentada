// src/App.js
import React from 'react';
import ARScene from './ArScene';

const App = () => {
  return (
    <div>
      <ARScene />
      <canvas id="canvas"></canvas>
      <div className="navbar">
        <img className="button-image" id="item0" src="/armchair.png" />
        <img className="button-image" id="item1" src="/sofa2.png" />
      </div>
    </div>
  );
};

export default App;

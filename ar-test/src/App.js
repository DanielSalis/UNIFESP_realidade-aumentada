// src/App.js
import React from 'react';
import ARScene from './ArScene';

const App = () => {
  return (
    <div>
      <ARScene/>
      <canvas id="canvas"></canvas>
      <div className="navbar">
        <img className="button-image" id="item0" src="/armchair.png" />
        <img className="button-image" id="item1" src="/lounger.png" />
        <img className="button-image" id="item2" src="/marble-coffeetable.png" />
        <img className="button-image" id="item3" src="/walnut-coffeetable.png" />
        <img className="button-image" id="item4" src="/chair-with-gold.png" />
        <img className="button-image" id="item5" src="/nesting-tables.png" />
      </div>
    </div>
  );
};

export default App;

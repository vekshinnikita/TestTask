import React from 'react';
import Converter from './components/Converter';

function App() {
  return (
    <div 
        className="App" 
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          backgroundColor: '#fbfbfb',
        }}
      >
      <Converter />
    </div>
  );
}

export default App;

import React from 'react';

// child components
import TempLines from './components/TempLines';

// styles
import './app.css';

function App() {
  return (
    <div>
      <h1 className="app-title">Visx Line Chart</h1>
      <p className="app-subhead">note: axis and appl stock data coming soon</p>
      <TempLines />
    </div>
  );
}

export default App;

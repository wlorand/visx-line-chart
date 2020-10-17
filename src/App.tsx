import React from 'react';

// child components
// import TempLines from './components/TempLines';
import HotLine from './components/HotLine';

// styles
import './app.css';

function App() {
  return (
    <div className="app">
      <h1 className="app-title">Visx Line Chart</h1>
      <p className="app-subhead">note: axis and appl stock data coming soon</p>
      {/* <TempLines width={640} height={480} /> */}
      <HotLine width={640} height={480} />
    </div>
  );
}

export default App;

import React from 'react';
import XonaiWebsite from './components/ui/component';
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}>
      <XonaiWebsite />
      <Toaster />
    </div>
  );
}

export default App;
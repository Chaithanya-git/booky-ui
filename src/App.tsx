import React from 'react';
import BookList from './BookList';
import './App.css'; // Add any global styles if needed

const App: React.FC = () => {
  return (
    <div className="app">
      <BookList />
    </div>
  );
};

export default App;

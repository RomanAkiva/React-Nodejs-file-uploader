import React from 'react';
import FileUpload from './components/FileUpload';
import './App.css';

const App = () => {
  return (
    <div className="container mt-4">
      <h3 className="display-4 text-center"><i className="fab fa-react" />React File Upload</h3>
      <FileUpload />
    </div>
  );
}

export default App;

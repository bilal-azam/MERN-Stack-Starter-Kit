// frontend/src/App.js (update for code splitting)
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

const Login = lazy(() => import('./Login'));

function App() {
  return (
    <Router>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" component={Login} />
          {/* Add other routes here */}
        </Routes>
      </Suspense>
      <Footer />
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/login" component={Login} />
        {/* Add other routes here */}
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
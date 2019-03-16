import React, { useState, useEffect } from 'react';
import AppNavbar from './components/layout/AppNavbar';
import Folder from './components/Folder';
import Upload from './components/Upload';
import Gallery from './components/Gallery';
import NotFound from './components/pages/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';



function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <React.Fragment>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css"
        integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
        crossOrigin="anonymous"
      />

      <AppNavbar />
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/" />
            <Route exact path="/folders" component={Folder} />
            <Route exact path="/upload" component={Upload} />
            <Route exact path="/gallery" component={Gallery} />
            <Route component={NotFound} />



          </Switch>
        </Router>
      </div>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>
          Click Me
      </button>
      </div>
    </React.Fragment>
  );
}

export default App;

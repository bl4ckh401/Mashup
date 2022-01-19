import './App.css';
import HomePage from './Components/HomePage'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import JoinRoom from './Components/JoinRoom';
import Room from './Components/Room';
import CreatePage from './Components/CreatePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" component={HomePage} exact/>
          <Route path="/create" component={CreatePage}/>
          <Route path="/room/:roomCode" component={Room} />
          <Route path="/join" component={JoinRoom} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

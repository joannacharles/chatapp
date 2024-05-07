// import { Route } from 'react-router-dom/cjs/react-router-dom.min'0;
import { Route } from 'react-router-dom';
import './App.css';
import ChatScreen from './Pages/ChatScreen'
import Home from './Pages/Home'

function App() {
  return (
    <div className="App">
      <Route path="/chats" component={ChatScreen} />
      <Route path="/" component={Home} exact/>

    </div>
  );
}

export default App;

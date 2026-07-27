import React from 'react';
import logo from './logo.svg';
import './App';
// import Sample from './components/Sample';
// import ClickCount from './components/State';
// import Props from './components/Props';
// import ChangeColor from './components/ChangeColor';
import TypeAlert from './components/typeAlert';
import Counter from './components/count';
import UserStatusCard from './components/Status';
import TemperatureOutfit from './components/temp';
function App() {
  return (
    <div className="App" style={{textAlign:'center'}} >
        {/* <Sample /> <hr />
        <ClickCount /> <hr />
        <Props /> <hr />
        <ChangeColor /><hr /> */}
        <p>Click the button, it will display the type of the event</p>
        <TypeAlert /> <br /><hr />
        <p>Click the increment and decrement button to change the value of the timer</p>
        <Counter/><hr />
        <p>Shows whether user is active</p>
        <UserStatusCard /><br /><hr />
        <p>Enter the temperature to get clothing suggestion</p>
        <TemperatureOutfit/><br /><hr />
    </div>
  );
}

export default App;



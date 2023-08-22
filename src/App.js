import cardBack from './images/bg-card-back.png';
import cardFront from "./images/bg-card-front.png";
import './App.css';

function App() {
  return (
    <div className="main-container">
      <div className="inital-bg">
        <img id="back-card" src={cardBack} alt="" />
        <img id="back-card" src={cardFront} alt="" />
      </div>
    </div>
  );
}

export default App;

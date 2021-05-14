import './App.css';
import Player from "./components/player";
import Control from "./components/control";



import { useState,useRef} from 'react';

export default function App() {

  const player=useRef(null);//reference of Player Component
  const [play,setPlay]=useState(false);

  return <div className="player">
    <Player vidRef={player}/>
    <Control  setPlay={setPlay} play={play} playerRef={player}/>{/*buttons,sideEffects*/}
</div>
    
}



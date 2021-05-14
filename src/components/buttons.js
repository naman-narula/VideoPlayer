import React,{useEffect,useState} from "react";
import {PlayArrow,Forward10,Replay10, VolumeUp,VolumeOff, SkipNext, Fullscreen, FullscreenExit,Speed, Pause} from '@material-ui/icons';
import { IconButton} from "@material-ui/core";



export default React.memo(function Buttons({play,playerRef,setPlay})
{
    console.log('buttons');

    const [mute,setMute]=useState(false);
    const [fullscreen,setFullscreen]=useState(false);

   
    

    function togglePlay()
    {

        setPlay((old)=>{
            if(!old)//if play is false  it will turn  to true and hence video should play
            {
                playerRef.current.play();
            }      
            else
            {
                playerRef.current.pause();
            }     
            return (!old);     

        })
       

    }


    function toggleMute(){
        setMute(()=>{
            return !mute;
        })
        playerRef.current.muted=!playerRef.current.muted;
    }

    function toggleFullScreen()
    {  
        if(fullscreen)
        {
            document.exitFullscreen();
            
        }
        else
        {
            document.querySelector('.player').requestFullscreen();
           
        }
    }

    
    function forwardOrReplay(val)
    {
        playerRef.current.currentTime+=val;
    }
    function handleSpeed()
    {
        
        playerRef.current.playbackRate=(playerRef.current.playbackRate+0.5)%2+1;
    }

    useEffect(()=>{


        playerRef.current.addEventListener('ended',()=>{
            setPlay(false);
        })
        function setFullscreenWrapper()
        {
            setFullscreen((old)=>{
                return !old;
            })
        }
     document.querySelector('.player').addEventListener('fullscreenchange',setFullscreenWrapper);



    },[playerRef])



    
    
    




    return <div className="controlButtons">
    <div className="rightControl">

    <IconButton onClick={()=>togglePlay()} >
    {play?<Pause style={{color:'white'}} ></Pause>:<PlayArrow style={{color:'white'}} ></PlayArrow>}
    </IconButton>


  
    <IconButton onClick={()=>forwardOrReplay(-4)}>
    <Replay10 style={{color:'white'}} ></Replay10>
    </IconButton>



    <IconButton onClick={()=>forwardOrReplay(4)}>
    <Forward10 style={{color:'white'}} ></Forward10>
    </IconButton>



    <IconButton onClick={toggleMute}>
    {mute?<VolumeOff style={{color:'white'}} ></VolumeOff>
    :<VolumeUp style={{color:'white'}} ></VolumeUp>}
    </IconButton>
    </div>




    <div className="leftControl">

    <IconButton>

    <SkipNext style={{color:'white'}} ></SkipNext>
    </IconButton>


    <IconButton onClick={handleSpeed}>
    <Speed style={{color:'white'}} ></Speed>
   
    </IconButton>


    <IconButton onClick={toggleFullScreen}>
    {fullscreen?<FullscreenExit style={{color:'white'}}></FullscreenExit>
    :<Fullscreen style={{color:'white'}} ></Fullscreen>}
    </IconButton>

    </div>

    </div>
});

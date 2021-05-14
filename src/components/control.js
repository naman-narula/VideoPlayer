import React, { useCallback, useEffect,useRef,useState } from "react";
import Buttons from  "./buttons";
import Details from "./details";
import LinearProgress from "@material-ui/core/LinearProgress";

import {makeStyles} from "@material-ui/core/styles";


export default function Control({play,playerRef,setPlay})
{
   
    const[progress,setProgress]=useState(0);
    const [width,setWidth]=useState('60vw');
    const controlRef=useRef(null);
  

    /*****************for width of progress bar *******************/
    useEffect(()=>{
       
        function setwidthWrapper()
        {
          setWidth(document.querySelector('.controlBar').offsetWidth);
        }
    
        window.addEventListener('resize',setwidthWrapper)
    
        setwidthWrapper();
       
        return ()=>{
          
          window.removeEventListener('resize',setwidthWrapper);
        }
      },[width])


/**********for setting progress value in progress bar **************************/
    useEffect(()=>{
        const Id=setInterval(()=>{
            setProgress((old)=>{
                if(old===100)
              {
                return 0;
              }
                const current=playerRef.current.currentTime;
          
                const duration=playerRef.current.duration;
                const update=(current/duration)*100;
                return Math.round(update-0.1);
            });
        },100)


        return ()=>{
            clearInterval(Id);
        }

    },[playerRef])

///*********************************for control bar hide/show effects***********************///
   
    useEffect(()=>{
        const ref=controlRef.current;
        const vidRef=playerRef.current;
       
        let opacityTimer;
        
        function decOpacity(delay=3000)
        {
           opacityTimer=setTimeout(()=>{
                ref.classList.add("controlBarFade");
            },delay)
      
            
        }

        function incOpacity(e)
        {
            ref.classList.remove("controlBarFade");
            if(e.currentTarget===ref )//if incOpacity is called due to hovering over control bar
            {
                clearTimeout(opacityTimer);
                decOpacity(3000);
            }
            if(e.currentTarget===vidRef ) //if incOpacity is called due to moving mouse on video
            {
                clearTimeout(opacityTimer);//remove previous timeout and apply new timeout starting from this instance
                decOpacity(3000)//decrease the opacity after 3 seconds of mouse inactivity
               
            }
           
        }
        ref.addEventListener('mouseenter',incOpacity);
       
        ref.addEventListener('mousemove',incOpacity);





        ///for mouse on video side effect
        
        vidRef.addEventListener('mousemove',incOpacity);
      
        
        return ()=>{
            ref.removeEventListener('mouseenter',incOpacity);
            ref.removeEventListener('mousemove',incOpacity);
            vidRef.removeEventListener('mousemove',incOpacity);
          

        }
    },[controlRef,playerRef])



function seek(e)
{
    const target=e.currentTarget;
 
    const rect=target.getBoundingClientRect();
    const x=e.clientX-rect.left;
    
    const percent=(x/target.offsetWidth);
    const vidRef=playerRef.current;
    vidRef.currentTime=(vidRef.duration*percent);
    //for removing delay of 100 ms in update of progress ,so immediately updating progress
    setProgress(()=>{
        return Math.round((percent*target.offsetWidth));
    })
}





   
    const useStyles=useCallback (makeStyles({
        control:{
            width:width,
            backgroundColor:'rgba(0,0,0,0.5)',
            height:"2vh"
            
        },
        primary:{
            backgroundColor:'lightcoral'
        },
       
    }),[width]);

    const classes=useStyles();

    return<div className="controlBar" ref={controlRef}>
    {!play&&<Details playerRef={playerRef}></Details>}
    <Buttons setPlay={setPlay} play={play} playerRef={playerRef}/>
    <LinearProgress variant="determinate" value={progress%100} classes={{root:classes.control,barColorPrimary:classes.primary }} onClick={seek}></LinearProgress>{/*progress value was sometimes overflowing 100 so added mod operator */}
   
    </div>

}
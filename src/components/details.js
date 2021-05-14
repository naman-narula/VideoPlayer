import React, { useEffect,useState,useRef } from "react";
export default function Details({playerRef})
{
    const[resize,setResize]=useState(false);// for change size of detail backdrop on resize
    const selfRef=useRef(null);
    /***********************calculating size of details backdrop ********************/
    useEffect(()=>{
        function setResizeWrapper()
        {
            setResize(!resize)
        }
        window.addEventListener('resize',setResizeWrapper);

        let width=playerRef.current.offsetWidth;
        let height=playerRef.current.offsetHeight;
        let topPostion=playerRef.current.offsetTop;
        let leftPostion=playerRef.current.offsetLeft;
    
        
       
        selfRef.current.style.left=`${leftPostion}px`;
        selfRef.current.style.top=`${topPostion}px`;
        selfRef.current.style.width=`${width}px`;
        selfRef.current.style.height=`${height}px`;
        
        
        return ()=>{
            window.removeEventListener('resize',setResizeWrapper);
        } 
        

    },[playerRef,resize,selfRef])



    return <div className="details" ref={selfRef}>
    <div>

    <h1>Krueger National Park</h1>
    <h2>Channel XYZ</h2>
    <h2>3K+</h2>
    <p>Kruger National Park is an amazing place where you can see a lot of wildlife.<br/>This is a short video showing some of the animals I saw there.</p>
    </div>

    </div>
}
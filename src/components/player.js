import React from "react";

export default React.memo(function Player({vidRef})
{
  
  

    return <video ref={vidRef} id="videoPlayer"> 
    <source src={process.env.PUBLIC_URL+'sample2.mp4'} >
    </source>
  no support
  </video>
})
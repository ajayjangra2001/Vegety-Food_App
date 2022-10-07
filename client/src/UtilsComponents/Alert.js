import React, { useState } from "react";

function Alert({ props, stateChanger }) {

  const [visibility, setVisibility] = useState(true);

  if (props) {
    setTimeout(() => {
      setVisibility(false);
      const state = () => stateChanger();
      state();
    }, 3000);
  }
  
  return (
    <div className="alert alert-success" role="alert" style={{display : props && visibility ? 'block' : 'none', position : 'absolute', top : '7rem', width : '50%', left : 'calc((100% - 50%)/2)', textAlign : 'center'}}>
        {props}
  </div>
  );
}

export default Alert;

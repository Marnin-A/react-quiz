import React from "react";

import "./congratulations.css";

const congratulations = (props) => {
  function refreshPage() {
    window.location.reload(false);
  }
  return (
    <div className="congrats">
      <div id="message">
        <h1>Congratulations, props.username 🎉</h1>
      </div>

      <button className="play-btn" onClick={refreshPage}>
        Play again
      </button>
    </div>
  );
};

export default congratulations;

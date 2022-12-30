import React, { useEffect } from "react";

import "./congratulations.css";

const congratulations = () => {
  function refreshPage() {
    window.location.reload(false);
  }
  let name;
  useEffect(() => {
    name = JSON.parse(localStorage.getItem("name"));

    console.log(name);
  }, []);

  return (
    <div className="congrats">
      <div id="message">
        <h1>Congratulations, {name} 🎉</h1>
      </div>

      <button className="play-btn" onClick={refreshPage}>
        Play again
      </button>
    </div>
  );
};

export default congratulations;

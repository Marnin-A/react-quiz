import React, { useEffect, useState } from "react";

import "./congratulations.css";

const congratulations = () => {
  const [name, setName] = useState("");
  // Define a function to refresh the page
  function refreshPage() {
    window.location.reload(false);
  }

  // Get the users name from local storage onload
  useEffect(() => {
    let Name = JSON.parse(localStorage.getItem("name"));
    setName(Name);
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

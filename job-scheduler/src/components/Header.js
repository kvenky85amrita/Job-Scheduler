import React from "react";

function Header() {
  return (
    <header style={{ backgroundColor: "#007bff", color: "white", padding: "10px 0", textAlign: "center" }}>
      <h1 style={{ margin: 0, fontSize: "24px" }}>Job Scheduler</h1>
      <p style={{ margin: 0 }}>Schedule tasks to run at specific times or intervals</p>
    </header>
  );
}

export default Header;

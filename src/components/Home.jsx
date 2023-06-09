import React from "react";
import { Routes, Route, Link } from "react-router-dom";

/* The Home Page and Entry Point of the App */
const Home = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <React.Fragment>
            <div className="Container">
              <h1 className="title">WSD Athletics</h1>
              <hr className="top-hr"></hr>
              <div className="Select">
                <Link to="/seasons" className="Seasons">
                  <h2>Active Seasons</h2>
                  <br />
                  <p>Rosters and Schedules</p>
                </Link>
                <Link to="/opponents" className="Opponents">
                  <h2>Opponents</h2>
                  <br />
                  <p>Addresses and Contacts</p>
                </Link>
              </div>
              <hr className="separator"></hr>
              <Link to="/archive" className="Archive">
                <h2>Archived Seasons</h2>
              </Link>
              <hr className="separator"></hr>
              <Link to="/coaches" className="Archive">
                <h2>Meet The Coaches</h2>
              </Link>
            </div>
          </React.Fragment>
        }
      />
    </Routes>
  );
};

export default Home;

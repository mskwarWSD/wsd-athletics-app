import "../styles/Teams.css";
import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { db } from "./Firebase";
import TeamCard from "./TeamCard";
import TeamModal from "./TeamModal";

const AddTeam = ({ seasonid }) => {
  const [showModal, setShowModal] = useState(false);
  const [teams, setTeams] = useState([]);
  const [season, setSeason] = useState(null);

  useEffect(() => {
    const teamsRef = db.ref(`seasons/${seasonid}/teams`);
    teamsRef.on("value", (snapshot) => {
      const teamsData = snapshot.val();
      if (teamsData) {
        const teamsList = Object.keys(teamsData).map((key) => {
          return { id: key, ...teamsData[key] };
        });
        setTeams(teamsList);
      } else {
        setTeams([]);
      }
    });

    const seasonRef = db.ref(`seasons/${seasonid}`);
    seasonRef.on("value", (snapshot) => {
      const seasonData = snapshot.val();
      if (seasonData) {
        setSeason(seasonData);
      } else {
        setSeason(null);
      }
    });

    return () => {
      teamsRef.off();
      seasonRef.off();
    };
  }, [seasonid]);

  const handleAddTeam = (
    teamName,
    sport,
    abbr,
    multi,
    teamPageA,
    teamPageB,
    teamPicA,
    teamPicB,
    coachesA,
    coachesB
  ) => {
    const teamid = db.ref().child(`seasons/${seasonid}/teams`).push().key;
    const updatedSeason = {
      ...season,
      teams: {
        ...season.teams,
        [teamid]: {
          name: teamName,
          sport: sport,
          abbr: abbr,
          multi: multi,
          teamPageA: teamPageA,
          teamPageB: teamPageB,
          teamPicA: teamPicA,
          teamPicB: teamPicB,
          coachesA: coachesA,
          coachesB: coachesB
        },
      },
    };
    db.ref(`seasons/${seasonid}`).set(updatedSeason, (error) => {
      if (error) {
        console.log("Error updating season information:", error);
      } else {
        console.log(
          "Season information updated successfully in Firebase database."
        );
        setShowModal(false);
        const newTeam = {
          id: teamid,
          name: teamName,
          sport: sport,
          abbr: abbr,
          multi: multi,
          teamPageA: teamPageA,
          teamPageB: teamPageB,
          teamPicA: teamPicA,
          teamPicB: teamPicB,
          coachesA: coachesA,
          coachesB: coachesB
        }; // create a new team object
        setTeams([...teams, newTeam]); // add the new team to the state
      }
    });
  };

  return (
    <div>
      <div className='add-team-btn'>
        <Button variant='primary wsd' onClick={() => setShowModal(true)}>
          Add Team
        </Button>
      </div>
      <div className='teams-area'>
        {teams.map((team, index) => (
          <TeamCard key={team.id} team={team} index={index} seasonid={seasonid} teams={teams} />
        ))}
        <TeamModal
          editing={false}
          showModal={showModal}
          handleAddTeam={handleAddTeam}
          handleCloseModal={() => setShowModal(false)}
        />
      </div>
    </div>
  );
};

export default AddTeam;

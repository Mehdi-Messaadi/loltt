import React, { useState } from "react";
import { useQuery, gql, useLazyQuery } from "@apollo/client";

// GraphQL query to fetch matches based on region
const GET_ACCOUNT_MATCHES = gql`
  query GetAccountMatches($gameName: String!, $tagLine: String!) {
    account(gameName: $gameName, tagLine: $tagLine) {
      gameName
      tagLine
      matches {
        id
      }
    }
  }
`;

// GraphQL query to fetch match details
const GET_MATCH_DETAILS = gql`
  query GetMatchDetails($matchId: String!, $region: String!) {
    match(matchId: $matchId, region: $region) {
      id
      metadata {
        matchId
        participants
      }
      info {
        gameCreation
        gameDuration
        gameEndTimestamp
        gameMode
        gameName
        gameStartTimestamp
        gameVersion
        mapId
        teams {
          teamId
          win
          bans {
            championId
            pickTurn
          }
          objectives {
            baron {
              first
              kills
            }
            champion {
              first
              kills
            }
            dragon {
              first
              kills
            }
            inhibitor {
              first
              kills
            }
            riftHerald {
              first
              kills
            }
            tower {
              first
              kills
            }
          }
        }
        participants {
          summonerName
          teamId
          championName
          kills
          deaths
          assists
          champLevel
          goldEarned
          totalMinionsKilled
          largestMultiKill
          visionScore
        }
      }
    }
  }
`;

function App() {
  const [gameName, setGameName] = useState(""); // Player's game name
  const [tagLine, setTagLine] = useState(""); // Player's tagline
  const [region, setRegion] = useState(""); // Selected region
  const [selectedMatch, setSelectedMatch] = useState(""); // Selected match ID
  const [matches, setMatches] = useState([]); // List of matches

  const { data: accountData, refetch } = useQuery(GET_ACCOUNT_MATCHES, {
    skip: true,
  });

  const [getMatchDetails, { data: matchDetailsData }] =
    useLazyQuery(GET_MATCH_DETAILS);

  const handleRegionChange = (e) => {
    setRegion(e.target.value);
  };

  const handleSearch = async () => {
    if (gameName && tagLine && region) {
      const { data } = await refetch({
        gameName,
        tagLine,
      });
      setMatches(data.account.matches);
    }
  };

  const handleMatchSelect = (matchId) => {
    setSelectedMatch(matchId);
    getMatchDetails({
      variables: {
        matchId,
        region,
      },
    });
  };

  return (
    <div>
      <h2>League of Legends Match Viewer</h2>

      <div>
        <input
          type="text"
          placeholder="Enter Game Name"
          value={gameName}
          onChange={(e) => setGameName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter Tag Line"
          value={tagLine}
          onChange={(e) => setTagLine(e.target.value)}
        />
        <select value={region} onChange={handleRegionChange}>
          <option value="">Select Region</option>
          <option value="americas">Americas</option>
          <option value="europe">Europe</option>
          <option value="asia">Asia</option>
          <option value="sea">SEA</option>
        </select>
        <button onClick={handleSearch}>Search Matches</button>
      </div>

      <div>
        {matches.length > 0 ? (
          <ul>
            {matches.map((match) => (
              <button
                key={match.id}
                onClick={() => handleMatchSelect(match.id)}
              >
                Match ID: {match.id}
              </button>
            ))}
          </ul>
        ) : (
          <p>No matches found</p>
        )}
      </div>

      {selectedMatch && matchDetailsData && (
        <div>
          <h3>Match Details</h3>
          <div>
            <h4>General Info</h4>
            <p>Game Mode: {matchDetailsData.match.info.gameMode}</p>
            <p>Game Duration: {matchDetailsData.match.info.gameDuration} sec</p>
            <p>Game Version: {matchDetailsData.match.info.gameVersion}</p>
            <p>Map ID: {matchDetailsData.match.info.mapId}</p>
          </div>

          <h4>Teams</h4>
          {matchDetailsData.match.info.teams.map((team, index) => (
            <div key={index}>
              <h5>Team {team.teamId}</h5>
              <p>Win: {team.win ? "Yes" : "No"}</p>
              <div>
                <h6>Objectives</h6>
                <p>Baron Kills: {team.objectives.baron.kills}</p>
                <p>Dragon Kills: {team.objectives.dragon.kills}</p>
                <p>Tower Kills: {team.objectives.tower.kills}</p>
              </div>
            </div>
          ))}

          <h4>Participants</h4>
          {matchDetailsData.match.info.participants.map(
            (participant, index) => (
              <div key={index}>
                <h5>{participant.summonerName}</h5>
                <p>Champion: {participant.championName}</p>
                <p>
                  Kills/Deaths/Assists: {participant.kills}/{participant.deaths}
                  /{participant.assists}
                </p>
                <p>Gold Earned: {participant.goldEarned}</p>
                <p>Vision Score: {participant.visionScore}</p>
                <p>Total Minions Killed: {participant.totalMinionsKilled}</p>
                <p>Largest Multi Kill: {participant.largestMultiKill}</p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default App;

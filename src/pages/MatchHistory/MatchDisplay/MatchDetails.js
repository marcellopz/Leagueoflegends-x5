import React, { useEffect, useRef, useState } from "react";
import useMatchData from "./useMatchData";
import { Paper, Tooltip, Typography } from "@mui/material";
import PlayerLine from "./PlayerLine";
import {
  CHAMPIONICONURL,
  baronLoseUrl,
  baronWinUrl,
  dragonLoseUrl,
  dragonWinUrl,
  turretLoseUrl,
  turretWinUrl,
} from "../../../common-components/resources";

const BaronDragonTurretBans = ({ win, baron, dragon, turret }) => {
  const baronIcon = win ? baronWinUrl : baronLoseUrl;
  const dragonIcon = win ? dragonWinUrl : dragonLoseUrl;
  const turretIcon = win ? turretWinUrl : turretLoseUrl;
  return (
    <div style={{ display: "flex" }}>
      <div style={{ display: "flex", marginRight: "12px" }}>
        <img
          src={baronIcon}
          alt="baron"
          style={{ marginRight: "5px" }}
          width={15}
        />
        <Typography>{baron}</Typography>
      </div>
      <div style={{ display: "flex", marginRight: "12px" }}>
        <img
          src={dragonIcon}
          alt="dragon"
          style={{ marginRight: "5px" }}
          width={15}
        />
        <Typography>{dragon}</Typography>
      </div>
      <div style={{ display: "flex", marginRight: "12px" }}>
        <img
          src={turretIcon}
          alt="turret"
          style={{ marginRight: "5px" }}
          width={15}
        />
        <Typography>{turret}</Typography>
      </div>
    </div>
  );
};

const ProgressBar = ({ value, maxValue, leftColor, rightColor, text }) => {
  const progressPercentage = (value / maxValue) * 100;

  return (
    <div style={{ height: "100%", width: "100%", margin: "8px 0" }}>
      <div style={{ width: "100%" }}>
        <div
          style={{
            width: "100%",
            height: "16px",
            backgroundColor: rightColor,
            position: "relative",
          }}
        >
          <Typography
            style={{
              textAlign: "center",
              fontSize: "12px",
              position: "absolute",
              zIndex: 10,
              width: "100%",
            }}
          >
            {text}
          </Typography>
          <Typography
            style={{
              textAlign: "start",
              fontSize: "12px",
              position: "absolute",
              zIndex: 10,
              width: "100%",
              marginLeft: "5px",
            }}
          >
            {value}
          </Typography>
          <Typography
            style={{
              textAlign: "end",
              fontSize: "12px",
              position: "absolute",
              zIndex: 10,
              width: "100%",
              paddingRight: "5px",
            }}
          >
            {maxValue - value}
          </Typography>
          <div
            style={{
              width: `${progressPercentage}%`,
              height: "100%",
              backgroundColor: leftColor,
              position: "absolute",
              left: "0",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function MatchDetails({ match }) {
  const {
    blueTeam,
    redTeam,
    blueTeamObj,
    redTeamObj,
    blueMaxTanked,
    redMaxTanked,
    redKils,
    blueKills,
    redMaxDamage,
    redMaxGold,
    blueMaxDamage,
    blueMaxGold,
    blueWin,
    redWin,
    gameDuration,
    blueTotalDamage,
    redTotalDamage,
    blueTotalKills,
    redTotalKills,
    colorWin,
    colorLose,
  } = useMatchData(match);
  const ref1 = useRef(null);
  const ref2 = useRef(null);

  const [width1, setWidth1] = useState(0);
  const [width2, setWidth2] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth1(ref1.current?.clientWidth);
      setWidth2(ref2.current?.clientWidth);
    });
    setWidth1(ref1.current?.clientWidth);
    setWidth2(ref2.current?.clientWidth);
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
      }}
    >
      <div style={{ width: width1 > 700 ? "96%" : "100%", display: "flex" }}>
        <Paper
          sx={{
            borderRadius: "7px",
            background: blueWin ? colorWin : colorLose,
            width: "100%",
            padding: "5px",
            color: "gainsboro",
          }}
          ref={ref1}
        >
          {blueTeam.map((p) => (
            <PlayerLine
              player={p}
              key={p.participantId}
              totalKills={blueKills}
              maxDamage={blueMaxDamage}
              maxGold={blueMaxGold}
              maxTank={blueMaxTanked}
              gameDuration={gameDuration}
              width={width1}
              showItems
            />
          ))}
        </Paper>
      </div>
      {width1 > 700 && (
        <div
          style={{
            height: "197px",
            width: "3%",
            justifyContent: "space-around",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {blueTeamObj.bans.map((champ, i) => (
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                width: "34px",
                height: "34px",
                borderRadius: "3px",
                marginRight: "2px",
              }}
              key={i}
            >
              <img
                src={`${CHAMPIONICONURL}${champ.championId}.png`}
                alt={champ.championId}
                style={{
                  margin: "2px",
                }}
                width="30px"
              />
            </div>
          ))}
        </div>
      )}
      <div style={{ width: width1 > 700 ? "96%" : "100%", display: "flex" }}>
        <Paper
          sx={{
            width: "calc(96% + 10px)",
            padding: "0 2%",
            marginY: "7px",
            height: "60px",
            backgroundColor: "rgba(255,255,255, 0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "gainsboro",
          }}
        >
          <BaronDragonTurretBans
            win={blueWin}
            baron={blueTeamObj.baronKills}
            dragon={blueTeamObj.dragonKills}
            turret={blueTeamObj.towerKills}
          />
          <div style={{ width: "40%" }}>
            <ProgressBar
              leftColor={blueWin ? "#4694c5" : "rgb(211 65 65)"}
              rightColor={redWin ? "#4694c5" : "rgb(211 65 65)"}
              maxValue={blueTotalDamage + redTotalDamage}
              value={blueTotalDamage}
              text="Total damage"
            />
            <ProgressBar
              leftColor={blueWin ? "#4694c5" : "rgb(211 65 65)"}
              rightColor={redWin ? "#4694c5" : "rgb(211 65 65)"}
              maxValue={blueTotalKills + redTotalKills}
              value={blueTotalKills}
              text="Total gold"
            />
          </div>

          <BaronDragonTurretBans
            win={redWin}
            baron={redTeamObj.baronKills}
            dragon={redTeamObj.dragonKills}
            turret={redTeamObj.towerKills}
          />
        </Paper>
      </div>
      <div style={{ width: width1 > 700 ? "96%" : "100%", display: "flex" }}>
        <Paper
          sx={{
            borderRadius: "7px",
            background: redWin ? colorWin : colorLose,
            width: "100%",
            padding: "5px",
            color: "gainsboro",
          }}
          ref={ref2}
        >
          {redTeam.map((p) => (
            <PlayerLine
              player={p}
              key={p.participantId}
              totalKills={redKils}
              maxDamage={redMaxDamage}
              maxGold={redMaxGold}
              maxTank={redMaxTanked}
              gameDuration={gameDuration}
              width={width2}
              showItems
            />
          ))}
        </Paper>
      </div>
      {width1 > 700 && (
        <div
          style={{
            height: "197px",
            width: "3%",
            justifyContent: "space-around",
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {redTeamObj.bans.map((champ, i) => (
            <div
              style={{
                background: "rgba(255,255,255,0.2)",
                width: "34px",
                height: "34px",
                borderRadius: "3px",
                marginRight: "2px",
              }}
              key={i}
            >
              <img
                src={`${CHAMPIONICONURL}${champ.championId}.png`}
                alt={champ.championId}
                style={{
                  margin: "2px",
                }}
                width="30px"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

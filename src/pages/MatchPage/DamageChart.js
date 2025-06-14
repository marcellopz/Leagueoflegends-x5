import React, { useState } from "react";
import { CHAMPIONICONURL } from "../../common-components/resources";
import { floatToPercentageString, formatNumber } from "../../utils/utils";
import { Tooltip } from "@mui/material";
import "./DamageChart.css";

const Tab = ({ setTabState, tabState, n, text }) => (
  <div
    className={`tab ${tabState === n ? "tab-active" : "tab-inactive"}`}
    onClick={() => setTabState(n)}
  >
    <p className="tab-text">{text}</p>
  </div>
);

const tabKey = [
  "totalDamageDealtToChampions",
  "totalDamageTaken",
  "goldEarned",
];

const sortFunctions = (t) => (a, b) => b.stats[tabKey[t]] - a.stats[tabKey[t]];

export default function DamageChart({ matchData }) {
  const [tabState, setTabState] = useState(0);

  return (
    <div>
      <div className="tab-container">
        <Tab
          setTabState={setTabState}
          tabState={tabState}
          n={0}
          text="Damage"
        />
        <Tab
          setTabState={setTabState}
          tabState={tabState}
          n={1}
          text="Damage Taken"
        />
        <Tab setTabState={setTabState} tabState={tabState} n={2} text="Gold" />
      </div>
      <ul className="chart-content">
        {matchData.participants.sort(sortFunctions(tabState)).map((p, i) => {
          const max = Math.max(
            ...matchData.participants.map((o) => o.stats[tabKey[tabState]])
          );
          return (
            <li className="chart-item" key={i}>
              <div className="chart-item-content">
                <img
                  src={`${CHAMPIONICONURL}${p.championId}.png`}
                  width={50}
                  height={50}
                  alt={p.championName}
                />
                <div className="chart-bar-container">
                  <Tooltip title={formatNumber(p.stats[tabKey[tabState]])}>
                    <div className="chart-bar">
                      <div
                        className={
                          tabState === 0
                            ? "damage-bar"
                            : tabState === 1
                            ? "damage-taken-bar"
                            : "gold-bar"
                        }
                        style={{
                          width: floatToPercentageString(
                            p.stats[tabKey[tabState]] / max
                          ),
                        }}
                      />
                    </div>
                  </Tooltip>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import React, { useState } from "react";
import { CHAMPIONICONURL } from "../../common-components/resources";
import { floatToPercentageString, formatNumber } from "../../utils/utils";
import { Tooltip } from "@mui/material";

const Tab = ({ setTabState, tabState, n, text }) => (
  <div
    className="flex-1 text-center flex"
    style={
      tabState === n
        ? {
            borderTop: "1px solid rgba(255,255,255,0.5)",
            borderLeft: "1px solid rgba(255,255,255,0.5)",
            borderRight: "1px solid rgba(255,255,255,0.5)",
          }
        : {
            background: "rgba(255,255,255,0.05)",
            borderBottom: "1px solid rgba(255,255,255,0.5)",
            borderTop: "1px solid rgba(255,255,255,0.3)",
            borderLeft: "1px solid rgba(255,255,255,0.3)",
            borderRight: "1px solid rgba(255,255,255,0.3)",
          }
    }
    onClick={() => setTabState(n)}
  >
    <p className="m-auto">{text}</p>
  </div>
);

const tabKey = [
  "totalDamageDealtToChampions",
  "totalDamageTaken",
  "goldEarned",
];

const colors = ["rgb(100 166 245)", "rgb(245, 100, 100)", "rgb(240, 245, 100)"];

const sortFunctions = (t) => (a, b) => b.stats[tabKey[t]] - a.stats[tabKey[t]];

export default function DamageChart({ matchData }) {
  const [tabState, setTabState] = useState(0);

  return (
    <div>
      <div className="h-12 flex">
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
      <ul
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.5)",
          borderLeft: "1px solid rgba(255,255,255,0.5)",
          borderRight: "1px solid rgba(255,255,255,0.5)",
          padding: "10px",
        }}
      >
        {matchData.participants.sort(sortFunctions(tabState)).map((p, i) => {
          const max = Math.max(
            ...matchData.participants.map((o) => o.stats[tabKey[tabState]])
          );
          return (
            <li className="p-4 px-6" key={i}>
              <div className="flex">
                <img
                  src={`${CHAMPIONICONURL}${p.championId}.png`}
                  width={50}
                  height={50}
                  alt={p.championName}
                />
                <div className="flex-1 px-4 py-3.5">
                  <Tooltip title={formatNumber(p.stats[tabKey[tabState]])}>
                    <div className="h-5">
                      <div
                        style={{
                          background: colors[tabState],
                          height: "100%",
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

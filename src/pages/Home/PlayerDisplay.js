import React from "react";

export default function PlayerDisplay({ name, ranks }) {
  return (
    <div style={{ margin: "5px", textAlign: "center" }}>
      <h2>{name}</h2>
      <table>
        <thead>
          <tr>
            <th>Role</th>
            <th>Rank</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ border: "1px solid black" }}>Top</td>
            <td style={{ border: "1px solid black" }}>{ranks.top}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Jungle</td>
            <td style={{ border: "1px solid black" }}>{ranks.jungle}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Mid</td>
            <td style={{ border: "1px solid black" }}>{ranks.mid}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Adc</td>
            <td style={{ border: "1px solid black" }}>{ranks.adc}</td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black" }}>Support</td>
            <td style={{ border: "1px solid black" }}>{ranks.support}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

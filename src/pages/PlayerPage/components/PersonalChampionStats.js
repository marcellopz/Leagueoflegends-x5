import { CHAMPIONICONURL } from "../../../common-components/resources";

export default function PersonalChampionStats({ champ }) {
  console.log(champ);
  return (
    <div
      style={{
        border: "1px solid white",
        padding: "3px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          overflow: "hidden",
          borderRadius: "15px",
          marginLeft: "5px",
          marginRight: "10px",
        }}
      >
        <img
          src={`${CHAMPIONICONURL}${champ.championId}.png`}
          width={"30px"}
          alt={champ.championName}
        />
      </div>
      {champ.championName}
    </div>
  );
}

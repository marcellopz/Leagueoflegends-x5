import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  getPlayer,
  getPlayerSummaryList,
} from "../../services/firebaseDatabase";
import X5pageContentArea from "../../common-components/X5pageContentArea";
import {
  getWinRateClassName,
  floatToPercentageString,
  getTop3Rank,
} from "../../utils/utils";
import {
  botB64,
  jngB64,
  midB64,
  supB64,
  topB64,
} from "../../assets/images/lanes";
import { useNavigate } from "react-router-dom";
import "./PlayerList.css"; // Import component styles

const columns = [
  {
    field: "name",
    headerName: "Name",
    type: "string",
    width: 100,
    sortable: true,
  },
  {
    field: "winRate",
    headerName: "Win rate",
    type: "string",
    width: 90,
    sortable: true,
    align: "center",
    valueGetter: (params) => floatToPercentageString(params.row.winRate),
    cellClassName: (params) => getWinRateClassName(params.row.winRate),
  },
  {
    field: "summonerName",
    headerName: "Summoner Name",
    type: "string",
    // align: "center",
    width: 140,
    sortable: true,
  },
  {
    field: "numberOfMatches",
    headerName: "Matches",
    type: "number",
    align: "center",
    width: 80,
    sortable: true,
  },
  {
    field: "top",
    headerName: "Top",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
    renderHeader: () => (
      <img src={topB64} width={40} alt="top" className="lane-icon" />
    ),
  },
  {
    field: "jungle",
    headerName: "Jungle",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
    renderHeader: () => (
      <img src={jngB64} width={40} alt="jungle" className="lane-icon" />
    ),
  },
  {
    field: "mid",
    headerName: "Mid",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
    renderHeader: () => (
      <img src={midB64} width={40} alt="mid" className="lane-icon" />
    ),
  },
  {
    field: "adc",
    headerName: "Adc",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
    renderHeader: () => (
      <img src={botB64} width={40} alt="bot" className="lane-icon" />
    ),
  },
  {
    field: "support",
    headerName: "Support",
    type: "number",
    align: "center",
    width: 60,
    sortable: true,
    renderHeader: () => (
      <img src={supB64} width={40} alt="support" className="lane-icon" />
    ),
  },
  {
    field: "avg",
    headerName: "Avg Top 3",
    type: "number",
    align: "center",
    width: 85,
    sortable: true,
    valueGetter: (params) => getTop3Rank(params.row),
  },
];

export default function PlayerList() {
  const [players, setPlayers] = useState({});
  const [playersSummary, setPlayersSummary] = useState({});
  const [playersWithStats, setPlayersWithStats] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const players_ = await getPlayer("");
      setPlayers(players_);
    })();
    (async () => {
      const players_ = await getPlayerSummaryList();
      setPlayersSummary(players_ ?? {});
    })();
  }, []);

  useEffect(() => {
    const ps = Object.keys(players ?? {}).map((p, i) => {
      return {
        ...players[p],
        winRate: playersSummary[players[p]?.account_id]?.winRate ?? 0,
        summonerName:
          playersSummary[players[p]?.account_id]?.summonerName ?? "",
        numberOfMatches:
          playersSummary[players[p]?.account_id]?.numberOfMatches ?? 0,
        id: i,
        player_id: p,
      };
    });
    setPlayersWithStats(ps.filter((p) => !p.hide));
  }, [players, playersSummary]);

  return (
    <X5pageContentArea
      title="Player List"
      loading={playersWithStats.length === 0}
    >
      <div className="player-list-grid-container">
        <DataGrid
          rows={playersWithStats}
          columns={columns}
          hideFooter
          rowSelection={false}
          disableRowSelectionOnClick
          disableColumnSelector
          disableDensitySelector
          disableColumnMenu
          className="player-list-datagrid"
          sx={{
            "& .MuiDataGrid-cell": {
              borderColor: "var(--border-light)",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid var(--border-light)",
            },
            "& .MuiTablePagination-root": {
              color: "var(--foreground)",
            },
          }}
          onRowClick={(a) => Navigate("/player/" + a.row.player_id)}
        />
      </div>
    </X5pageContentArea>
  );
}

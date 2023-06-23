import { ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { CHAMPIONICONURL } from "../../../common-components/resources";

// import makeStyles from "@material-ui/core/styles/makeStyles";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemAvatar from "@material-ui/core/ListItemAvatar";
// import ListItemText from "@material-ui/core/ListItemText";
// import Avatar from "@material-ui/core/Avatar";
// import InboxIcon from "@material-ui/icons/Inbox";

const DraggableListItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.championName} index={index}>
      {(provided, snapshot) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? "bg-red-500" : ""}
        >
          <ListItemAvatar>
            <img
              src={`${CHAMPIONICONURL}${item.championId}.png`}
              alt={item.championName}
              width="30px"
            />
          </ListItemAvatar>
          <ListItemText
            primary={item.summonerName}
            secondary={item.championName}
          />
        </ListItem>
      )}
    </Draggable>
  );
};

export default DraggableListItem;

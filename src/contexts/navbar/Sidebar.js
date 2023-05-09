import { Divider, Drawer, MenuItem, MenuList } from "@mui/material";
import React from "react";

export default function Sidebar({ navbarItems, open, setOpen }) {
  return (
    <Drawer
      anchor="right"
      open={open}
      ModalProps={{ onBackdropClick: () => setOpen(false) }}
    >
      <MenuList style={{ width: "250px" }}>
        {navbarItems.map((item) => (
          <React.Fragment key={item.label}>
            <a
              href={item.url}
              style={{
                color: "inherit",
                textDecoration: "none",
                marginTop: "1px",
              }}
            >
              <MenuItem style={{ fontSize: "20px", paddingLeft: "30px" }}>
                {item.label}
              </MenuItem>
            </a>
            <Divider />
          </React.Fragment>
        ))}
      </MenuList>
    </Drawer>
  );
}

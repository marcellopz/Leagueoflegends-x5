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
          <div key={item.url}>
            <a
              href={item.url}
              style={{
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <MenuItem
                style={{
                  fontSize: "20px",
                  paddingLeft: "30px",
                  margin: "5px 0",
                }}
              >
                {item.label}
              </MenuItem>
            </a>
            <Divider />
          </div>
        ))}
      </MenuList>
    </Drawer>
  );
}

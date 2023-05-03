import { Divider, Drawer, MenuItem, MenuList } from "@mui/material";
import React from "react";

export default function Sidebar({ navbarItems, open, setOpen }) {
  console.log(navbarItems);
  return (
    <Drawer
      anchor="right"
      open={open}
      ModalProps={{ onBackdropClick: () => setOpen(false) }}
    >
      <MenuList style={{ width: "250px" }}>
        {navbarItems.map((item) => (
          <>
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
          </>
        ))}
      </MenuList>
    </Drawer>
  );
}

"use client"
import { AppBar, Button, Menu, MenuItem, Stack, Toolbar } from "@mui/material"
import MonitorHeartOutlinedIcon from "@mui/icons-material/MonitorHeartOutlined"
import AccountCircle from "@mui/icons-material/AccountCircle"
import { useState } from "react"
import Link from "next/link"

export const MainHeader = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={2}>
          <Button variant="text" color="inherit" component={Link} href="/">
            <MonitorHeartOutlinedIcon />
          </Button>
        </Stack>
        <div style={{ marginLeft: "auto" }}>
          <Button
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <AccountCircle />
          </Button>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} href="/profile">
              Profile
            </MenuItem>
            <MenuItem onClick={handleClose} component={Link} href="/logout">
              Logout
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

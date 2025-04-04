// https://github.com/wit-hdip-comp-sci-2023/full-stack-2/blob/main/topic-5/book-1/05.SiteHeader.md
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";


const SiteHeader: React.FC = () => {
  const navigate = useNavigate();

  const menuOptions = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Login", path: "/login" },
    { label: "Sign Up", path: "/signup" },
  ];

  return (
    <>
      <AppBar position="fixed" elevation={0} color="primary">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography variant="h5">data-heist</Typography>
          </Link>
          <Box>
            {menuOptions.map((opt) => (
              <Button key={opt.label} color="inherit" onClick={() => navigate(opt.path)}>
                {opt.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SiteHeader;

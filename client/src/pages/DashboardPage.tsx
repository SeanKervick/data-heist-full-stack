import { Button, Box, Container, Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper, } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { getLeaderboard } from "../api/scoreAPI";
import { LeaderboardUser } from "../types/interfaces"

const DashboardPage = () => {
  const navigate = useNavigate();
  const [username] = useState(localStorage.getItem("username"));
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState<boolean>();

  const handleLogout = () => {
    localStorage.removeItem("token"); // remove JWT token
    navigate("/login"); // redirect to login
  };

  const handleLeaderboard = async () => {
    const data: LeaderboardUser[] = await getLeaderboard();
    setLeaderboard(data);
    setShowLeaderboard(true);
  };

  return (
    <Container sx={{ textAlign: "center", mt: 5 }}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4">
          welcome {username}!
        </Typography>
        <Typography gutterBottom>you are now logged in.</Typography>
      </Box>
      {!showLeaderboard && (
        <Box sx={{ mt: 4, mb: 2 }} >
        <Button variant="contained" color="primary" onClick={handleLeaderboard} >
            Click here to view leaderboard
          </Button>
        </Box>
      )}
      {/* ----------- leaderboard table -------------- https://mui.com/material-ui/react-table/ */}
      {showLeaderboard && (
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="center">Rank</TableCell>
                <TableCell>Username</TableCell>
                <TableCell align="right">Score</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {leaderboard.map((user, index) => (
                <TableRow key={user._id}>
                  <TableCell align="center">#{index + 1}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell align="right">{user.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 3 }}>
        <Link to="/game-intro">
            <Button variant="contained" color="primary">
              Play
            </Button>
          </Link>
        <Button variant="contained" color="secondary" onClick={handleLogout} >
          logout
        </Button>
      </Box>
    </Container>
  );
};

export default DashboardPage;

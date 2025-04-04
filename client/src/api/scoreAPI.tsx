import axios from "axios";

// pass finalScore from feedback page to store by username
export const updateHighScore = async (score: number) => {

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  await axios.post(
    `${import.meta.env.VITE_API_URL}/api/update-score`, // post api route to update user's score
    { score, username },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const getLeaderboard = async () => {
  const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/leaderboard`); // call api route for fetching leaderboard
  return data;
};

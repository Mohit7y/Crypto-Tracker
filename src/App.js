import { Container, Box } from "@mui/material";
import Navbar from "./components/Navbar";
import CoinTable from "./components/CoinTable";

function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#f4f7fb" }}>
      <Navbar />

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Hero Section */}
        <Box
          sx={{
            textAlign: "center",
            py: 6,
            borderRadius: 3,
            mb: 5,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
            Track Your Favorite Cryptos
          </h1>
          <p style={{ fontSize: "1.2rem" }}>
            Live prices, market caps, and charts powered by CoinGecko API
          </p>
        </Box>

        {/* Market Overview with toggleable chart */}
        <CoinTable />
      </Container>
    </div>
  );
}

export default App;

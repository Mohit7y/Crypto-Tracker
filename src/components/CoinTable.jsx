import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CoinChart from "./CoinChart";

export default function CoinTable() {
    const [coins, setCoins] = useState([]);
    const [visible, setVisible] = useState(10);
    const [selectedCoin, setSelectedCoin] = useState(null);

    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const res = await fetch(
                    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=f"
                );
                const data = await res.json();
                setCoins(data);
            } catch (err) {
                console.error("Error fetching coins:", err);
            }
        };
        fetchCoins();
    }, []);

    const handleLoadMore = () => setVisible((prev) => prev + 10);

    return (
        <Paper sx={{ p: 2 }}>
            <Typography variant="h5" fontWeight="bold" mb={2}>
                📊 Market Overview
            </Typography>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Coin</b></TableCell>
                            <TableCell align="right"><b>Price</b></TableCell>
                            <TableCell align="right"><b>24h Change</b></TableCell>
                            <TableCell align="right"><b>Market Cap</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {coins.slice(0, visible).map((coin) => (
                            <TableRow key={coin.id}>
                                <TableCell>
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        width={25}
                                        style={{ marginRight: 10, verticalAlign: "middle" }}
                                    />
                                    {coin.name}
                                    {/* Chart button next to coin */}
                                    <Button
                                        size="small"
                                        sx={{ ml: 1 }}
                                        onClick={() => setSelectedCoin(coin.id)}
                                    >
                                        📈 Trend
                                    </Button>
                                </TableCell>
                                <TableCell align="right">${coin.current_price.toLocaleString()}</TableCell>
                                <TableCell
                                    align="right"
                                    style={{ color: coin.price_change_percentage_24h >= 0 ? "green" : "red" }}
                                >
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>
                                <TableCell align="right">${coin.market_cap.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Load More Button */}
            {visible < coins.length && (
                <div style={{ textAlign: "center", padding: "16px" }}>
                    <Button variant="contained" onClick={handleLoadMore} sx={{ borderRadius: 3 }}>
                        Load More
                    </Button>
                </div>
            )}

            {/* Chart Popup */}
            <Dialog
                open={!!selectedCoin}
                onClose={() => setSelectedCoin(null)}
                maxWidth="md"
                fullWidth
            >
                <DialogTitle>
                    {selectedCoin && selectedCoin.toUpperCase()} Trend
                    <IconButton
                        aria-label="close"
                        onClick={() => setSelectedCoin(null)}
                        sx={{ position: "absolute", right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {selectedCoin && <CoinChart coinId={selectedCoin} />}
                </DialogContent>
            </Dialog>
        </Paper>
    );
}

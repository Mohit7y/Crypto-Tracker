import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
} from "chart.js";
import { Box, Button, Typography } from "@mui/material";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function CoinChart({ coinId, currency = "usd" }) {
    const [prices, setPrices] = useState([]);
    const [days, setDays] = useState(30); // default: 1 month

    const ranges = [
        { label: "1M", value: 30 },
        { label: "3M", value: 90 },
        { label: "6M", value: 180 },
        { label: "1Y", value: 365 },
    ];

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await fetch(
                    `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=${days}`
                );
                const data = await res.json();
                setPrices(data.prices || []);
            } catch (err) {
                console.error("Error fetching chart:", err);
            }
        };
        if (coinId) fetchHistory();
    }, [coinId, currency, days]);

    const chartData = {
        labels: prices.map((p) => new Date(p[0]).toLocaleDateString()),
        datasets: [
            {
                label: `${coinId.toUpperCase()} Price (${currency.toUpperCase()})`,
                data: prices.map((p) => p[1]),
                borderColor: "#3f51b5",
                borderWidth: 2,
                tension: 0.25,
                fill: true,
                backgroundColor: "rgba(63, 81, 181, 0.1)",
            },
        ],
    };

    return (
        <Box>
            {/* Range Selector */}
            <Box display="flex" gap={1} justifyContent="center" mb={2}>
                {ranges.map((r) => (
                    <Button
                        key={r.value}
                        variant={days === r.value ? "contained" : "outlined"}
                        onClick={() => setDays(r.value)}
                    >
                        {r.label}
                    </Button>
                ))}
            </Box>

            {/* Chart */}
            {prices.length > 0 ? (
                <Line data={chartData} />
            ) : (
                <Typography variant="body2" color="textSecondary" align="center">
                    Loading chart...
                </Typography>
            )}
        </Box>
    );
}

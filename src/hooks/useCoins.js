import { useEffect, useState } from "react";

export function useCoins(currency = "usd", perPage = 50, page = 1) {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCoins = async () => {
            setLoading(true);
            const res = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${perPage}&page=${page}&sparkline=true`
            );
            const data = await res.json();
            setCoins(data);
            setLoading(false);
        };
        fetchCoins();
    }, [currency, page, perPage]);

    return { coins, loading };
}

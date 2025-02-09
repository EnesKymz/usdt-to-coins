"use client"
import Link from "next/link";
import { useEffect, useState } from "react";
import { useCoinContext } from "./context/pricingContext";
export default function Home() {
  const [usdt, setUsdt] = useState<number>();

  const coins = ["bitcoin", "pepe", "ethereum", "sui"]; // Coins
  const {coinPrices,setCoinPrices}=useCoinContext()
  useEffect(() => {
    const fetchCoinPrices = async () => {
      try {
        const responses = await Promise.all(
          coins.map((coin) =>
            fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`)
              .then((res) => {
                if(!res.ok) {
                  throw new Error(`Failed to fetch price for ${coin}`)
                }
                return res.json()
              })
              .then((data) => ({
                coin,
                price: data[coin]?.usd ? data[coin]?.usd : 0 ,
              })).catch((error) =>{
                console.error(error);
                return {coin, price:0};
              })
          )
        );
        
        const prices = responses.reduce((acc, { coin, price  }) => {
          acc[coin] = price > 0 ? price : 0;
          return acc;
        }, {} as { [key: string]: number });
        localStorage.setItem("prices",JSON.stringify(prices));
        setCoinPrices(prices);
      } catch (error) {
        console.error("Error fetching coin prices:", error);
      }
    };

    fetchCoinPrices();

    const intervalId = setInterval(fetchCoinPrices, 30000);

    return () => clearInterval(intervalId);
  }, [coinPrices,setCoinPrices,coins]);

  return (
    <div className="min-h-screen bg-orange-500 flex justify-center items-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">How much USDT do you have?</h2>
          <input
            type="number"
            placeholder="Enter amount"
            className="mt-4 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            onChange={(e) => setUsdt(Number(e.target.value))}
            value={usdt}
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 text-left">COIN</th>
                <th className="py-3 px-4 text-left">Value (USDT)</th>
                <th className="py-3 px-4 text-left">Adet</th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => {
                const coinPrice = coinPrices[coin];
                const adet = coinPrice ? (usdt ? usdt : 0) / coinPrice : 0;
                return (
                  <tr key={coin} className="border-b">
                    <td className="py-3 px-4 capitalize"><Link href={"https://www.tradingview.com/chart/AwoVUm3g/?symbol=BINANCE%3A"+coin.toUpperCase()+"USDT"} target="_blank">{coin}</Link></td>
                    <td className="py-3 px-4">{coinPrice ? `${coinPrice} USDT` : "Loading..."}</td>
                    <td className="py-3 px-4">{adet.toFixed(6)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

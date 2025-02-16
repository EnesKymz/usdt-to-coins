"use client"

export default function Home() {
  return (
    <div className="min-h-screen bg-orange-500 flex justify-center items-center p-4">
      <h5>QUANTUM CLUB LFGGGGG</h5>
    { /* <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl">
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
      </div>*/}
    </div>
  );
}

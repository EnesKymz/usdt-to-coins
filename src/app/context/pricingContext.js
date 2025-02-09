"use client";
import { useContext,useState,createContext } from "react";

const coinsContext = createContext();

export const CoinsProvider = ({children}) =>{
    const [coinPrices, setCoinPrices] = useState(()=>{if(typeof window !=="undefined"){return localStorage.getItem("prices")}else {return 0}});
    return (
        <coinsContext.Provider
        value={{
            coinPrices,setCoinPrices
        }}
        >
            {children}   
        </coinsContext.Provider>
    )
}

export const useCoinContext = ()=>{
    return useContext(coinsContext)
}
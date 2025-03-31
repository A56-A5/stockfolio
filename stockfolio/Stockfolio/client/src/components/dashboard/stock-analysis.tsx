import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StockChart from "@/components/dashboard/stock-chart";
import { TrendingUp } from "lucide-react";

interface StockDataProps {
  stockData: {
    symbol: string;
    name: string;
    price: number;
    change: number;
    open: number;
    high: number;
    low: number;
    volume: string;
    marketCap: string;
    peRatio: number;
    dividendYield: number;
    prediction: {
      outlook: string;
      forecast: string;
    }
  }
}

export default function StockAnalysis({ stockData }: StockDataProps) {
  // Mock chart data based on the stock
  const chartData = {
    symbol: stockData.symbol,
    data: [147, 148, 150, 149, 151, 153, 152, stockData.price]
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Stock Info */}
      <div className="md:col-span-1">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold">{stockData.symbol}</h3>
            <div className="text-gray-500">{stockData.name}</div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono font-bold">${stockData.price.toFixed(2)}</div>
            <div className={`font-mono ${stockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {stockData.change >= 0 ? '+' : ''}{stockData.change}% 
              ({stockData.change >= 0 ? '+$' : '-$'}{Math.abs(stockData.price * stockData.change / 100).toFixed(2)})
            </div>
          </div>
        </div>
        
        <div className="space-y-3 mt-6">
          <div className="flex justify-between">
            <span className="text-gray-600">Open</span>
            <span className="font-mono">${stockData.open.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">High</span>
            <span className="font-mono">${stockData.high.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Low</span>
            <span className="font-mono">${stockData.low.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Volume</span>
            <span className="font-mono">{stockData.volume}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Market Cap</span>
            <span className="font-mono">${stockData.marketCap}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">P/E Ratio</span>
            <span className="font-mono">{stockData.peRatio.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Dividend Yield</span>
            <span className="font-mono">{stockData.dividendYield}%</span>
          </div>
        </div>
        
        <div className="mt-6">
          <Button className="w-full">
            Add to Watchlist
          </Button>
        </div>
      </div>
      
      {/* Chart */}
      <div className="md:col-span-2">
        <StockChart chartData={chartData} />
        
        <div className="mt-6">
          <h3 className="font-semibold text-gray-800 mb-2">Prediction</h3>
          <div className={`${
            stockData.prediction.outlook === 'bullish' 
              ? 'bg-green-50 border-green-200' 
              : stockData.prediction.outlook === 'bearish'
              ? 'bg-red-50 border-red-200'
              : 'bg-yellow-50 border-yellow-200'
          } border rounded-lg p-4`}>
            <div className="flex items-center mb-2">
              <TrendingUp className={`mr-2 ${
                stockData.prediction.outlook === 'bullish'
                  ? 'text-green-500'
                  : stockData.prediction.outlook === 'bearish'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`} />
              <span className={`font-medium ${
                stockData.prediction.outlook === 'bullish'
                  ? 'text-green-500'
                  : stockData.prediction.outlook === 'bearish'
                  ? 'text-red-500'
                  : 'text-yellow-500'
              }`}>
                {stockData.prediction.outlook.charAt(0).toUpperCase() + stockData.prediction.outlook.slice(1)} Outlook
              </span>
            </div>
            <p className="text-gray-700">{stockData.prediction.forecast}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface WatchlistProps {
  stocks: Stock[];
  onSelectStock: (symbol: string) => void;
  selectedStock: string | null;
  className?: string;
}

export default function Watchlist({ stocks, onSelectStock, selectedStock, className = "" }: WatchlistProps) {
  return (
    <Card className={className}>
      <CardHeader className="py-4">
        <CardTitle className="text-base font-medium">Watchlist</CardTitle>
      </CardHeader>
      <CardContent className="p-2">
        <div className="space-y-1">
          {stocks.map((stock) => (
            <div 
              key={stock.symbol} 
              className={`flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors ${
                selectedStock === stock.symbol ? 'bg-primary-50' : ''
              }`}
              onClick={() => onSelectStock(stock.symbol)}
            >
              <div>
                <div className="font-medium">{stock.symbol}</div>
                <div className="text-xs text-gray-500">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium">${stock.price.toFixed(2)}</div>
                <div className={`text-xs font-mono ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </div>
              </div>
            </div>
          ))}

          {stocks.length === 0 && (
            <div className="py-4 text-center text-gray-500 text-sm">
              No stocks in watchlist
            </div>
          )}
          
          <Button variant="ghost" className="w-full mt-2 py-2 text-primary hover:bg-primary-50 rounded-lg text-sm flex items-center justify-center">
            <Plus className="h-4 w-4 mr-1" /> Add Stock
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

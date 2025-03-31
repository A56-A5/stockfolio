import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

interface StockListProps {
  title: string;
  stocks: Stock[];
}

export default function StockList({ title, stocks }: StockListProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stocks.map((stock, index) => (
            <div key={index} className="flex justify-between items-center border-b border-border pb-3">
              <div>
                <div className="font-medium text-foreground">{stock.symbol}</div>
                <div className="text-sm text-muted-foreground">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-mono font-medium text-foreground">${stock.price.toFixed(2)}</div>
                <div className={`font-mono ${stock.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {stock.change >= 0 ? '+' : ''}{stock.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

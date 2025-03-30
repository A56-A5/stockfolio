import { Card, CardContent } from "@/components/ui/card";

export default function MarketOverview() {
  // This would normally fetch data from API
  const indices = [
    { name: "S&P 500", value: 4682.85, change: 1.2 },
    { name: "NASDAQ", value: 15982.36, change: 0.8 },
    { name: "DOW JONES", value: 36124.23, change: -0.3 },
    { name: "RUSSELL 2000", value: 2287.67, change: 1.5 }
  ];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Market Overview</h3>
          <span className="text-sm text-gray-500">Last updated: Today, 2:30 PM</span>
        </div>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {indices.map((index, i) => (
            <div key={i} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium">{index.name}</span>
                <span className={`font-mono ${index.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {index.change >= 0 ? '+' : ''}{index.change}%
                </span>
              </div>
              <div className="text-xl font-semibold font-mono mt-2">{index.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <svg width="100%" height="200" viewBox="0 0 800 200" className="max-w-full">
            <path d="M0,150 C50,120 100,170 150,140 C200,110 250,130 300,120 C350,110 400,80 450,60 C500,40 550,70 600,50 C650,30 700,10 750,30 L750,200 L0,200 Z" fill="rgba(37, 99, 235, 0.1)" />
            <path d="M0,150 C50,120 100,170 150,140 C200,110 250,130 300,120 C350,110 400,80 450,60 C500,40 550,70 600,50 C650,30 700,10 750,30" fill="none" stroke="#2563eb" strokeWidth="2" className="chart-line" />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
}

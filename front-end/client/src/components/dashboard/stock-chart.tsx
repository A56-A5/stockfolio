import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ChartData {
  symbol: string;
  data: number[];
}

interface StockChartProps {
  chartData: ChartData;
  timeRanges?: string[];
}

export default function StockChart({ 
  chartData, 
  timeRanges = ["1D", "1W", "1M", "3M", "1Y", "5Y"] 
}: StockChartProps) {
  const [selectedRange, setSelectedRange] = useState("1D");

  // This is a simplified chart. In a real app, we'd use a library like Recharts
  const renderChart = () => {
    return (
      <svg width="100%" height="100%" viewBox="0 0 800 300" className="max-w-full">
        {/* Grid lines */}
        <line x1="0" y1="0" x2="0" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="0" x2="800" y2="0" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="75" x2="800" y2="75" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="150" x2="800" y2="150" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="225" x2="800" y2="225" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="0" y1="300" x2="800" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        
        <line x1="160" y1="0" x2="160" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="320" y1="0" x2="320" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="480" y1="0" x2="480" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="640" y1="0" x2="640" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        <line x1="800" y1="0" x2="800" y2="300" stroke="#e5e7eb" strokeWidth="1" />
        
        {/* Stock chart path */}
        <path d="M0,200 C50,180 100,220 150,190 C200,160 250,170 300,150 C350,130 400,110 450,80 C500,50 550,70 600,40 C650,30 700,10 750,30 L750,300 L0,300 Z" fill="rgba(37, 99, 235, 0.1)" />
        <path d="M0,200 C50,180 100,220 150,190 C200,160 250,170 300,150 C350,130 400,110 450,80 C500,50 550,70 600,40 C650,30 700,10 750,30" fill="none" stroke="#2563eb" strokeWidth="2" className="animate-draw" />
        
        {/* Chart labels */}
        <text x="0" y="320" fill="#6b7280" fontSize="10">9:30</text>
        <text x="155" y="320" fill="#6b7280" fontSize="10">10:30</text>
        <text x="315" y="320" fill="#6b7280" fontSize="10">11:30</text>
        <text x="475" y="320" fill="#6b7280" fontSize="10">12:30</text>
        <text x="635" y="320" fill="#6b7280" fontSize="10">13:30</text>
        <text x="780" y="320" fill="#6b7280" fontSize="10">14:30</text>
        
        <text x="805" y="0" fill="#6b7280" fontSize="10">$155</text>
        <text x="805" y="75" fill="#6b7280" fontSize="10">$153</text>
        <text x="805" y="150" fill="#6b7280" fontSize="10">$151</text>
        <text x="805" y="225" fill="#6b7280" fontSize="10">$149</text>
        <text x="805" y="300" fill="#6b7280" fontSize="10">$147</text>
      </svg>
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-2 mb-4">
          {timeRanges.map((range) => (
            <Button
              key={range}
              variant={selectedRange === range ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedRange(range)}
              className="text-xs px-3 py-1"
            >
              {range}
            </Button>
          ))}
        </div>
        
        <div className="h-64 w-full">
          {renderChart()}
        </div>
      </CardContent>
    </Card>
  );
}

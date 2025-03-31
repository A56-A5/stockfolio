import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { LogOut, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StockChart from "@/components/dashboard/stock-chart";
import Watchlist from "@/components/dashboard/watchlist";
import StockAnalysis from "@/components/dashboard/stock-analysis";

export default function DashboardPage() {
  const { user, logoutMutation } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStock, setSelectedStock] = useState<string | null>("AAPL");

  // Fetch market overview data
  const { data: marketData, isLoading: isLoadingMarket } = useQuery({
    queryKey: ["/api/market/overview"],
    queryFn: async () => {
      const res = await fetch("/api/market/overview", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch market data");
      }
      return await res.json();
    },
  });

  // Fetch stock data when selected
  const { data: stockData, isLoading: isLoadingStock } = useQuery({
    queryKey: ["/api/stock", selectedStock],
    queryFn: async () => {
      if (!selectedStock) return null;
      
      const res = await fetch(`/api/stock/${selectedStock}`, {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch stock data");
      }
      return await res.json();
    },
    enabled: !!selectedStock,
  });

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedStock(searchQuery.trim().toUpperCase());
      setSearchQuery("");
    }
  };

  const handleSelectStock = (symbol: string) => {
    setSelectedStock(symbol);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-xl font-bold text-gray-800">Stockfolio</span>
            </div>
            
            <div className="flex-1 max-w-xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="text"
                  placeholder="Search for stocks (e.g., AAPL, TSLA, AMZN)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-10"
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon"
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                </Button>
              </form>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-800 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-600 rounded-full text-white text-xs flex items-center justify-center">3</span>
              </button>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{user?.fullName}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                {user?.fullName.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={() => logoutMutation.mutate()}
                className="text-gray-500 hover:text-gray-700"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-3 xl:col-span-2">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">Navigation</CardTitle>
              </CardHeader>
              <CardContent className="p-2">
                <div className="space-y-1">
                  <Button variant="secondary" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    Dashboard
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                    Portfolio
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Stock Screener
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                    News
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                    Alerts
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                    </svg>
                    Learning
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg className="mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Watchlist 
              className="mt-6" 
              stocks={marketData?.topGainers.concat(marketData?.topLosers).slice(0, 4) || []}
              onSelectStock={handleSelectStock}
              selectedStock={selectedStock}
            />
          </div>
          
          {/* Main Content */}
          <div className="col-span-12 md:col-span-9 xl:col-span-10">
            {/* Market Overview */}
            <Card className="mb-6">
              <CardHeader className="py-4">
                <CardTitle className="text-base font-medium">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingMarket ? (
                  <div className="grid md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, index) => (
                      <div key={index} className="h-24 bg-gray-100 animate-pulse rounded-lg"></div>
                    ))}
                  </div>
                ) : (
                  <div className="grid md:grid-cols-4 gap-4">
                    {marketData?.indices.map((index, i) => (
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
                )}
              </CardContent>
            </Card>
            
            {/* Stock Analysis */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <Card className="md:col-span-3">
                <CardHeader className="py-4">
                  <CardTitle className="text-base font-medium">
                    {isLoadingStock ? 'Loading Stock Analysis...' : `Stock Analysis: ${stockData?.name} (${stockData?.symbol})`}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoadingStock ? (
                    <div className="h-80 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                  ) : stockData ? (
                    <StockAnalysis stockData={stockData} />
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>Select a stock to view analysis</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            {/* Bottom Section */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Recent Searches */}
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base font-medium">Recent Searches</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                       onClick={() => setSelectedStock("AAPL")}>
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">AAPL (Apple Inc.)</div>
                      <div className="text-xs text-gray-500">Searched 2 hours ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                       onClick={() => setSelectedStock("MSFT")}>
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">MSFT (Microsoft Corp.)</div>
                      <div className="text-xs text-gray-500">Searched 1 day ago</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                       onClick={() => setSelectedStock("TSLA")}>
                    <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium">TSLA (Tesla Inc.)</div>
                      <div className="text-xs text-gray-500">Searched 2 days ago</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Top Gainers */}
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base font-medium">Top Gainers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoadingMarket ? (
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="h-12 bg-gray-100 animate-pulse rounded-lg"></div>
                    ))
                  ) : (
                    marketData?.topGainers.map((stock, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => setSelectedStock(stock.symbol)}
                      >
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-xs text-gray-500">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium">${stock.price.toFixed(2)}</div>
                          <div className="text-green-500 font-mono">+{stock.change}%</div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
              
              {/* Top Losers */}
              <Card>
                <CardHeader className="py-4">
                  <CardTitle className="text-base font-medium">Top Losers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoadingMarket ? (
                    [...Array(3)].map((_, index) => (
                      <div key={index} className="h-12 bg-gray-100 animate-pulse rounded-lg"></div>
                    ))
                  ) : (
                    marketData?.topLosers.map((stock, index) => (
                      <div 
                        key={index} 
                        className="flex justify-between items-center p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                        onClick={() => setSelectedStock(stock.symbol)}
                      >
                        <div>
                          <div className="font-medium">{stock.symbol}</div>
                          <div className="text-xs text-gray-500">{stock.name}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-mono font-medium">${stock.price.toFixed(2)}</div>
                          <div className="text-red-500 font-mono">{stock.change}%</div>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

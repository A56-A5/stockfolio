import { Link } from "wouter";
import Navbar from "@/components/layout/navbar";
import MarketOverview from "@/components/home/market-overview";
import FeatureCard from "@/components/home/feature-card";
import StockList from "@/components/home/stock-list";
import { ChartPie, GraduationCap, ShieldCheck } from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <ChartPie className="text-primary" />,
      title: "Advanced Analytics",
      description: "Leverage machine learning algorithms to predict stock movements with higher accuracy."
    },
    {
      icon: <GraduationCap className="text-primary" />,
      title: "Education First",
      description: "Learn as you go with our comprehensive onboarding and educational resources."
    },
    {
      icon: <ShieldCheck className="text-primary" />,
      title: "Risk Management",
      description: "Understand potential risks and get alerts when your portfolio needs attention."
    }
  ];

  const topGainers = [
    { symbol: "AAPL", name: "Apple Inc.", price: 152.37, change: 3.5 },
    { symbol: "TSLA", name: "Tesla Inc.", price: 891.14, change: 2.8 },
    { symbol: "NVDA", name: "NVIDIA Corp.", price: 298.46, change: 2.3 }
  ];

  const topLosers = [
    { symbol: "FB", name: "Meta Platforms Inc.", price: 324.17, change: -2.1 },
    { symbol: "NFLX", name: "Netflix Inc.", price: 672.93, change: -1.8 },
    { symbol: "BA", name: "Boeing Co.", price: 213.74, change: -1.5 }
  ];

  // Removed testimonials

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary-700 text-white py-16 pt-28">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Smart Stock Predictions for Smart Investors</h1>
              <p className="text-lg mb-8">Get insights, learn strategies, and make informed decisions with Stockfolio's powerful prediction tools.</p>
              <Link href="/auth">
                <a className="inline-block px-6 py-3 rounded-lg bg-white text-primary hover:bg-gray-100 transition-colors text-lg font-semibold border-2 border-white">
                  Get Started Free
                </a>
              </Link>
            </div>
            <div className="flex justify-center">
              <svg className="w-full max-w-md" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="500" height="400" rx="12" fill="#ffffff" fillOpacity="0.1" />
                <path d="M50,300 C100,250 150,350 200,280 C250,210 300,240 350,150 C400,60 450,100 500,50" 
                      stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="200" cy="280" r="8" fill="#ffffff" />
                <circle cx="350" cy="150" r="8" fill="#ffffff" />
                <path d="M50,350 C100,330 150,370 200,340 C250,310 300,320 350,300 C400,280 450,260 500,240" 
                      stroke="#ffffff" strokeWidth="2" strokeDasharray="5 5" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why Choose Stockfolio</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard 
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Market Trends Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Current Market Trends</h2>
          
          <MarketOverview />
          
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <StockList title="Top Gainers" stocks={topGainers} />
            <StockList title="Top Losers" stocks={topLosers} />
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Investment Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Join thousands of investors who are already using Stockfolio to make smarter investment decisions.</p>
          <Link href="/auth">
            <a className="inline-block px-8 py-3 bg-white text-primary rounded-lg hover:bg-gray-100 transition-colors text-lg font-semibold border-2 border-white">
              Sign Up Now — It's Free
            </a>
          </Link>
        </div>
      </section>
    </div>
  );
}

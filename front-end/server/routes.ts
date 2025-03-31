import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { updateOnboardingProgressSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Onboarding progress routes
  app.get("/api/onboarding/progress", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const progress = await storage.getOnboardingProgress(req.user.id);
      
      if (!progress) {
        // Initialize progress for the user if not found
        const newProgress = await storage.createOnboardingProgress({
          userId: req.user.id,
          module1Progress: 0,
          module2Progress: 0,
          module3Progress: 0,
          module4Progress: 0,
        });
        return res.status(200).json(newProgress);
      }
      
      return res.status(200).json(progress);
    } catch (error) {
      console.error("Error fetching onboarding progress:", error);
      return res.status(500).json({ message: "Failed to fetch onboarding progress" });
    }
  });

  app.post("/api/onboarding/progress", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    try {
      const data = updateOnboardingProgressSchema.parse(req.body);
      const updatedProgress = await storage.updateOnboardingProgress(
        req.user.id,
        data.module,
        data.progress
      );
      
      // Check if all modules are completed
      if (
        updatedProgress.module1Progress === 10 &&
        updatedProgress.module2Progress === 10 &&
        updatedProgress.module3Progress === 10 &&
        updatedProgress.module4Progress === 10
      ) {
        // Update user's onboarding status
        await storage.updateUserOnboardingStatus(req.user.id, true);
      }
      
      return res.status(200).json(updatedProgress);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating onboarding progress:", error);
      return res.status(500).json({ message: "Failed to update onboarding progress" });
    }
  });

  // Stock market mock data API
  app.get("/api/market/overview", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const marketData = {
      indices: [
        { name: "S&P 500", value: 4682.85, change: 1.2 },
        { name: "NASDAQ", value: 15982.36, change: 0.8 },
        { name: "DOW JONES", value: 36124.23, change: -0.3 },
        { name: "RUSSELL 2000", value: 2287.67, change: 1.5 }
      ],
      topGainers: [
        { symbol: "AAPL", name: "Apple Inc.", price: 152.37, change: 3.5 },
        { symbol: "TSLA", name: "Tesla Inc.", price: 891.14, change: 2.8 },
        { symbol: "NVDA", name: "NVIDIA Corp.", price: 298.46, change: 2.3 }
      ],
      topLosers: [
        { symbol: "FB", name: "Meta Platforms Inc.", price: 324.17, change: -2.1 },
        { symbol: "NFLX", name: "Netflix Inc.", price: 672.93, change: -1.8 },
        { symbol: "BA", name: "Boeing Co.", price: 213.74, change: -1.5 }
      ]
    };

    return res.status(200).json(marketData);
  });

  app.get("/api/stock/:symbol", (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { symbol } = req.params;
    const symbolUppercase = symbol.toUpperCase();
    
    // Mock stock data for demonstration
    const stockData = {
      AAPL: {
        symbol: "AAPL",
        name: "Apple Inc.",
        price: 152.37,
        change: 3.5,
        open: 147.23,
        high: 153.42,
        low: 146.87,
        volume: "78.42M",
        marketCap: "2.48T",
        peRatio: 26.78,
        dividendYield: 0.62,
        prediction: {
          outlook: "bullish",
          forecast: "Our AI analysis predicts a potential 8-12% price increase over the next 3 months, based on positive earnings growth, new product launches, and favorable market conditions."
        }
      },
      MSFT: {
        symbol: "MSFT",
        name: "Microsoft Corp.",
        price: 287.70,
        change: 1.2,
        open: 285.23,
        high: 288.42,
        low: 284.87,
        volume: "22.15M",
        marketCap: "2.15T",
        peRatio: 32.18,
        dividendYield: 0.83,
        prediction: {
          outlook: "bullish",
          forecast: "Expected 5-7% growth over the next quarter with continued cloud services expansion and enterprise software adoption."
        }
      },
      TSLA: {
        symbol: "TSLA",
        name: "Tesla Inc.",
        price: 891.14,
        change: 2.8,
        open: 867.23,
        high: 894.42,
        low: 865.87,
        volume: "19.78M",
        marketCap: "896.24B",
        peRatio: 176.26,
        dividendYield: 0,
        prediction: {
          outlook: "neutral",
          forecast: "Facing supply chain challenges but strong long-term growth potential with expansion into new markets and energy solutions."
        }
      }
    };
    
    const stock = stockData[symbolUppercase];
    
    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    return res.status(200).json(stock);
  });

  const httpServer = createServer(app);

  return httpServer;
}

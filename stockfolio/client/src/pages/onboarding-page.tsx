import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Progress } from "@/components/ui/progress";
import { LogOut } from "lucide-react";
import ModuleCard from "@/components/onboarding/module-card";
import SlideModal from "@/components/onboarding/slide-modal";

const moduleData = [
  {
    id: 1,
    title: "Basics of Finance",
    description: "Learn fundamental financial concepts, terminology, and principles for smart investing.",
    imageUrl: "https://images.unsplash.com/photo-1565514020179-026b5cfd231f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    slides: [
      {
        title: "Introduction to Finance",
        content: "Finance is the study of money management and the process of acquiring needed funds. It encompasses the oversight, creation, and study of money, banking, credit, investments, assets, and liabilities."
      },
      {
        title: "Financial Statements",
        content: "Learn to understand and analyze key financial statements: income statements, balance sheets, and cash flow statements - the foundation of financial analysis."
      },
      {
        title: "Time Value of Money",
        content: "Understanding that a dollar today is worth more than a dollar tomorrow is essential for making good investment decisions."
      },
      {
        title: "Risk and Return",
        content: "The fundamental relationship between risk and return - generally, higher returns require taking higher risks."
      },
      {
        title: "Compound Interest",
        content: "The eighth wonder of the world. Learn how compound interest helps your money grow exponentially over time."
      },
      {
        title: "Inflation",
        content: "Understand how inflation affects your purchasing power and why it's important to consider in your investment strategy."
      },
      {
        title: "Diversification",
        content: "Don't put all your eggs in one basket. Learn how to spread risk across different investments."
      },
      {
        title: "Asset Classes",
        content: "An introduction to different asset classes like stocks, bonds, cash, real estate, and commodities."
      },
      {
        title: "Financial Goals",
        content: "Setting clear, achievable financial goals is the first step to successful financial planning."
      },
      {
        title: "Budgeting Basics",
        content: "Building a budget is the foundation of good financial health. Learn how to track income, expenses and save effectively."
      }
    ],
    field: "module1Progress"
  },
  {
    id: 2,
    title: "Financial Stability",
    description: "Understand how to build a solid financial foundation before investing in stocks.",
    imageUrl: "https://images.unsplash.com/photo-1579621970590-9d624316904b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    slides: [
      {
        title: "Emergency Fund",
        content: "Learn why having 3-6 months of expenses saved is crucial before investing in the stock market."
      },
      {
        title: "Debt Management",
        content: "Understand strategies for managing and reducing high-interest debt before allocating funds to investments."
      },
      {
        title: "Insurance Coverage",
        content: "Protect your financial assets with appropriate insurance - health, life, property, and liability coverage."
      },
      {
        title: "Retirement Accounts",
        content: "Explore different retirement accounts (401(k), IRA, Roth) and their tax advantages for long-term investing."
      },
      {
        title: "Tax Efficiency",
        content: "Understanding how taxes impact your investments and strategies to minimize tax burden."
      },
      {
        title: "Income Stability",
        content: "Assess your income sources and learn strategies for creating multiple income streams."
      },
      {
        title: "Solvency Ratios",
        content: "Financial metrics that help you understand your debt-to-asset and debt-to-income relationships."
      },
      {
        title: "Lifestyle Inflation",
        content: "Avoiding the trap of increasing spending as income increases, allowing more funds for investments."
      },
      {
        title: "Financial Risk Assessment",
        content: "Identifying potential financial risks in your life and strategies to mitigate them."
      },
      {
        title: "Building Financial Resilience",
        content: "Creating a financial safety net that can withstand unexpected events and market downturns."
      }
    ],
    field: "module2Progress"
  },
  {
    id: 3,
    title: "Basics of Stock",
    description: "Discover how stocks work, what influences their prices, and different investment strategies.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    slides: [
      {
        title: "What is a Stock?",
        content: "Understanding stocks as ownership shares in companies and how the stock market functions."
      },
      {
        title: "Stock Market Exchanges",
        content: "Learn about major exchanges like NYSE and NASDAQ and how stocks are bought and sold."
      },
      {
        title: "Stock Valuation Methods",
        content: "Introduction to fundamental analysis, technical analysis, and key valuation metrics."
      },
      {
        title: "Market Orders vs. Limit Orders",
        content: "Different types of orders when buying or selling stocks and when to use each one."
      },
      {
        title: "Bull vs. Bear Markets",
        content: "Understand market trends, bull (rising) and bear (falling) markets, and their characteristics."
      },
      {
        title: "Dividends and Yields",
        content: "How companies distribute profits to shareholders and the importance of dividend yields."
      },
      {
        title: "Stock Sectors and Industries",
        content: "Understanding the classification of stocks by sectors and industries for better portfolio building."
      },
      {
        title: "Growth vs. Value Investing",
        content: "Two primary investment philosophies and how they differ in approach and outcomes."
      },
      {
        title: "Stock Market Indices",
        content: "Understanding major indices like S&P 500, Dow Jones, and NASDAQ Composite as market benchmarks."
      },
      {
        title: "Long-term vs. Short-term Strategies",
        content: "Different time horizons for stock investing and appropriate strategies for each."
      }
    ],
    field: "module3Progress"
  },
  {
    id: 4,
    title: "How to Avoid Scams",
    description: "Learn to identify red flags, common investment scams, and protect yourself in the market.",
    imageUrl: "https://images.unsplash.com/photo-1563986768711-b3bde3dc821e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    slides: [
      {
        title: "Common Investment Scams",
        content: "Recognizing Ponzi schemes, pump and dump schemes, and other common financial frauds."
      },
      {
        title: "Too Good to Be True",
        content: "If returns sound unrealistic, they probably are. Learn to identify unrealistic investment promises."
      },
      {
        title: "Research Before Investing",
        content: "The importance of thorough research and due diligence before committing to any investment."
      },
      {
        title: "Warning Signs and Red Flags",
        content: "Key indicators that an investment opportunity might be fraudulent or highly risky."
      },
      {
        title: "Unregistered Investments",
        content: "Understanding the risks of unregistered investment products and how to verify registration."
      },
      {
        title: "Pressure Tactics",
        content: "Be wary of high-pressure sales tactics and 'act now' offers in the investment world."
      },
      {
        title: "Verification of Financial Professionals",
        content: "How to check the credentials and background of financial advisors and brokers."
      },
      {
        title: "Online Security for Investors",
        content: "Protecting your investment accounts from hackers and cybercriminals."
      },
      {
        title: "Reporting Fraud",
        content: "How to report suspected investment fraud to appropriate regulatory bodies."
      },
      {
        title: "Building a Trustworthy Financial Team",
        content: "Finding legitimate financial advisors, accountants, and other professionals to help with investments."
      }
    ],
    field: "module4Progress"
  }
];

export default function OnboardingPage() {
  const { user, logoutMutation } = useAuth();
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentModule, setCurrentModule] = useState<number | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch onboarding progress
  const { data: progress, isLoading } = useQuery({
    queryKey: ["/api/onboarding/progress"],
    queryFn: async () => {
      const res = await fetch("/api/onboarding/progress", {
        credentials: "include",
      });
      if (!res.ok) {
        throw new Error("Failed to fetch onboarding progress");
      }
      return await res.json();
    },
  });

  // Update progress mutation
  const updateProgressMutation = useMutation({
    mutationFn: async ({ module, progress }: { module: string; progress: number }) => {
      const res = await apiRequest("POST", "/api/onboarding/progress", {
        module,
        progress,
      });
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["/api/onboarding/progress"], data);
      
      // Check if all modules are completed
      if (
        data.module1Progress === 10 &&
        data.module2Progress === 10 &&
        data.module3Progress === 10 &&
        data.module4Progress === 10
      ) {
        toast({
          title: "Congratulations!",
          description: "You've completed all the onboarding modules. Redirecting to dashboard...",
        });
        
        // Fetch updated user data
        queryClient.invalidateQueries({ queryKey: ["/api/user"] });
        
        // Give a moment to show the toast
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update progress: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Calculate total progress
  const totalProgress = progress ? 
    ((progress.module1Progress + progress.module2Progress + 
      progress.module3Progress + progress.module4Progress) / 40) * 100 : 0;

  const handleStartModule = (moduleId: number) => {
    if (!progress) return;
    
    const targetModule = moduleData.find(m => m.id === moduleId);
    if (!targetModule) return;
    
    // Check if previous modules are completed
    if (moduleId > 1) {
      const prevModuleField = moduleData.find(m => m.id === moduleId - 1)?.field;
      if (prevModuleField && progress[prevModuleField] < 10) {
        toast({
          title: "Module Locked",
          description: "You need to complete the previous module first",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Set current slide to the last viewed slide for in-progress modules
    // For completed modules (review mode), start at the beginning
    const currentProgress = progress[targetModule.field];
    const isModuleCompleted = currentProgress === 10;
    
    // If we're reviewing a completed module, start at slide 0
    setCurrentSlide(isModuleCompleted ? 0 : currentProgress);
    setCurrentModule(moduleId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentModule(null);
    setCurrentSlide(0);
  };

  const handleCompleteSlide = () => {
    if (currentModule === null || !progress) return;
    
    const targetModule = moduleData.find(m => m.id === currentModule);
    if (!targetModule) return;
    
    const moduleField = targetModule.field;
    const isReviewMode = progress[moduleField] === 10;
    
    // Only update progress if not in review mode
    if (!isReviewMode) {
      const newProgress = Math.max(progress[moduleField], currentSlide + 1);
      
      updateProgressMutation.mutate({
        module: moduleField,
        progress: newProgress,
      });
    }
    
    if (currentSlide < 9) {
      setCurrentSlide(prev => prev + 1);
    } else {
      handleCloseModal();
      
      // Show appropriate message based on mode
      toast({
        title: isReviewMode ? "Review Completed" : "Module Completed!",
        description: isReviewMode 
          ? `You've reviewed the "${targetModule.title}" module.`
          : `You've completed the "${targetModule.title}" module.`,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background shadow-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-xl font-bold text-foreground">Stockfolio</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-medium">{user?.fullName}</span>
              </div>
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-foreground">
                {user?.fullName.charAt(0).toUpperCase()}
              </div>
              <button 
                onClick={() => logoutMutation.mutate()}
                className="text-muted-foreground hover:text-foreground"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to Your Financial Journey</h1>
          <p className="text-muted-foreground">Complete these modules to unlock your dashboard and start analyzing stocks.</p>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-muted-foreground mb-2">
            <span>Your Progress</span>
            <span>{Math.round(totalProgress)}% Complete</span>
          </div>
          <Progress value={totalProgress} className="h-2.5" />
        </div>
        
        {/* Modules */}
        <div className="grid md:grid-cols-2 gap-6">
          {moduleData.map((module) => (
            <ModuleCard
              key={module.id}
              module={module}
              progress={progress ? progress[module.field] : 0}
              isLocked={
                module.id > 1 && 
                progress && 
                progress[moduleData.find(m => m.id === module.id - 1)?.field || ""] < 10
              }
              onStart={() => handleStartModule(module.id)}
            />
          ))}
        </div>
      </div>

      {/* Slide Modal */}
      {modalOpen && currentModule !== null && (
        <SlideModal
          module={moduleData.find(m => m.id === currentModule)!}
          currentSlide={currentSlide}
          onClose={handleCloseModal}
          onNext={handleCompleteSlide}
          onPrevious={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
        />
      )}
    </div>
  );
}

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
    imageUrl: "https://img.freepik.com/free-vector/illustration-financial-concept_53876-37658.jpg?t=st=1743441798~exp=1743445398~hmac=9ffa899faf6bde352ef17dfd6619e2c4c491da0cdf6f5ef6610ed0805be1024d&w=1060",
    slides: [
      {
        title: "What is Money?",
        content: "Money is a medium of exchange that allows people to trade goods and services efficiently."
      },
      {
        title: "Income vs. Expenses",
        content: "Income is what you earn, while expenses are what you spend; the difference between them determines your financial health."
      },
      {
        title: "Assets vs. Liabilities",
        content: "Assets put money in your pocket over time, while liabilities take money out of your pocket."
      },
      {
        title: "Inflation",
        content: "Inflation is the gradual increase in prices over time, which reduces your money's purchasing power."
      },
      {
        title: "Interest",
        content: "Interest is either the cost of borrowing money or the reward for saving it, expressed as a percentage."
      },
      {
        title: "Compound Interest",
        content: "Compound interest is interest earned on both principal and previously accumulated interest, creating exponential growth."
      },
      {
        title: "Credit Score",
        content: "Your credit score is a numerical representation of your creditworthiness, affecting your ability to borrow money."
      },
      {
        title: "Budgeting",
        content: "Budgeting is planning how to spend your money to ensure you can meet your financial goals."
      },
      {
        title: "Debt Management",
        content: "Managing debt involves understanding the terms, minimizing interest costs, and having a repayment plan."
      },
      {
        title: "Financial Statements",
        content: "Financial statements like income statements and balance sheets help track your money and financial position."
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
        title: "What is Investing?",
        content: "Investing means putting money into assets with the expectation of generating income or profit over time."
      },
      {
        title: "Risk vs. Return",
        content: "Higher potential returns generally come with higher risks; understanding this relationship is crucial for investment decisions."
      },
      {
        title: "Diversification",
        content: "Spreading investments across different assets helps reduce risk by not putting all your eggs in one basket."
      },
      {
        title: "Stocks",
        content: "Stocks represent ownership in a company and allow you to participate in its growth and profits."
      },
      {
        title: "Bonds",
        content: "Bonds are loans to companies or governments that pay regular interest and return the principal at maturity."
      },
      {
        title: "Mutual Funds",
        content: "Mutual funds pool money from many investors to purchase a diversified portfolio managed by professionals."
      },
      {
        title: "ETFs (Exchange-Traded Funds)",
        content: "ETFs are baskets of securities that trade like individual stocks while offering diversification benefits."
      },
      {
        title: "Market Indices",
        content: "Indices like the S&P 500 track the performance of specific market segments and serve as benchmarks."
      },
      {
        title: "Dollar-Cost Averaging",
        content: "Investing fixed amounts at regular intervals regardless of market conditions helps reduce the impact of volatility."
      },
      {
        title: "Long-Term vs. Short-Term Investing",
        content: "Long-term investing typically reduces risk and allows compound returns to work in your favor."
      }
    ],
    field: "module2Progress"
  },
  {
    id: 3,
    title: "Financial Stability",
    description: "Build a strong foundation with practical habits and safeguards before investing your money.",
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    slides: [
      {
        title: "Emergency Fund",
        content: "An emergency fund covering 3-6 months of expenses provides a financial safety net for unexpected situations."
      },
      {
        title: "Debt-to-Income Ratio",
        content: "Keep your debt-to-income ratio below 36% to maintain financial health and qualify for favorable loan terms."
      },
      {
        title: "Living Below Your Means",
        content: "Spending less than you earn is the foundation of financial stability and wealth building."
      },
      {
        title: "Financial Goal Setting",
        content: "Setting SMART financial goals gives direction to your money management and investment decisions."
      },
      {
        title: "Insurance Protection",
        content: "Proper insurance protects your financial stability from catastrophic events like accidents, illness, or disasters."
      },
      {
        title: "Retirement Planning",
        content: "Start retirement planning early to benefit from compound growth and ensure financial security in later years."
      },
      {
        title: "Tax Efficiency",
        content: "Understanding tax implications of financial decisions helps preserve wealth and maximize investment returns."
      },
      {
        title: "Regular Financial Review",
        content: "Periodically reviewing your financial position helps you stay on track and make necessary adjustments."
      },
      {
        title: "Financial Independence",
        content: "Financial independence means having enough passive income to cover your expenses without working."
      },
      {
        title: "Wealth Preservation",
        content: "Once wealth is built, preserving it becomes as important as growing it through risk management strategies."
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
        title: "If It Sounds Too Good to Be True...",
        content: "Promises of extraordinary returns with minimal risk are almost always scams; realistic investments have realistic returns."
      },
      {
        title: "Verify Credentials",
        content: "Always verify the credentials and registrations of financial advisors and investment platforms with regulatory bodies."
      },
      {
        title: "Research Before Investing",
        content: "Never invest in companies or products you don't understand; thorough research is your first line of defense."
      },
      {
        title: "Beware of High-Pressure Tactics",
        content: "Legitimate investments don't need high-pressure sales tactics or artificial time constraints to force quick decisions."
      },
      {
        title: "Check for Transparency",
        content: "Legitimate investment opportunities provide clear information about fees, risks, and how your money will be used."
      },
      {
        title: "Protect Personal Information",
        content: "Be cautious with personal and financial information; scammers often use this to commit identity theft."
      },
      {
        title: "Recognize Phishing Attempts",
        content: "Verify communications claiming to be from financial institutions by contacting them directly through official channels."
      },
      {
        title: "Be Wary of Unsolicited Offers",
        content: "Approach unsolicited investment opportunities with extreme caution, especially those from unknown sources."
      },
      {
        title: "Red Flags in Investment Opportunities",
        content: "Watch for unregistered investments, complicated strategies, guaranteed returns, and secretive or exclusive offerings."
      },
      {
        title: "Report Suspicious Activity",
        content: "If you encounter a potential scam, report it to appropriate financial regulatory authorities to protect others."
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
    
    // Always start at slide 0 for review mode
    setCurrentSlide(isModuleCompleted ? 0 : currentProgress);
    setCurrentModule(moduleId);
    setModalOpen(true);
    
    // For completed modules, show a message that we're in review mode
    if (isModuleCompleted) {
      toast({
        title: "Review Mode",
        description: `You're reviewing the "${targetModule.title}" module.`,
      });
    }
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
      // Move to next slide regardless of mode
      setCurrentSlide(prev => prev + 1);
    } else {
      // We've reached the end of the module
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
          <p className="text-muted-foreground">Complete these educational modules to unlock your dashboard and start analyzing stocks. We believe everyone, regardless of income level, deserves access to financial knowledge.</p>
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

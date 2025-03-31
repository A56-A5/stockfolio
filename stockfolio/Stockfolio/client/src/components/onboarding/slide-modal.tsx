import { Button } from "@/components/ui/button";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

interface Slide {
  title: string;
  content: string;
}

interface SlideModalProps {
  module: {
    title: string;
    slides: Slide[];
  };
  currentSlide: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function SlideModal({ module, currentSlide, onClose, onNext, onPrevious }: SlideModalProps) {
  const slide = module.slides[currentSlide];
  const isLastSlide = currentSlide === module.slides.length - 1;
  
  // Get a default icon based on module title if no specific match
  const getDefaultIcon = () => {
    if (module.title.includes("Finance")) return "💲";
    if (module.title.includes("Financial")) return "📈";
    if (module.title.includes("Stock")) return "📊";
    if (module.title.includes("Scams")) return "🛑";
    return "📚"; // Fallback icon
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative w-full max-w-4xl bg-background rounded-lg shadow-xl border border-border">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b border-border p-4">
          <div>
            <h3 className="text-xl font-bold text-foreground">{module.title}</h3>
            <div className="text-sm text-muted-foreground">Slide {currentSlide + 1} of {module.slides.length}</div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Slide Content */}
        <div className="p-6 h-96 overflow-y-auto">
          <div className="w-full">
            <h2 className="text-2xl font-bold mb-4 text-foreground">{slide.title}</h2>
            <p className="mb-4 text-foreground">{slide.content}</p>
            
            {/* Slide illustrations based on the module and slide */}
            <div className="rounded-lg bg-gradient-to-br from-primary/5 to-primary/20 h-40 flex items-center justify-center mb-4 overflow-hidden">
              <div className="text-foreground flex flex-col items-center">
                <div className="text-4xl mb-2">
                  {/* Financial icons based on slide content */}
                  {slide.title.includes("Finance") ? "📊" :
                  slide.title.includes("Financial") ? "💹" :
                  slide.title.includes("Money") ? "💵" :
                  slide.title.includes("Risk") ? "⚠️" :
                  slide.title.includes("Interest") ? "📈" :
                  slide.title.includes("Inflation") ? "🔥" :
                  slide.title.includes("Diversification") ? "🔄" :
                  slide.title.includes("Asset") ? "🏢" :
                  slide.title.includes("Goals") ? "🎯" :
                  slide.title.includes("Budget") ? "📝" :
                  slide.title.includes("Emergency") ? "🚨" :
                  slide.title.includes("Debt") ? "💰" :
                  slide.title.includes("Insurance") ? "🛡️" :
                  slide.title.includes("Retirement") ? "🏖️" :
                  slide.title.includes("Tax") ? "📋" :
                  slide.title.includes("Income") ? "💸" :
                  slide.title.includes("Lifestyle") ? "🏠" :
                  slide.title.includes("Stock") ? "📊" :
                  slide.title.includes("Market") ? "🏛️" :
                  slide.title.includes("Valuation") ? "🧮" :
                  slide.title.includes("Orders") ? "📋" :
                  slide.title.includes("Bull") ? "🐂" :
                  slide.title.includes("Bear") ? "🐻" :
                  slide.title.includes("Dividends") ? "💲" :
                  slide.title.includes("Sectors") ? "🏭" :
                  slide.title.includes("Growth") ? "🌱" :
                  slide.title.includes("Value") ? "💎" :
                  slide.title.includes("Indices") ? "📉" :
                  slide.title.includes("Scams") ? "🚫" :
                  slide.title.includes("Too Good") ? "🎭" :
                  slide.title.includes("Research") ? "🔍" :
                  slide.title.includes("Warning") ? "⚠️" :
                  slide.title.includes("Pressure") ? "⏱️" :
                  slide.title.includes("Verification") ? "✅" :
                  slide.title.includes("Security") ? "🔒" :
                  slide.title.includes("Fraud") ? "🚨" :
                  slide.title.includes("Trustworthy") ? "🤝" :
                  getDefaultIcon()}
                </div>
                <p className="text-center text-sm text-muted-foreground px-4">
                  {slide.title}
                </p>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              Remember that understanding these concepts is crucial for making informed investment decisions.
            </p>
          </div>
        </div>
        
        {/* Modal Footer */}
        <div className="flex justify-between items-center border-t border-border p-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentSlide === 0}
            className={currentSlide === 0 ? 'invisible' : ''}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          
          <div className="flex space-x-1">
            {module.slides.map((_, index) => (
              <div 
                key={index} 
                className={`w-2 h-2 rounded-full ${
                  index === currentSlide ? 'bg-primary' : 
                  index < currentSlide ? 'bg-primary/60' : 'bg-muted'
                }`}
              ></div>
            ))}
          </div>
          
          <Button onClick={onNext}>
            {currentSlide < module.slides.length - 1 ? (
              <>Next <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              'Complete'
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

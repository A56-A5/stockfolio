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
            
            {/* This would contain images or interactive elements in a real app */}
            <div className="rounded-lg bg-muted h-40 flex items-center justify-center text-muted-foreground mb-4">
              Slide content illustration
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

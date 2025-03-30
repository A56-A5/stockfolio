import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Lock } from "lucide-react";

interface ModuleProps {
  module: {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
  };
  progress: number;
  isLocked: boolean;
  onStart: () => void;
}

export default function ModuleCard({ module, progress, isLocked, onStart }: ModuleProps) {
  const progressPercentage = (progress / 10) * 100;

  return (
    <div className={`bg-card rounded-xl shadow-md overflow-hidden border border-border hover:shadow-lg transition-shadow ${isLocked ? 'opacity-75' : ''}`}>
      <div className="relative">
        <div className="h-48 bg-muted">
          {/* In a real app, we'd use the actual image */}
          <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
            Module Image
          </div>
        </div>
        <div className="absolute top-3 right-3 bg-background rounded-full p-2 shadow">
          <div className="text-xs font-medium text-muted-foreground">{progress}/10</div>
        </div>
        {isLocked && (
          <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
            <Lock className="h-12 w-12 text-foreground opacity-75" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">{module.title}</h2>
        <p className="text-muted-foreground mb-4">{module.description}</p>
        
        {progress > 0 && progress < 10 && (
          <div className="mb-4">
            <div className="text-xs text-muted-foreground mb-1">Progress: {progressPercentage}%</div>
            <Progress value={progressPercentage} className="h-1" />
          </div>
        )}
        
        <Button 
          onClick={onStart}
          className="w-full" 
          variant={isLocked ? "secondary" : "default"}
          disabled={isLocked}
        >
          {progress === 0 ? "Start Module" : 
           progress < 10 ? "Continue Module" : 
           "Review Module"}
        </Button>
      </div>
    </div>
  );
}

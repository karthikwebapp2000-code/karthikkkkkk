import { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { RotateCcw, Check, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface WritingCanvasProps {
  letter: string;
  onComplete: (success: boolean) => void;
  className?: string;
}

export const WritingCanvas = ({ letter, onComplete, className }: WritingCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showGuide, setShowGuide] = useState(true);
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSuccess(false);
  }, []);

  const drawGuideLetter = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw guide letter in light gray
    ctx.save();
    ctx.font = '120px Arial';
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(letter, canvas.width / 2, canvas.height / 2);
    
    // Draw guide dots/path
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.3)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.rect(50, 50, canvas.width - 100, canvas.height - 100);
    ctx.stroke();
    ctx.restore();
  }, [letter]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = 400;
    canvas.height = 400;
    
    if (showGuide) {
      drawGuideLetter();
    }
  }, [letter, showGuide, drawGuideLetter]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.strokeStyle = '#3B82F6';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setAttempts(prev => prev + 1);
    
    // Simple success logic - if they drew for a reasonable amount
    if (attempts >= 2) {
      setSuccess(true);
      onComplete(true);
    }
  };

  const handleClear = () => {
    clearCanvas();
    setAttempts(0);
    if (showGuide) {
      drawGuideLetter();
    }
  };

  const toggleGuide = () => {
    setShowGuide(!showGuide);
    clearCanvas();
    if (!showGuide) {
      setTimeout(drawGuideLetter, 100);
    }
  };

  return (
    <div className={cn("flex flex-col items-center space-y-4", className)}>
      <div className="bg-card rounded-2xl p-6 shadow-soft">
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold text-foreground mb-2">
            Practice Writing: {letter}
          </h3>
          <p className="text-muted-foreground">
            {showGuide ? "Trace over the guide" : "Write the letter freely"}
          </p>
        </div>

        <div className="relative">
          <canvas
            ref={canvasRef}
            className="border-2 border-border rounded-xl cursor-crosshair touch-none bg-white"
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
          
          {success && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-xl">
              <div className="bg-success text-success-foreground px-6 py-3 rounded-xl animate-success-pop">
                <Check className="w-6 h-6 inline mr-2" />
                Great job!
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center space-x-3 mt-4">
          <Button
            onClick={handleClear}
            variant="outline"
            className="rounded-xl"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Clear
          </Button>
          
          <Button
            onClick={toggleGuide}
            variant="outline"
            className="rounded-xl"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            {showGuide ? "Hide Guide" : "Show Guide"}
          </Button>
        </div>

        <div className="text-center mt-4">
          <div className="flex justify-center space-x-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={cn(
                  "w-3 h-3 rounded-full transition-colors",
                  i < attempts ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Practice attempts: {attempts}/5
          </p>
        </div>
      </div>
    </div>
  );
};
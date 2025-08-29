import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WritingCanvas } from "@/components/WritingCanvas";
import { cn } from "@/lib/utils";
import { PenTool, Eye } from "lucide-react";

const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetGridProps {
  onLetterClick: (letter: string) => void;
}

export const AlphabetGrid = ({ onLetterClick }: AlphabetGridProps) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [mode, setMode] = useState<"learn" | "write">("learn");
  const [completedLetters, setCompletedLetters] = useState<Set<string>>(new Set());

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    onLetterClick(letter);
  };

  const handleWritingComplete = (letter: string, success: boolean) => {
    if (success) {
      setCompletedLetters(prev => new Set([...prev, letter]));
    }
  };

  const renderLearningMode = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-6">
      {ENGLISH_ALPHABET.map((letter) => (
        <Button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          variant="outline"
          className={cn(
            "h-16 w-16 text-2xl font-bold rounded-xl transition-all duration-300 relative",
            "border-2 hover:scale-110 active:scale-95",
            "bg-card hover:bg-primary hover:text-primary-foreground",
            "shadow-soft hover:shadow-glow",
            selectedLetter === letter && "bg-primary text-primary-foreground scale-110",
            completedLetters.has(letter) && "ring-2 ring-success"
          )}
        >
          {letter}
          {completedLetters.has(letter) && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full text-xs flex items-center justify-center text-white">
              ✓
            </div>
          )}
        </Button>
      ))}
    </div>
  );

  const renderWritingMode = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 p-4">
        {ENGLISH_ALPHABET.map((letter) => (
          <Button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            variant="outline"
            size="sm"
            className={cn(
              "h-12 w-12 text-lg font-bold rounded-lg transition-all duration-300 relative",
              "border-2 hover:scale-105",
              "bg-card hover:bg-secondary hover:text-secondary-foreground",
              selectedLetter === letter && "bg-secondary text-secondary-foreground",
              completedLetters.has(letter) && "ring-2 ring-success"
            )}
          >
            {letter}
            {completedLetters.has(letter) && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full text-xs flex items-center justify-center text-white">
                ✓
              </div>
            )}
          </Button>
        ))}
      </div>

      {selectedLetter && (
        <WritingCanvas
          letter={selectedLetter}
          onComplete={(success) => handleWritingComplete(selectedLetter, success)}
          className="mt-6"
        />
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setMode("learn")}
          variant={mode === "learn" ? "default" : "outline"}
          className="rounded-xl px-6 py-3 text-lg font-semibold"
        >
          <Eye className="w-4 h-4 mr-2" />
          Learn Letters
        </Button>
        <Button
          onClick={() => setMode("write")}
          variant={mode === "write" ? "default" : "outline"}
          className="rounded-xl px-6 py-3 text-lg font-semibold"
        >
          <PenTool className="w-4 h-4 mr-2" />
          Practice Writing
        </Button>
      </div>

      {mode === "learn" ? renderLearningMode() : renderWritingMode()}

      <div className="text-center">
        <div className="bg-card rounded-xl p-4 shadow-soft inline-block">
          <p className="text-sm text-muted-foreground">
            Letters mastered: {completedLetters.size}/{ENGLISH_ALPHABET.length}
          </p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-success h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedLetters.size / ENGLISH_ALPHABET.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
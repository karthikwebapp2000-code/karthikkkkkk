import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WritingCanvas } from "@/components/WritingCanvas";
import { cn } from "@/lib/utils";
import { PenTool, Eye } from "lucide-react";

// Tamil vowels and consonants
const TAMIL_VOWELS = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];
const TAMIL_CONSONANTS = ["க", "ங", "ச", "ஞ", "ட", "ண", "த", "ந", "ப", "ம", "ய", "ர", "ல", "வ", "ழ", "ள", "ற", "ன"];

interface TamilGridProps {
  onLetterClick: (letter: string) => void;
}

export const TamilGrid = ({ onLetterClick }: TamilGridProps) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showVowels, setShowVowels] = useState(true);
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

  const currentLetters = showVowels ? TAMIL_VOWELS : TAMIL_CONSONANTS;
  const allLetters = [...TAMIL_VOWELS, ...TAMIL_CONSONANTS];

  const renderLearningMode = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-6">
      {currentLetters.map((letter) => (
        <Button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          variant="outline"
          className={cn(
            "h-16 w-16 text-2xl font-bold rounded-xl transition-all duration-300 relative",
            "border-2 hover:scale-110 active:scale-95",
            "bg-card hover:bg-accent hover:text-accent-foreground",
            "shadow-soft hover:shadow-glow",
            selectedLetter === letter && "bg-accent text-accent-foreground scale-110",
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
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 p-4">
        {currentLetters.map((letter) => (
          <Button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            variant="outline"
            size="sm"
            className={cn(
              "h-12 w-12 text-lg font-bold rounded-lg transition-all duration-300 relative",
              "border-2 hover:scale-105",
              "bg-card hover:bg-accent hover:text-accent-foreground",
              selectedLetter === letter && "bg-accent text-accent-foreground",
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
      <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex space-x-4">
          <Button
            onClick={() => setShowVowels(true)}
            variant={showVowels ? "default" : "outline"}
            className="rounded-xl px-4 py-2 text-sm font-semibold"
          >
            உயிரெழுத்துகள் (Vowels)
          </Button>
          <Button
            onClick={() => setShowVowels(false)}
            variant={!showVowels ? "default" : "outline"}
            className="rounded-xl px-4 py-2 text-sm font-semibold"
          >
            மெய்யெழுத்துகள் (Consonants)
          </Button>
        </div>
        
        <div className="flex space-x-4">
          <Button
            onClick={() => setMode("learn")}
            variant={mode === "learn" ? "success" : "outline"}
            className="rounded-xl px-4 py-2 text-sm font-semibold"
          >
            <Eye className="w-4 h-4 mr-2" />
            Learn
          </Button>
          <Button
            onClick={() => setMode("write")}
            variant={mode === "write" ? "success" : "outline"}
            className="rounded-xl px-4 py-2 text-sm font-semibold"
          >
            <PenTool className="w-4 h-4 mr-2" />
            Write
          </Button>
        </div>
      </div>

      {mode === "learn" ? renderLearningMode() : renderWritingMode()}

      <div className="text-center">
        <div className="bg-card rounded-xl p-4 shadow-soft inline-block">
          <p className="text-sm text-muted-foreground">
            {showVowels ? "Vowels" : "Consonants"} mastered: {
              currentLetters.filter(letter => completedLetters.has(letter)).length
            }/{currentLetters.length}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Total Tamil letters: {completedLetters.size}/{allLetters.length}
          </p>
          <div className="w-full bg-muted rounded-full h-2 mt-2">
            <div
              className="bg-accent h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(completedLetters.size / allLetters.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
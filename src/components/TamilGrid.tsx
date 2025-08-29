import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Tamil vowels and consonants
const TAMIL_VOWELS = ["அ", "ஆ", "இ", "ஈ", "உ", "ஊ", "எ", "ஏ", "ஐ", "ஒ", "ஓ", "ஔ"];
const TAMIL_CONSONANTS = ["க", "ங", "ச", "ஞ", "ட", "ண", "த", "ந", "ப", "ம", "ய", "ர", "ல", "வ", "ழ", "ள", "ற", "ன"];

interface TamilGridProps {
  onLetterClick: (letter: string) => void;
}

export const TamilGrid = ({ onLetterClick }: TamilGridProps) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showVowels, setShowVowels] = useState(true);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    onLetterClick(letter);
  };

  const currentLetters = showVowels ? TAMIL_VOWELS : TAMIL_CONSONANTS;

  return (
    <div className="space-y-6">
      <div className="flex justify-center space-x-4">
        <Button
          onClick={() => setShowVowels(true)}
          variant={showVowels ? "default" : "outline"}
          className="rounded-xl px-6 py-3 text-lg font-semibold"
        >
          உயிரெழுத்துகள் (Vowels)
        </Button>
        <Button
          onClick={() => setShowVowels(false)}
          variant={!showVowels ? "default" : "outline"}
          className="rounded-xl px-6 py-3 text-lg font-semibold"
        >
          மெய்யெழுத்துகள் (Consonants)
        </Button>
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 p-6">
        {currentLetters.map((letter) => (
          <Button
            key={letter}
            onClick={() => handleLetterClick(letter)}
            variant="outline"
            className={cn(
              "h-16 w-16 text-2xl font-bold rounded-xl transition-all duration-300",
              "border-2 hover:scale-110 active:scale-95",
              "bg-card hover:bg-accent hover:text-accent-foreground",
              "shadow-soft hover:shadow-glow",
              selectedLetter === letter && "bg-accent text-accent-foreground scale-110"
            )}
          >
            {letter}
          </Button>
        ))}
      </div>
    </div>
  );
};
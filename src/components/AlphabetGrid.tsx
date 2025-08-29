import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const ENGLISH_ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

interface AlphabetGridProps {
  onLetterClick: (letter: string) => void;
}

export const AlphabetGrid = ({ onLetterClick }: AlphabetGridProps) => {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    onLetterClick(letter);
  };

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 p-6">
      {ENGLISH_ALPHABET.map((letter) => (
        <Button
          key={letter}
          onClick={() => handleLetterClick(letter)}
          variant="outline"
          className={cn(
            "h-16 w-16 text-2xl font-bold rounded-xl transition-all duration-300",
            "border-2 hover:scale-110 active:scale-95",
            "bg-card hover:bg-primary hover:text-primary-foreground",
            "shadow-soft hover:shadow-glow",
            selectedLetter === letter && "bg-primary text-primary-foreground scale-110"
          )}
        >
          {letter}
        </Button>
      ))}
    </div>
  );
};
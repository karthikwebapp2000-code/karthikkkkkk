import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const SHAPES = [
  { name: "Circle", emoji: "🔵", word: "Ball" },
  { name: "Square", emoji: "🟩", word: "Box" },
  { name: "Triangle", emoji: "🔺", word: "Pizza" },
  { name: "Star", emoji: "⭐", word: "Star" },
  { name: "Heart", emoji: "❤️", word: "Love" },
  { name: "Diamond", emoji: "💎", word: "Gem" }
];

interface ShapeGameProps {
  onShapeClick: (shape: string) => void;
}

export const ShapeGame = ({ onShapeClick }: ShapeGameProps) => {
  const [selectedShape, setSelectedShape] = useState<string | null>(null);

  const handleShapeClick = (shapeName: string) => {
    setSelectedShape(shapeName);
    onShapeClick(shapeName);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-foreground mb-2">
          Learn Shapes & Words!
        </h3>
        <p className="text-muted-foreground">
          Click on each shape to learn its name and a related word
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-6">
        {SHAPES.map((shape) => (
          <div
            key={shape.name}
            onClick={() => handleShapeClick(shape.name)}
            className={cn(
              "cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300",
              "transform hover:scale-105 hover:-translate-y-2 active:scale-95",
              "flex flex-col items-center text-center space-y-3",
              "bg-card hover:bg-secondary border-border hover:border-secondary",
              "shadow-soft hover:shadow-glow",
              selectedShape === shape.name && "bg-secondary border-secondary scale-105"
            )}
          >
            <div className="text-6xl mb-2">
              {shape.emoji}
            </div>
            <h4 className="text-xl font-bold text-foreground">
              {shape.name}
            </h4>
            <p className="text-lg text-muted-foreground">
              Like a {shape.word}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
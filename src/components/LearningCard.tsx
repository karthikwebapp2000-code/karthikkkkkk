import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LearningCardProps {
  title: string;
  icon: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
}

export const LearningCard = ({ 
  title, 
  icon, 
  onClick, 
  variant = "primary",
  className 
}: LearningCardProps) => {
  const variantStyles = {
    primary: "bg-gradient-primary hover:shadow-glow border-primary/20",
    secondary: "bg-gradient-secondary hover:shadow-soft border-secondary/20", 
    accent: "bg-gradient-accent hover:shadow-soft border-accent/20"
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer rounded-2xl p-8 border-2 transition-all duration-300",
        "transform hover:scale-105 hover:-translate-y-2 active:scale-95",
        "flex flex-col items-center text-center space-y-4",
        variantStyles[variant],
        className
      )}
    >
      <div className="text-6xl mb-2 group-hover:animate-bounce">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white drop-shadow-lg">
        {title}
      </h3>
      <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
};
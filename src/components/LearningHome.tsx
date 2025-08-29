import { LearningCard } from "@/components/LearningCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Users, Shield } from "lucide-react";

export const LearningHome = ({ 
  onModeChange 
}: { 
  onModeChange: (mode: "alphabet" | "tamil" | "shapes") => void 
}) => {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4 animate-fade-in">
          Welcome to Your Learning Adventure! 🌟
        </h2>
        <p className="text-xl text-muted-foreground animate-fade-in">
          Choose what you'd like to learn today
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <LearningCard
          title="English Alphabet"
          icon="🔤"
          onClick={() => onModeChange("alphabet")}
          variant="primary"
          className="animate-fade-in"
        />
        
        <LearningCard
          title="Tamil Letters"
          icon="தமிழ்"
          onClick={() => onModeChange("tamil")}
          variant="accent"
          className="animate-fade-in"
        />
        
        <LearningCard
          title="Shapes & Words"
          icon="🔷"
          onClick={() => onModeChange("shapes")}
          variant="secondary"
          className="animate-fade-in"
        />
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
          <BookOpen className="w-12 h-12 text-primary mx-auto mb-4" />
          <h3 className="font-bold text-foreground mb-2">Interactive Learning</h3>
          <p className="text-sm text-muted-foreground">
            Touch, see, and practice letters with guided writing
          </p>
        </div>
        
        <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
          <Award className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="font-bold text-foreground mb-2">Progress Tracking</h3>
          <p className="text-sm text-muted-foreground">
            Watch your child's progress with visual feedback
          </p>
        </div>
        
        <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
          <Users className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h3 className="font-bold text-foreground mb-2">Child-Friendly</h3>
          <p className="text-sm text-muted-foreground">
            Large buttons and colorful design for easy use
          </p>
        </div>
        
        <div className="text-center p-6 bg-card rounded-2xl shadow-soft">
          <Shield className="w-12 h-12 text-success mx-auto mb-4" />
          <h3 className="font-bold text-foreground mb-2">Safe & Secure</h3>
          <p className="text-sm text-muted-foreground">
            No ads, no data collection, completely child-safe
          </p>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="text-center">
        <div className="bg-gradient-accent rounded-2xl p-8 text-white shadow-glow max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-4">Safe Learning Environment 🛡️</h3>
          <p className="text-lg opacity-90 mb-4">
            This app is designed to be completely safe for children to use on any device. 
            No internet required for basic learning!
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ No Ads</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ No Data Collection</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ Offline Ready</span>
            <span className="bg-white/20 px-3 py-1 rounded-full">✓ Child-Safe Design</span>
          </div>
        </div>
      </div>
    </div>
  );
};
import { useState } from "react";
import { LearningHome } from "@/components/LearningHome";
import { AlphabetGrid } from "@/components/AlphabetGrid";
import { TamilGrid } from "@/components/TamilGrid";
import { ShapeGame } from "@/components/ShapeGame";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Volume2, Trophy } from "lucide-react";
import owlMascot from "@/assets/owl-mascot.png";
import { toast } from "sonner";

type LearningMode = "home" | "alphabet" | "tamil" | "shapes";

const Index = () => {
  const [currentMode, setCurrentMode] = useState<LearningMode>("home");
  const [selectedItem, setSelectedItem] = useState<string>("");

  const handleLetterClick = (letter: string) => {
    setSelectedItem(letter);
    // Show encouraging toast
    toast.success(`Great choice! You selected "${letter}"`, {
      duration: 2000,
    });
    console.log(`Pronouncing: ${letter}`);
  };

  const handleShapeClick = (shape: string) => {
    setSelectedItem(shape);
    toast.success(`Awesome! You're learning about ${shape}!`, {
      duration: 2000,
    });
    console.log(`Learning about: ${shape}`);
  };

  const renderHeader = () => (
    <header className="bg-gradient-primary text-white p-6 shadow-soft">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        {currentMode !== "home" && (
          <Button
            onClick={() => setCurrentMode("home")}
            variant="outline"
            className="bg-white/20 border-white/30 text-white hover:bg-white/30"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back Home
          </Button>
        )}
        
        <div className="flex items-center space-x-4">
          <img 
            src={owlMascot} 
            alt="Learning Owl Mascot" 
            className="w-12 h-12 rounded-full animate-bounce-gentle"
          />
          <div>
            <h1 className="text-3xl font-bold">Learn & Play</h1>
            <p className="text-sm opacity-90">Your Learning Companion</p>
          </div>
        </div>

        {selectedItem && (
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Volume2 className="w-4 h-4 mr-2" />
              Say "{selectedItem}"
            </Button>
            <Button
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <Trophy className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </header>
  );

  const renderHome = () => (
    <main className="min-h-screen bg-background">
      {renderHeader()}
      <LearningHome onModeChange={setCurrentMode} />
    </main>
  );

  const renderAlphabet = () => (
    <main className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Learn the English Alphabet 📖
          </h2>
          <p className="text-lg text-muted-foreground">
            Click letters to learn, then practice writing them!
          </p>
        </div>

        {selectedItem && (
          <div className="text-center mb-8 p-6 bg-card rounded-2xl shadow-soft">
            <div className="text-8xl mb-4">{selectedItem}</div>
            <p className="text-2xl font-semibold text-foreground">
              Letter: {selectedItem}
            </p>
            <p className="text-lg text-muted-foreground">
              Great choice! Keep learning!
            </p>
          </div>
        )}

        <AlphabetGrid onLetterClick={handleLetterClick} />
      </div>
    </main>
  );

  const renderTamil = () => (
    <main className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Learn Tamil Letters தமிழ் எழுத்துகள்
          </h2>
          <p className="text-lg text-muted-foreground">
            Discover the beautiful Tamil writing system with interactive practice!
          </p>
        </div>

        {selectedItem && (
          <div className="text-center mb-8 p-6 bg-card rounded-2xl shadow-soft">
            <div className="text-8xl mb-4">{selectedItem}</div>
            <p className="text-2xl font-semibold text-foreground">
              Tamil Letter: {selectedItem}
            </p>
            <p className="text-lg text-muted-foreground">
              Excellent! You're learning Tamil!
            </p>
          </div>
        )}

        <TamilGrid onLetterClick={handleLetterClick} />
      </div>
    </main>
  );

  const renderShapes = () => (
    <main className="min-h-screen bg-background">
      {renderHeader()}
      
      <div className="max-w-6xl mx-auto p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Shapes & Words Adventure 🎯
          </h2>
          <p className="text-lg text-muted-foreground">
            Learn shapes and the words that go with them!
          </p>
        </div>

        {selectedItem && (
          <div className="text-center mb-8 p-6 bg-card rounded-2xl shadow-soft">
            <p className="text-2xl font-semibold text-foreground">
              You selected: {selectedItem}! 🎉
            </p>
            <p className="text-lg text-muted-foreground">
              Great job learning about shapes!
            </p>
          </div>
        )}

        <ShapeGame onShapeClick={handleShapeClick} />
      </div>
    </main>
  );

  switch (currentMode) {
    case "alphabet":
      return renderAlphabet();
    case "tamil":
      return renderTamil();
    case "shapes":
      return renderShapes();
    default:
      return renderHome();
  }
};

export default Index;
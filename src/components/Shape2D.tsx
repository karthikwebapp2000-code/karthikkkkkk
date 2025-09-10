interface Shape2DProps {
  shape: string;
  color?: string;
  size?: number;
}

export const Shape2D = ({ shape, color = "hsl(var(--primary))", size = 120 }: Shape2DProps) => {
  const renderShape = () => {
    switch (shape.toLowerCase()) {
      case 'circle':
        return (
          <div 
            className="rounded-full border-4"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              borderColor: `hsl(var(--primary) / 0.3)`
            }} 
          />
        );
      case 'square':
        return (
          <div 
            className="border-4"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              borderColor: `hsl(var(--primary) / 0.3)`
            }} 
          />
        );
      case 'triangle':
        return (
          <div 
            className="relative"
            style={{ width: size, height: size }}
          >
            <div
              className="absolute inset-0"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${size/2}px solid transparent`,
                borderRight: `${size/2}px solid transparent`,
                borderBottom: `${size}px solid ${color}`,
                filter: `drop-shadow(0 0 4px hsl(var(--primary) / 0.3))`
              }}
            />
          </div>
        );
      case 'star':
        return (
          <div 
            className="relative flex items-center justify-center text-8xl"
            style={{ width: size, height: size, color }}
          >
            ⭐
          </div>
        );
      case 'heart':
        return (
          <div 
            className="relative flex items-center justify-center text-8xl"
            style={{ width: size, height: size, color }}
          >
            ❤️
          </div>
        );
      case 'diamond':
        return (
          <div 
            className="relative"
            style={{ width: size, height: size }}
          >
            <div
              className="absolute inset-0 transform rotate-45"
              style={{
                width: size * 0.7,
                height: size * 0.7,
                backgroundColor: color,
                margin: 'auto',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                filter: `drop-shadow(0 0 8px hsl(var(--primary) / 0.3))`
              }}
            />
          </div>
        );
      default:
        return (
          <div 
            className="border-4"
            style={{ 
              width: size, 
              height: size, 
              backgroundColor: color,
              borderColor: `hsl(var(--primary) / 0.3)`
            }} 
          />
        );
    }
  };

  return (
    <div className="flex items-center justify-center p-4">
      {renderShape()}
    </div>
  );
};
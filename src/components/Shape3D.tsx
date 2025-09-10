import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text3D, Center } from '@react-three/drei';
import { Suspense } from 'react';

interface Shape3DProps {
  shape: string;
  color?: string;
}

const Shape3DContent = ({ shape, color = "#4f46e5" }: Shape3DProps) => {
  const renderShape = () => {
    switch (shape.toLowerCase()) {
      case 'circle':
        return (
          <mesh>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      case 'square':
        return (
          <mesh>
            <boxGeometry args={[1.5, 1.5, 0.3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      case 'triangle':
        return (
          <mesh>
            <coneGeometry args={[1, 2, 3]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      case 'star':
        return (
          <mesh>
            <cylinderGeometry args={[0, 1, 2, 5]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      case 'heart':
        return (
          <mesh>
            <sphereGeometry args={[0.8, 32, 32]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      case 'diamond':
        return (
          <mesh>
            <octahedronGeometry args={[1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
      default:
        return (
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={color} />
          </mesh>
        );
    }
  };

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Center>
        {renderShape()}
      </Center>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
    </>
  );
};

export const Shape3D = ({ shape, color }: Shape3DProps) => {
  return (
    <div className="w-full h-48 rounded-lg overflow-hidden bg-gradient-subtle">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <Suspense fallback={null}>
          <Shape3DContent shape={shape} color={color} />
        </Suspense>
      </Canvas>
    </div>
  );
};
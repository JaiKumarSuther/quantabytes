import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import FloatingCubes from './3d/FloatingCubes';
import ParticleSystem from './3d/ParticleSystem';

const AnimatedSphere = ({ 
  position, 
  color, 
  speed, 
  mousePosition 
}: { 
  position: [number, number, number], 
  color: string, 
  speed: number,
  mousePosition: { x: number, y: number }
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const mouseInfluence = 0.3;
      
      meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.5 + mousePosition.y * mouseInfluence;
      meshRef.current.position.x = position[0] + mousePosition.x * mouseInfluence * 0.5;
      meshRef.current.rotation.x = time * speed * 0.5 + mousePosition.y * 0.1;
      meshRef.current.rotation.y = time * speed * 0.3 + mousePosition.x * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.3}
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
};

const FloatingGeometry = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.getElapsedTime();
      groupRef.current.rotation.y = time * 0.05 + mousePosition.x * 0.01;
    }
  });

  const shapes = [
    { position: [-8, 2, -5], color: "#1a1a1a", speed: 0.8 },
    { position: [8, -1, -3], color: "#2d2d2d", speed: 1.2 },
    { position: [-6, -3, -7], color: "#1a1a1a", speed: 0.6 },
    { position: [6, 3, -4], color: "#404040", speed: 1.0 },
    { position: [-10, 0, -8], color: "#2d2d2d", speed: 0.9 },
    { position: [10, -2, -6], color: "#1a1a1a", speed: 0.7 },
  ];

  return (
    <group ref={groupRef}>
      {shapes.map((shape, index) => (
        <AnimatedSphere
          key={index}
          position={shape.position as [number, number, number]}
          color={shape.color}
          speed={shape.speed}
          mousePosition={mousePosition}
        />
      ))}
    </group>
  );
};

// Interactive click effect component
const ClickEffect = ({ clickPosition }: { clickPosition: { x: number, y: number, z: number } | null }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [scale, setScale] = useState(0);
  
  useEffect(() => {
    if (clickPosition) {
      setScale(1);
      const timer = setTimeout(() => setScale(0), 1000);
      return () => clearTimeout(timer);
    }
  }, [clickPosition]);

  if (!clickPosition) return null;

  return (
    <mesh ref={meshRef} position={[clickPosition.x, clickPosition.y, clickPosition.z]}>
      <sphereGeometry args={[0.1, 16, 16]} />
      <meshStandardMaterial
        color="#1a1a1a"
        transparent
        opacity={1.0}
        emissive="#1a1a1a"
        emissiveIntensity={0.8}
      />
    </mesh>
  );
};

// Mouse follower component
const MouseFollower = ({ mousePosition }: { mousePosition: { x: number, y: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.position.x = mousePosition.x * 2;
      meshRef.current.position.y = mousePosition.y * 2;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 16, 16]} />
      <meshStandardMaterial
        color="#2d2d2d"
        transparent
        opacity={0.6}
        emissive="#2d2d2d"
        emissiveIntensity={0.6}
      />
    </mesh>
  );
};

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickPosition, setClickPosition] = useState<{ x: number, y: number, z: number } | null>(null);
  const [scrollY, setScrollY] = useState(0);

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMousePosition({ x, y });
    };

    const handleClick = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setClickPosition({ x: x * 5, y: y * 5, z: 0 });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.8} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <pointLight position={[-10, -10, -10]} intensity={0.8} color="#2d2d2d" />
          <pointLight position={[0, 0, 5]} intensity={0.5} color="#1a1a1a" />
          <FloatingCubes />
          <ParticleSystem />
          <FloatingGeometry mousePosition={mousePosition} />
          <MouseFollower mousePosition={mousePosition} />
          <ClickEffect clickPosition={clickPosition} />
        </Suspense>
      </Canvas>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/85 via-background/80 to-background/85" />
      
      {/* Animated CSS Background */}
      <div className="absolute inset-0 opacity-60">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-800/20 rounded-full blur-3xl animate-float" 
          style={{ 
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px) translateY(${scrollY * 0.1}px)`,
            transition: 'transform 0.1s ease-out'
          }} 
        />
        <div 
          className="absolute top-3/4 right-1/4 w-80 h-80 bg-gray-700/20 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: '2s',
            transform: `translate(${-mousePosition.x * 15}px, ${-mousePosition.y * 15}px) translateY(${-scrollY * 0.05}px)`,
            transition: 'transform 0.1s ease-out'
          }} 
        />
        <div 
          className="absolute top-1/2 left-3/4 w-72 h-72 bg-gray-900/20 rounded-full blur-3xl animate-float" 
          style={{ 
            animationDelay: '4s',
            transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px) translateY(${scrollY * 0.08}px)`,
            transition: 'transform 0.1s ease-out'
          }} 
        />
      </div>

      {/* Interactive cursor trail */}
      <div 
        className="absolute w-6 h-6 bg-gray-800/40 rounded-full blur-sm pointer-events-none animate-mouse-follow"
        style={{
          left: `${(mousePosition.x + 1) * 50}%`,
          top: `${(-mousePosition.y + 1) * 50}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.1s ease-out'
        }}
      />

      {/* Click ripple effects */}
      {clickPosition && (
        <div 
          className="absolute w-12 h-12 border-2 border-gray-700/50 rounded-full animate-ripple pointer-events-none"
          style={{
            left: `${(clickPosition.x / 5 + 1) * 50}%`,
            top: `${(-clickPosition.y / 5 + 1) * 50}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
      )}
    </div>
  );
};

export default AnimatedBackground;
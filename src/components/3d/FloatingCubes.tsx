import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const FloatingCubes = () => {
  const group = useRef<any>();
  const cubes = useRef<Mesh[]>([]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (group.current) {
      group.current.rotation.y = time * 0.1;
    }

    cubes.current.forEach((cube, index) => {
      if (cube) {
        const offset = index * 0.5;
        cube.position.y = Math.sin(time + offset) * 0.5;
        cube.rotation.x = time * 0.3 + offset;
        cube.rotation.z = time * 0.2 + offset;
      }
    });
  });

  const cubePositions = [
    [-4, 0, -2],
    [4, 1, -3],
    [-2, -2, -4],
    [3, -1, -1],
    [-5, 2, -5],
    [5, -2, -2],
  ];

  return (
    <group ref={group}>
      {cubePositions.map((position, index) => (
        <mesh
          key={index}
          ref={(el) => {
            if (el) cubes.current[index] = el;
          }}
          position={position as [number, number, number]}
          scale={0.5 + Math.random() * 0.5}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color={index % 2 === 0 ? "#1a1a1a" : "#2d2d2d"}
            transparent
            opacity={0.6}
            emissive={index % 2 === 0 ? "#1a1a1a" : "#2d2d2d"}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

export default FloatingCubes;
import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";

// Stars creates the moving star field behind the Contact section.
const Stars = (props) => {
  // ref gives us access to the stars so we can rotate them every frame.
  const ref = useRef();

  // Create 5000 random points inside a sphere shape.
  // Increase 5000 for more stars, but too many can slow the page.
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));

  // useFrame runs on every animation frame.
  // These two lines slowly rotate the star field.
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      {/* Points draws many tiny particles efficiently. */}
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// StarsCanvas places the star field behind other content.
const StarsCanvas = () => {
  return (
    // z-[-1] pushes the stars behind the contact form.
    <div className='w-full h-auto absolute inset-0 z-[-1]'>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        {/* Load canvas assets early. */}
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

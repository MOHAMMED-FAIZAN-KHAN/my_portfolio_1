import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  OrbitControls,
  Preload,
  useTexture,
} from "@react-three/drei";

import CanvasLoader from "../Loader";

// Ball creates one floating 3D skill icon.
const Ball = (props) => {
  // Load the image that will be placed on the front of the ball.
  const [decal] = useTexture([props.imgUrl]);

  return (
    // Float makes the ball gently move/rotate so it feels alive.
    <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
      {/* Basic lights for the 3D object. */}
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />

      {/* The ball shape. scale controls its size. */}
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color='#fff8eb'
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        {/* Decal sticks the technology icon image onto the ball. */}
        <Decal
          position={[0, 0, 1]}
          rotation={[2 * Math.PI, 0, 6.25]}
          scale={1}
          map={decal}
          flatShading
        />
      </mesh>
    </Float>
  );
};

// BallCanvas creates the small 3D canvas used for each skill icon.
const BallCanvas = ({ icon }) => {
  return (
    <Canvas
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* User can rotate the ball, but cannot zoom in/out. */}
        <OrbitControls enableZoom={false} />
        <Ball imgUrl={icon} />
      </Suspense>

      {/* Load assets early for smoother display. */}
      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;

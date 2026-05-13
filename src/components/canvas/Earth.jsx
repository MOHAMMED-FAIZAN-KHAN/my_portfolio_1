import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";

import CanvasLoader from "../Loader";

// Earth loads the 3D planet model used in the Contact section.
const Earth = () => {
  // Loads the model from public/planet/scene.gltf.
  const earth = useGLTF("./planet/scene.gltf");

  return (
    // primitive renders the loaded 3D model.
    // Change scale to resize it, position-y to move it up/down, rotation-y to turn it.
    <primitive object={earth.scene} scale={2.5} position-y={0} rotation-y={0} />
  );
};

// EarthCanvas creates the 3D drawing area for the planet.
const EarthCanvas = () => {
  return (
    // The camera controls how close/far the planet appears.
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* autoRotate makes the planet spin automatically; zoom is disabled. */}
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Earth />

        {/* Preload all model files and textures. */}
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;

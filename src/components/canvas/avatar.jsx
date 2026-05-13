import React, { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Float,
  useAnimations,
} from "@react-three/drei";

import * as THREE from "three";

const trackedBoneNames = ["Head", "Neck", "Spine2", "LeftEye", "RightEye", "EyeLeft", "EyeRight"];

const AvatarModel = () => {
  // This must match the exact model file inside public/avatar.
  const avatar = useGLTF("/avatar/model.glb");

  // groupRef controls the whole avatar position/rotation.
  const groupRef = useRef();
  const cursorRef = useRef({ x: 0, y: 0 });

  const idleAnimations = useMemo(
    () =>
      avatar.animations.map((clip) => {
        const filteredClip = clip.clone();

        // The original idle animation also moves the head.
        // We remove head/neck tracks so mouse tracking does not fight the animation.
        filteredClip.tracks = filteredClip.tracks.filter(
          (track) =>
            !trackedBoneNames.some((boneName) =>
              track.name.startsWith(`${boneName}.`)
            )
        );

        return filteredClip;
      }),
    [avatar.animations]
  );

  // useAnimations reads animation clips from the GLB file.
  // Your model has an idle clip named "IdleV4.2(maya_head)".
  const { actions, names } = useAnimations(idleAnimations, groupRef);

  // Find face/upper-body bones once, then use them every frame for mouse tracking.
  const trackingBones = useMemo(() => {
    const getBone = (name) => avatar.scene.getObjectByName(name);

    return {
      head: getBone("Head"),
      neck: getBone("Neck"),
      spine2: getBone("Spine2"),
      leftEye: getBone("LeftEye") || getBone("EyeLeft"),
      rightEye: getBone("RightEye") || getBone("EyeRight"),
    };
  }, [avatar.scene]);

  const restRotations = useMemo(
    () => ({
      head: trackingBones.head?.rotation.clone(),
      neck: trackingBones.neck?.rotation.clone(),
      spine2: trackingBones.spine2?.rotation.clone(),
      leftEye: trackingBones.leftEye?.rotation.clone(),
      rightEye: trackingBones.rightEye?.rotation.clone(),
    }),
    [trackingBones]
  );

  useEffect(() => {
    // Play the first animation found in the avatar file.
    // If you add more animations later, change names[0] to the animation name you want.
    const idleAction = actions[names[0]];

    if (!idleAction) return;

    idleAction.reset().fadeIn(0.4).play();

    // Stop the animation cleanly if this component is removed.
    return () => idleAction.fadeOut(0.4);
  }, [actions, names]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      cursorRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      cursorRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const dampBoneRotation = (bone, restRotation, targetRotation, delta, smoothness) => {
    if (!bone || !restRotation) return;

    bone.rotation.x = THREE.MathUtils.damp(
      bone.rotation.x,
      restRotation.x + targetRotation.x,
      smoothness,
      delta
    );
    bone.rotation.y = THREE.MathUtils.damp(
      bone.rotation.y,
      restRotation.y + targetRotation.y,
      smoothness,
      delta
    );
    bone.rotation.z = THREE.MathUtils.damp(
      bone.rotation.z,
      restRotation.z + targetRotation.z,
      smoothness,
      delta
    );
  };

  useFrame((_, delta) => {
    const targetYaw = THREE.MathUtils.clamp(cursorRef.current.x, -1, 1);
    const targetPitch = THREE.MathUtils.clamp(cursorRef.current.y, -1, 1);
    const smoothness = 6;

    if (trackingBones.head) {
      // Head does most of the tracking, so the avatar appears to look at the cursor.
      dampBoneRotation(
        trackingBones.head,
        restRotations.head,
        {
          x: -targetPitch * 0.2,
          y: targetYaw * 0.4,
          z: -targetYaw * 0.06,
        },
        delta,
        smoothness
      );
    }

    if (trackingBones.neck) {
      // Neck follows more gently, making the movement feel less robotic.
      dampBoneRotation(
        trackingBones.neck,
        restRotations.neck,
        {
          x: -targetPitch * 0.08,
          y: targetYaw * 0.16,
          z: 0,
        },
        delta,
        smoothness
      );
    }

    if (trackingBones.spine2) {
      // Upper body moves just a little so the head turn does not look disconnected.
      dampBoneRotation(
        trackingBones.spine2,
        restRotations.spine2,
        {
          x: 0,
          y: targetYaw * 0.05,
          z: 0,
        },
        delta,
        smoothness
      );
    }

    [
      [trackingBones.leftEye, restRotations.leftEye],
      [trackingBones.rightEye, restRotations.rightEye],
    ].forEach(([eyeBone, restRotation]) => {
      if (!eyeBone) return;

      // This runs only if your avatar file includes separate eye bones.
      dampBoneRotation(
        eyeBone,
        restRotation,
        {
          x: -targetPitch * 0.08,
          y: targetYaw * 0.18,
          z: 0,
        },
        delta,
        smoothness
      );
    });

    if (groupRef.current) {
      // The whole body turns very slightly; most tracking is handled by head/neck above.
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetYaw * 0.08,
        0.04
      );
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.08}
      floatIntensity={0.35}
    >
      <group ref={groupRef}>
        <primitive
          object={avatar.scene}
          scale={2.5}
          position={[0, -3.5, 0]}
        />
      </group>
    </Float>
  );
};

const AvatarCanvas = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1, 3.5], fov: 45 }}
      gl={{ preserveDrawingBuffer: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      
      {/* Ambient Light */}
      <ambientLight intensity={1.5} />

      {/* Main Purple Light */}
      <directionalLight
        position={[2, 5, 2]}
        intensity={2}
        color="#915EFF"
      />

      {/* Soft Front Light */}
      <pointLight
        position={[-2, 2, 2]}
        intensity={1.5}
      />

      {/* Back Light */}
      <spotLight
        position={[0, 5, -2]}
        angle={0.3}
        intensity={2}
        penumbra={1}
      />

      <Suspense fallback={null}>
        <AvatarModel />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enableRotate={false}
      />
    </Canvas>
  );
};

export default AvatarCanvas;

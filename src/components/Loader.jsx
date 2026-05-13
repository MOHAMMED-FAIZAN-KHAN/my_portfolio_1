import { Html, useProgress } from "@react-three/drei";

// CanvasLoader appears while a 3D model or texture is still loading.
const CanvasLoader = () => {
  // useProgress gives loading progress for assets used by React Three Drei.
  const { progress } = useProgress();
  return (
    // Html lets us place normal HTML text/spinner inside a Three.js canvas.
    <Html
      as='div'
      center
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <span className='canvas-loader'></span>
      <p
        style={{
          fontSize: 14,
          color: "#F1F1F1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        {progress.toFixed(2)}%
      </p>
    </Html>
  );
};

export default CanvasLoader;

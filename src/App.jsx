import "./App.css";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import {
  Box,
  OrbitControls,
  MeshReflectorMaterial,
  Plane,
  KeyboardControls,
} from "@react-three/drei";
import Player from "./model/Player";

function App() {
  // 매핑할 키보드 입력 명시
  const map = [
    { name: "forward", keys: ["ArrowUp", "w", "W"] },
    { name: "backward", keys: ["ArrowDown", "s", "S"] },
    { name: "left", keys: ["ArrowLeft", "a", "A"] },
    { name: "right", keys: ["ArrowRight", "d", "D"] },
  ];
  return (
    <div className="w-screen h-screen">
      {/* <KeyboardControls map={map}> */}
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
        }}
        camera={{
          fov: 50,
          position: [0, 1.2, 4],
        }}
        shadows
      >
        <color attach="background" args={["#191920"]} />
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[0, 10, 10]} // 광원의 위치
          intensity={1} // 밝기
          castShadow // 그림자 옵션
        />
        <Plane rotation={[-Math.PI / 2, 0, 0]} args={[2, 10000]}>
          <MeshReflectorMaterial
            blur={[300, 100]}
            resolution={1024}
            mixBlur={1}
            mixStrength={80}
            roughness={1}
            depthScale={1.2}
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            color="#555555"
            metalness={1}
          />
        </Plane>
        <Player />
        <fog attach="fog" args={["#191920", 0, 30]} />
        <OrbitControls />
      </Canvas>
      {/* </KeyboardControls> */}
    </div>
  );
}

export default App;

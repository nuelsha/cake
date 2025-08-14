import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";
const BottomDecoration = ({ color = "#fff", isVisible }) => {
  const { scene } = useGLTF(new URL('../assets/3d/BottomDecoration.glb', import.meta.url).href);
  useEffect(() => {
    scene.traverse((child) => {
      console.log(child);
      if (child.isMesh) {
        child.material = new THREE.MeshMatcapMaterial({ color });
      }
    });
  }, [scene, color]);
  return (
    <>
      {isVisible ? (
        <primitive position={[0, 0, 0]} object={scene} scale={1} />
      ) : null}
    </>
  );
};

export default BottomDecoration;

import {  useGLTF, useTexture } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three'
const Filing = ({color='#fff'}) => {
  const { scene } = useGLTF(new URL('../assets/3d/filing.glb', import.meta.url).href)
         useEffect(() => {
                scene.traverse((child) => {
                console.log(child)
                if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({ color})
              }
            })
          }, [scene,color])
  return (
       
                <primitive position={[0, 0, 0]} object={scene} scale={1} />
       
  )
}

export default Filing

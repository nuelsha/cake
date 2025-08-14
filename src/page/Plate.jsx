import {  Environment, useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three'
const Plate = ({color='#fff'}) => {
  const { scene } = useGLTF(new URL('../assets/3d/plate.glb', import.meta.url).href)
         useEffect(() => {
                scene.traverse((child) => {
                console.log(child)
                if (child.isMesh) {
                child.material = new THREE.MeshStandardMaterial({color:'#FFD700',metalness:1,roughness:0.1})
              }
            })
          }, [scene,color])
    return (
                // <mesh></mesh>
       
                <primitive position={[0, 0, 0]} object={scene} scale={1} />
       
  )
}

export default Plate
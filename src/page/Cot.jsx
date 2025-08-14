import { useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
const Cot = ({color='#fff'}) => {
  const { scene } = useGLTF(new URL('../assets/3d/cot.glb', import.meta.url).href)
     useEffect(() => {
         scene.traverse((child) => {
            if (child.isMesh) {
            child.material = new THREE.MeshStandardMaterial({ color,roughness:0.6,metalness:0.1 })
          }
        })
      }, [scene,color])
    
  return (
       
    <primitive position={[0, 0, 0]} object={scene} scale={1} />
       
  )
}

export default Cot

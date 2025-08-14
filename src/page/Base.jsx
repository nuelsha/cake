import { useEffect } from 'react'
import * as THREE from 'three'
import { useGLTF } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
const Base = ({color='#fff'}) => {
  const { scene } = useGLTF(new URL('../assets/3d/base.glb', import.meta.url).href)
     useEffect(() => {
            scene.traverse((child) => {
            console.log(child)
            if (child.isMesh) {
            child.material = new THREE.MeshMatcapMaterial({ color })
          }
        })
      }, [scene,color])
    
  return (
       
                <primitive position={[0, 0, 0]} object={scene} scale={1} />
       
  )
}

export default Base

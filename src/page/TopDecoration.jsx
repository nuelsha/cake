import {  useGLTF } from '@react-three/drei';
import { useEffect } from 'react';
import * as THREE from 'three'
const TopDecoration = ({color='#fff',isVisible}) => {
    const { scene } = useGLTF('/src/assets/3d/TopDecoration.glb')
         useEffect(() => {
                scene.traverse((child) => {
                console.log(child)
                if (child.isMesh) {
                child.material = new THREE.MeshMatcapMaterial({color})
              }
            })
          }, [scene,color])
  return (
       
       <>
            {isVisible ? <primitive  position = { [0, 0, 0]} object = { scene } scale = {1} /> :null }
   
       </>
       
  )
}

export default TopDecoration

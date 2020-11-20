import { useRef } from 'react'
import { useFrame } from 'react-three-fiber'
import * as THREE from 'three'

const Cube = ({ number, color, scale, animate, id, rotation }) => {
  const mesh = useRef()

  let position = [(id * 2 % 20 - 10), 6 - Math.floor(id / 10) * 2, -5];

  let texture = createTexture((number + 1), color, 80)


  useFrame(() => {
    if (animate) {
      rotation += 0.03;
    }
    mesh.current.rotation.x = mesh.current.rotation.y = rotation;
  })

  return (
    <mesh
      ref={mesh}
      position={position}
      rotation={[rotation, rotation, 0]}>
      <boxBufferGeometry args={[scale, scale, scale]} />
      {<meshStandardMaterial map={texture} />
      }
    </mesh >
  )

}




export default Cube;



function createTexture(text, background, size) {
  var canvas = document.createElement("canvas");
  var context = canvas.getContext("2d");

  context.font = size + "pt Arial";

  context.fillStyle = background;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillStyle = "black";
  context.fillText(text, canvas.width / 2, canvas.height / 2);

  var texture = new THREE.Texture(canvas);
  texture.needsUpdate = true;

  return texture;
}
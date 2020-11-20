import { useReducer, useEffect } from 'react'
import { Canvas } from 'react-three-fiber'

import { add_cube, shuffle, change_odd, stop_odd, special } from './actions/actions-type'
import { reducer, initialState } from './reducers/cube'
import Button from './Styles/Button'
import Cube from './Styles/Cube'



function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { cubes, animateOdd } = state;

  useEffect(() => {
    if (cubes.length == 17) {
      dispatch(special())
    }
  }, [cubes.length]);

  return (
    <div className="App">
      <div style={{ height: "9vh" }}>
        <Button onClick={() => dispatch(add_cube())}>Add Cube</Button>
        <Button onClick={() => dispatch(shuffle())}>Shuffle</Button>
        <Button onClick={() => dispatch(change_odd())}>Change Odd</Button>
        <Button onClick={() => dispatch(stop_odd())}>Stop Odd</Button>
      </div>

      <Canvas style={{ width: "99vw", height: "87vh" }}>
        <ambientLight intensity={0.4} />
        <pointLight
          intensity={0.5}
          position={[0, 0, 0]}
        />

        {
          state.cubes.map((c, i) =>
            <Cube {...c} key={i} id={i} />
          )
        }
      </Canvas>

    </div>
  );
}

export default App;

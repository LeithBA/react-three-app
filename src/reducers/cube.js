import { ADD_CUBE, SHUFFLE, CHANGE_ODD, STOP_ODD, SPECIAL } from '../constants/actions';


const initialState = { cubes: [], animateOdd: false };

const reducer = (state, action) => {

    console.log(action)

    switch (action.type) {
        case ADD_CUBE:
            const col = '#' + ((0.99 + Math.random() * 0.01) * 0xFFFFFF << 0).toString(16);
            const cube = {
                number: (state.cubes.length),
                color: col,
                rotation: Math.random(),
                scale: 1,
                animate: (state.animateOdd && (state.cubes.length + 1) % 2 == 1 ? true : false)
            }
            return { ...state, cubes: state.cubes.concat(cube) };

        case SHUFFLE:
            return { ...state, cubes: state.cubes.sort(() => Math.random() - 0.5) };

        case CHANGE_ODD:
            state.cubes.forEach(cube => {
                if (cube.number % 2 == 0)
                    cube.animate = true;
            });
            return { ...state, animateOdd: true };

        case STOP_ODD:
            state.cubes.forEach(cube => {
                if (cube.number % 2 == 0)
                    cube.animate = false;
            });
            return { ...state, animateOdd: false };

        case SPECIAL:
            const specialCube = state.cubes[state.cubes.length - 1];
            specialCube.scale = 2;

            return { ...state };



        default:
            return state;
    }
}

export { reducer, initialState };
import {useLocalStorage} from "use-hooks";

export const useCart = () => {
    const [state, setState] = useLocalStorage('cart', {});

    const setCart = (id, num) => {
        let count = 0;

        if (state && state.hasOwnProperty(id) && num === '+') {
            count = state[id].count + 1;
        }

        if (state && !state.hasOwnProperty(id) && num === '+') {
            count = 1;
        }

        if (state && state.hasOwnProperty(id) && num === '-') {
            count = state[id].count - 1;
        }

        if (state && !state.hasOwnProperty(id) && num === '-') {
            count = 0;
        }

        console.log('count', count);

        const newState = { ...state, [String(id)]: { count } };
        // @ts-ignore
        if (newState[String(id)].count <= 0) { // @ts-ignore
            delete newState[String(id)];
        }

        setState(newState);
        return newState
    };

    return { cart: state, setCart };
}
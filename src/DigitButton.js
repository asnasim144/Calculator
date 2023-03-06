// import { ACTIONS } from "./App";
import { ACTIONS } from "./MyCalculator";

function DigitButtton({ dispatch, digit }) {
    // console.log(dispatch, digit);
    return (
        <button
            onClick={() =>
                dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })
            }
        >
            {digit}
        </button>
    );
}

export default DigitButtton;

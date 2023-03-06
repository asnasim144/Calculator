/* eslint-disable default-case */
import { useReducer } from "react";
import DigitButtton from "./DigitButton";
import OperationButtton from "./OperationButton";
import "./styles/styles.css";

export const ACTIONS = {
    ADD_DIGIT: "add-digit",
    CHOOSE_OPERATION: "choose-operation",
    CLEAR: "clear",
    DELETE_DIGIT: "delete-digit",
    EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
    // console.log(payload.digit);
    // console.log(typeof payload.digit);
    // console.log(typeof state.currentOperand);
    // console.log(state.currentOperand);
    // eslint-disable-next-line default-case
    switch (type) {
        case ACTIONS.ADD_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    currentOperand: payload.digit,
                    overwrite: false,
                };
            }
            if (payload.digit === "0" && state.currentOperand === "0") {
                return state;
            }
            if (payload.digit === "." && state.currentOperand.includes(".")) {
                return state;
            }
            return {
                ...state,
                currentOperand: `${state.currentOperand || ""} ${
                    payload.digit
                }`,
            };
        case ACTIONS.CHOOSE_OPERATION:
            if (state.currentOperand == null && state.previousOperand == null) {
                // console.log("1");
                return state;
            }
            if (state.currentOperand == null) {
                return {
                    ...state,
                    operation: payload.operation,
                    // previousOperand: state.previousOperand,
                };
            }
            if (state.previousOperand == null) {
                // console.log("2");

                return {
                    ...state,
                    operation: payload.operation,
                    previousOperand: state.currentOperand,
                    currentOperand: null,
                };
            }
            // console.log("3");
            // console.log(state.currentOperand);

            return {
                ...state,
                previousOperand: evaluate(state),
                operation: payload.operation,
                currendOperand: null,
            };

        // eslint-disable-next-line no-fallthrough
        case ACTIONS.CLEAR:
            return {
                // ...state,
                // currentOperand: `${(state.currentOperand = null)}`,
                // previousOperand: `${(state.previousOperand = null)}`,
            };

        case ACTIONS.DELETE_DIGIT:
            if (state.overwrite) {
                return {
                    ...state,
                    overwrite: false,
                    currentOperand: null,
                };
            }
            if (state.currentOperand == null) return state;
            if (state.currentOperand.length === 1) {
                return { ...state, currentOperand: null };
            }
            return {
                ...state,
                currentOperand: state.currentOperand.slice(0, -1),
            };

        case ACTIONS.EVALUATE:
            if (
                state.operation == null ||
                state.currentOperand == null ||
                state.previousOperand == null
            ) {
                return state;
            }
            return {
                ...state,
                overwrite: true,
                previousOperand: null,
                operation: null,
                currentOperand: evaluate(state),
            };
    }
}
// const a = () => {};
function evaluate({ currentOperand, previousOperand, operation }) {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return "";
    let computation = "";
    switch (operation) {
        case "+":
            computation = prev + current;
            break;

        case "-":
            computation = prev - current;
            break;

        case "*":
            computation = prev * current;
            break;

        case "/":
            computation = prev / current;
            break;
    }
    // console.log(computation.toString());
    return computation.toString();
}

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
    maximumFractionDigits: 0,
});
function formatOperand(operand) {
    if (operand == null) return;
    const [integer, decimal] = operand.split(".");
    if (decimal == null) return INTEGER_FORMATTER.format(integer);
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function MyCalculator() {
    const [{ currentOperand, previousOperand, operation }, dispatch] =
        useReducer(reducer, {});
    // dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit: 1 } });
    return (
        <div className="App calculatorGrid">
            <div className="output">
                <div className="previousOperand">
                    {formatOperand(previousOperand)} {operation}
                </div>
                <div className="currentOperand">
                    {/* {currentOperand} */}
                    {formatOperand(currentOperand)}
                </div>
            </div>
            <button
                className="spanTow"
                onClick={() => {
                    dispatch({ type: ACTIONS.CLEAR });
                }}
            >
                AC
            </button>
            <button
                onClick={() => {
                    dispatch({ type: ACTIONS.DELETE_DIGIT });
                }}
            >
                DEL
            </button>
            {/* <button onClick={a}>/</button> */}
            <OperationButtton operation="/" dispatch={dispatch} />
            <DigitButtton digit="1" dispatch={dispatch} />
            <DigitButtton digit="2" dispatch={dispatch} />
            <DigitButtton digit="3" dispatch={dispatch} />
            <OperationButtton operation="*" dispatch={dispatch} />
            {/* <button>*</button> */}
            <DigitButtton digit="4" dispatch={dispatch} />
            <DigitButtton digit="5" dispatch={dispatch} />
            <DigitButtton digit="6" dispatch={dispatch} />
            <OperationButtton operation="+" dispatch={dispatch} />
            {/* <button>+</button> */}
            <DigitButtton digit="7" dispatch={dispatch} />
            <DigitButtton digit="8" dispatch={dispatch} />
            <DigitButtton digit="9" dispatch={dispatch} />
            <OperationButtton operation="-" dispatch={dispatch} />
            {/* <button>-</button> */}
            <DigitButtton digit="." dispatch={dispatch} />
            <DigitButtton digit="0" dispatch={dispatch} />
            <button
                className="spanTow"
                onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
            >
                =
            </button>
        </div>
    );
}

export default MyCalculator;

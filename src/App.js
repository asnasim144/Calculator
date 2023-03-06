/* eslint-disable default-case */
// import { useReducer } from "react";
// import DigitButtton from "./DigitButton";
// import OperationButtton from "./OperationButton";
// import "./styles/styles.css";
// import WebCalculator from "./WebCalculator";
// import MyCalculator from "./MyCalculator";
import Counter from "./components/Counter";

function App() {
    return (
        <div className="App calculatorGri">
            {/* <MyCalculator /> */}
            {/* <WebCalculator /> */}
            <Counter />
        </div>
    );
}

export default App;

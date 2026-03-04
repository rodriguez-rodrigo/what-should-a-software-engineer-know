import {useReducer} from "react";

const reducer = (state: number, action: "increment" | "decrement")  => {
    switch (action){
        case "increment":
            return state + 1
        case "decrement":
            return state - 1
        default:
            return state
    }
}

export function ReducerComponent() {
    const [ count, dispatch ] = useReducer(reducer, 0)

    return <div>
        Count: {count}
        <br/>
        <button onClick={() => dispatch("increment")}>Increment</button>
        <button onClick={() => dispatch("decrement")}>Decrement</button>
    </div>
}
import * as React from "react";
import {useEffect, useLayoutEffect} from "react";

export function FunctionalComponentLifecycle(){
    const [count, setCount] = React.useState(0);

    useLayoutEffect(() => {
        console.log("Component did mount or update (useLayoutEffect) with count:", count);

        return () => {
            console.log("Component will unmount or update (useLayoutEffect) from count:", count);
        }
    }, [count]);

    useEffect(() => {
        console.log("Component did mount or update with count:", count);

        return () => {
            console.log("Component will unmount or update from count:", count);
        }
    },[count])

    const increment = () => {
        setCount(prevCount => prevCount + 1);
    }

    return <>
        Count: {count} (will update on even numbers only)
        <br/>
        <button onClick={increment}>Increment</button>
    </>;
}
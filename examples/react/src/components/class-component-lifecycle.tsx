import * as React from "react";

type Props = {};
type State = {
    count: number;
}

export class ClassComponentLifecycle extends React.Component<Props, State> {

    state: State = {
        count: 0
    }

    increment(){
        this.setState(prevState => ({count: prevState.count + 1}))
    }

    componentDidMount() {
        console.log("Component did mount");
    }

    componentDidUpdate() {
        console.log("Component did update with props:", this.props, "and state:", this.state);
    }

    componentWillUnmount() {
        console.log("Component will unmount");
    }

    shouldComponentUpdate(_nextProps : Props, nextState : State): boolean {
        if (nextState.count % 2 === 0) {
            return true;
        }

        console.log("Skipping update for odd count:", nextState.count);
        return false;
    }

    render() {
        return <>
            Count: {this.state.count} (will update on even numbers only)
            <br/>
            <button onClick={() => this.increment()}>Increment</button>
        </>;
    }
}
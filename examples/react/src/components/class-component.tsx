import {Component} from "react";

export interface ClassComponentProps {
    name: string;
}

export class ClassComponent extends Component<ClassComponentProps> {

    render() {
        return <>Hello {this.props.name} Class component here!</>;
    }
}
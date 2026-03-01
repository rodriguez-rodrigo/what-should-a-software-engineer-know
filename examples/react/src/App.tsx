import './App.css'
import {ClassComponent} from "./components/class-component.tsx";
import {ClassComponentLifecycle} from "./components/class-component-lifecycle.tsx";
import {FunctionalComponentLifecycle} from "./components/functional-component-lifecycle.tsx";

function App() {
    return <div style={{display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px'}}>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Component</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Class Component</td>
                    <td><ClassComponent name="Rodrigo"/></td>
                </tr>
                <tr>
                    <td>Class Component Lifecycle</td>
                    <td><ClassComponentLifecycle/></td>
                </tr>
                <tr>
                    <td>Functional Component Lifecycle</td>
                    <td><FunctionalComponentLifecycle/></td>
                </tr>
            </tbody>
        </table>
    </div>;
}

export default App

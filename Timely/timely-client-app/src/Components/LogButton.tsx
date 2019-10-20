import React from 'react';
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'

interface IProps {
    index?: number,
    clickedIndex?: number,
    clickTrigger: (index?: number) => void
}

interface IState {
    index?: number,
    clickTrigger: (index?: number) => any
}

class LogButton extends React.Component<IProps, IState> {

    constructor( props : any ) {
        super(props)
        this.state = {
            index: this.props.index,
            clickTrigger: this.props.clickTrigger
        }
    }

    clickTrigger = () => {
        this.state.clickTrigger(this.props.index);
    }

    isDisabled = () => {
        return (this.state.index !== this.props.clickedIndex && this.props.clickedIndex !== undefined);
    }

    render() {
        console.log(this.state.index !== this.props.clickedIndex);
        console.log(this.state.index );
        console.log(this.props.clickedIndex);
        
        return (
            <Button variant="outline-secondary" onClick= {this.clickTrigger} disabled = {this.isDisabled()}>Log time</Button>
        );
    }
}

export default LogButton;
import React from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'
import { Project } from '../Models/Project';
import { WorkSession } from '../Models/WorkSession';
import getCurrentDate from '../Helpers/DatetimeHelper';

interface IProps {
    workSession: WorkSession | null,
    showModal: boolean
}

interface IState {
    workSession: WorkSession | null,
    showModal: boolean
}

class WorkSessionComponent extends React.Component<IProps, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            workSession: null,
            showModal: this.props.showModal
        }
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    render() {
        return(
            <Modal show={this.state.showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Work session has ended</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="startDate">Start date</label>
                    <input readOnly
                        value = {this.state.workSession ? this.state.workSession.startDate : "null"}
                        type="text"
                        className="form-control"
                        id="startDate"
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideModal}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default WorkSessionComponent;
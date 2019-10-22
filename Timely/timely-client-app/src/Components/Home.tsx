import React, { useState } from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'
import { Project } from '../Models/Project';
import { WorkSession } from '../Models/WorkSession';
import getCurrentDate from '../Helpers/DatetimeHelper';


interface IState {
    isLoading: boolean,
    projects: Array<Project>,
    anyProjectActive: boolean,
    modalShown: boolean
}
class Home extends React.Component<any, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            isLoading: true,
            projects: [],
            anyProjectActive: false,
            modalShown: false
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        axios.get(`http://localhost:50430/api/projects`)
        .then(projects => {
            console.log(projects);
            this.setState({ 
                isLoading: false,
                projects: projects.data, 
                anyProjectActive: projects.data.some((x:any) => x.active)
            });
        }).catch(error => console.log(error))
    }

    postWorkSession = (projectId: number) => {
        let worksession = new WorkSession(getCurrentDate(), projectId);
        console.log(getCurrentDate());
        axios.post(`http://localhost:50430/api/worksessions`, worksession);
    }

    onLogClicked = (projectId: number) => {
        let isAnyActive = this.state.projects.some(x => x.active)
        if(isAnyActive) {
            //open modal
            this.setState({anyProjectActive: false, modalShown: true});
        } 
        else {
            this.postWorkSession(projectId);
            this.setState({anyProjectActive: true});
        }
    }

    hideModal = () => {
        this.setState({modalShown: false});
    }

    render() {
        if (this.state.isLoading) {
            return null;
          }

        return ( [
            <Container>
                <Row> {
                    this.state.projects.map((project: Project) => {
                        
                        return  <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="dark-text">
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Text className="dark-text text-md">
                                        {project.note}
                                    </Card.Text>
                                    <Button key= {project.id} variant="outline-secondary" 
                                        className = "logButton"
                                        onClick = {() => this.onLogClicked(project.id)} 
                                        disabled = {project.active ? false : this.state.anyProjectActive}>Log time</Button>
                                </Card.Body>
                            </Card>
                        </Col> 
                    })
                    }
                </Row>
                <Modal show={this.state.modalShown}>
                    <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.hideModal}>
                        Close
                    </Button>
                    <Button variant="primary">
                        Save Changes
                    </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        ]);
    }
}

export default Home;
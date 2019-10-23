import React from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'
import { Project } from '../Models/Project';
import { WorkSession } from '../Models/WorkSession';
import getCurrentDate from '../Helpers/DatetimeHelper';
import * as moment from 'moment';


interface IState {
    isLoading: boolean,
    projects: Array<Project>,
    anyProjectActive: boolean,
    workSession: WorkSession | null,
    showModal: boolean,
    activeProjectId: number
}
class HomeComponent extends React.Component<any, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            isLoading: true,
            projects: [],
            anyProjectActive: false,
            activeProjectId: 0,
            workSession: null,
            showModal: false
        }
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        axios.get(`http://localhost:50430/api/projects`)
        .then(projects => {
            this.setState({ 
                isLoading: false,
                projects: projects.data, 
                anyProjectActive: projects.data.some((x:any) => x.active)
            });
        }).catch(error => console.log(error))
    }

    getActiveWorkSession = () => {
        axios.get(`http://localhost:50430/api/worksessions/getactive/${this.state.activeProjectId}`)
        .then(worksession => {
            this.setState({workSession: worksession.data});
        }).catch(error => console.log(error))
    }

    postWorkSession = (projectId: number) => {
        let worksession = new WorkSession(getCurrentDate(), projectId);
        
        axios.post(`http://localhost:50430/api/worksessions`, worksession)
            .then(x => {
                worksession.id = x.data.id;
                this.setState({workSession: worksession});
            }).catch(error => console.log(error));
    }

    updateWorkSession = () => {
        let worksession = this.state.workSession;
        worksession!.endDate = getCurrentDate();
        this.setState({workSession: worksession});

        axios.post(`http://localhost:50430/api/worksessions/update/${this.state.workSession!.id}`, this.state.workSession)
            .then(x => {
                console.log(x);
            }).catch(error => console.log(error));

        this.hideModal();
    }

    onLogClicked = (projectId: number) => {
        let isAnyActive = this.state.projects.some(x => x.active)
        if(isAnyActive) {
            this.setState({activeProjectId: projectId}, () => {
                if(this.state.workSession === null) {
                    this.getActiveWorkSession();
                } 
            });

            this.setState({anyProjectActive: false, showModal: true});
        } 
        else {
            this.postWorkSession(projectId);
            this.setState({anyProjectActive: true, activeProjectId: projectId});
        }
    }

    hideModal = () => {
        this.setState({showModal: false});
    }

    getHoursAndMinutes = () => {
        var x = new Date(getCurrentDate()).getTime() - new Date(this.state.workSession!.startDate).getTime();
        var d = moment.duration(x, 'milliseconds');
        var hours = Math.floor(d.asHours());
        var mins = Math.floor(d.asMinutes()) - hours * 60;

        return `${hours}:${mins}`;
    }

    onDescriptionChange = (value: string) => {
        let worksession = this.state.workSession;
        worksession!.description = value;
        this.setState({workSession: worksession});
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
                <Modal show={this.state.showModal}>
                    <Modal.Header>
                        <Modal.Title>Work session has ended</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <label>{ `You have worked for ${
                            this.state.workSession ? this.getHoursAndMinutes() : ""} hours`}</label>
                        <br></br>

                        <label htmlFor="startDate">Start date</label>
                        <input readOnly
                            value = {this.state.workSession ? this.state.workSession.startDate : ""}
                            type="text"
                            className="form-control"
                            id="startDate"
                        />

                        <label htmlFor="endDate">End date</label>
                        <input readOnly
                            value = {getCurrentDate()}
                            type="text"
                            className="form-control"
                            id="endDate"
                        />

                        <label htmlFor="description">Description</label>
                        <textarea  defaultValue = { (this.state.workSession && this.state.workSession!.description) ? this.state.workSession!.description : "" }
                            className="form-control"
                            id="description"
                            onChange = {(e) => this.onDescriptionChange(e.target.value)}
                        />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hideModal}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.updateWorkSession}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
             </Container>
        ]);
    }
}

export default HomeComponent;
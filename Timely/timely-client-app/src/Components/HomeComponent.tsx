import React from 'react';
import { Card, Container, Row, Col, Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'
import '../Assets/Styles/tags.css'
import { Project } from '../Models/Project';
import { WorkSession } from '../Models/WorkSession';
import getCurrentDate from '../Helpers/DatetimeHelper';
import * as moment from 'moment';
import ReactTags from 'react-tag-autocomplete'

interface IState {
    isLoading: boolean,
    projects: Array<Project>,
    anyProjectActive: boolean,
    workSession: WorkSession | null,
    showModal: boolean,
    activeProjectId: number,
    baseUri: string,
    tags: Array<any>,
    suggestions: Array<any>
}

const KeyCodes = {
    comma: 188,
    enter: 13,
  };
   
const delimiters = [KeyCodes.comma, KeyCodes.enter];

class HomeComponent extends React.Component<any, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            isLoading: true,
            projects: [],
            anyProjectActive: false,
            activeProjectId: 0,
            workSession: null,
            showModal: false,
            baseUri: "http://localhost:50430",
            tags: [],
            suggestions: []
        };

        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
    }

    componentDidMount() {
        this.getProjects();
        this.getTags();
    }

    getTags = () => {
        axios.get(`${this.state.baseUri}/api/tags`)
        .then(tags => {
            this.setState({ 
                suggestions: tags.data
            });
            console.log(tags);
        }).catch(error => console.log(error))
    }

    getProjects = () => {
        axios.get(`${this.state.baseUri}/api/projects`)
        .then(projects => {
            this.setState({ 
                isLoading: false,
                projects: projects.data, 
                anyProjectActive: projects.data.some((x:any) => x.active),
                activeProjectId: projects.data.some((x:any) => x.active) ? projects.data.find((x:any) => x.active).id : 0
            });
        }).catch(error => console.log(error))
    }

    getActiveWorkSession = () => {
        axios.get(`${this.state.baseUri}/api/worksessions/getactive/${this.state.activeProjectId}`)
        .then(worksession => {
            this.setState({
                workSession: worksession.data
            });
            console.log(worksession);
        }).catch(error => console.log(error))
    }

    postWorkSession = (projectId: number) => {
        let worksession = new WorkSession(getCurrentDate(), projectId, 0);
        axios.post(`${this.state.baseUri}/api/worksessions/post`, worksession)
            .then(x => {
                worksession.id = x.data.id;
                this.setState({workSession: worksession, anyProjectActive: true, activeProjectId: projectId});
            }).catch(error => console.log(error));
        
        this.getProjects();
    }

    updateWorkSession = () => {
        let worksession = this.state.workSession;
        worksession!.endDate = getCurrentDate();
        axios.post(`${this.state.baseUri}/api/worksessions/update/${this.state.workSession!.id}`, worksession)
            .then(x => { 
                this.setState({
                    workSession: worksession, 
                    anyProjectActive: false, 
                    activeProjectId: 0});
            }).catch(error => console.log(error));
        this.hideModal();
        this.getProjects();
    }

    onLogClicked = (projectId: number) => {
        if(this.state.anyProjectActive) {
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
        this.getProjects();
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

    handleDelete(i: any) {
        const { tags } = this.state;
        this.setState({
         tags: tags.filter((tag, index) => index !== i),
        });
    }
 
    handleAddition(tag: any) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }
 
    handleDrag(tag: any, currPos: any, newPos: any) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();
 
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
 
        // re-render
        this.setState({ tags: newTags });
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
                                        disabled = {this.state.anyProjectActive ?
                                                this.state.activeProjectId === project.id ? false : true 
                                            : false}>Log time</Button>
                                    <Button variant="outline-secondary" href={`/list/${project.id}`} >Details</Button>
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
                        <div id="app">
                        <div>
                        <ReactTags
                            placeholder="Add tags"
                            allowNew = {true}
                            tags={this.state.tags}
                            suggestions={this.state.suggestions}
                            delimiters={delimiters}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}/>
                        </div>
                        </div>
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
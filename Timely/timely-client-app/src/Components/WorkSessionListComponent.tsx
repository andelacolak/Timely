import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css';
import axios from 'axios';
import { Table, Jumbotron, Container, Button } from 'react-bootstrap';
import '../Assets/Styles/overrides.css';
import '../Assets/Styles/custom.css';

interface IState {
    workSessions: Array<any> | null,
    isLoading: boolean,
    baseUri: string
}

class WorkSessionListComponent extends React.Component<any, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            workSessions: null,
            isLoading: true,
            baseUri: "http://localhost:50430"
        }
    }

    componentDidMount() {
        this.getWorkSessions();
    }

    getWorkSessions = () => {
        axios.get(`${this.state.baseUri}/api/worksessions/${this.props.match.params.projectId}`)
        .then(ws => {
            console.log(ws);
            this.setState({workSessions: ws.data, isLoading: false});
        }).catch(error => console.log(error))
    }

    deleteWorkSession = (id: number) => {
        axios.delete(`${this.state.baseUri}/api/worksessions/${id}`)
        .then(ws => {
            this.setState({isLoading: true});
            this.getWorkSessions();
        }).catch(error => console.log(error))
    }

    render() {
        if(this.state.isLoading)
            return null;
        return (
            <Jumbotron>
            <h1 className="margin-bottom-md">{this.state.workSessions === null ? "" : this.state.workSessions[0].project.name}</h1>
            <h5 className="margin-bottom-xl not-bold">{this.state.workSessions === null ? "" : this.state.workSessions[0].project.note}</h5>
            <Table striped bordered hover className="table table-dark">
                <thead>
                    <tr>
                        <th>Start date</th>
                        <th>End date</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>{
                    this.state.workSessions!.map(ws => {
                        return <tr>
                            <React.Fragment>
                                <td>{ws.startDate}</td>
                                <td>{ws.endDate}</td>
                                <td>{ws.description}</td>
                                <Button variant="light" className="btn-center" onClick={() => this.deleteWorkSession(ws.id)}>
                                    Delete
                                </Button>
                            </React.Fragment>
                            </tr>
                        } )
                }
                </tbody>
                </Table>
            </Jumbotron>
        );
    }
}

export default WorkSessionListComponent;

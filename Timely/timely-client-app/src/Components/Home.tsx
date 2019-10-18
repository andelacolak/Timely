import React from 'react';
import { getAllProjects } from '../Services/ProjectService'
import { Button, Media, Alert, Table, Card, Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'

interface IData {
    name: string,
    tags?: Array<string>,
    note?: string,
    isLoading: boolean
}

interface IState {
    isLoading: boolean,
    projects: Array<IData>
}

class Home extends React.Component<any, any> {
    constructor( props : any ) {
        super(props)
        this.state = {
            isLoading: true,
            projects: []
        }
    }

    componentDidMount() {
        getAllProjects()
        .then(response => {
            this.setState({
                projects: response,
                isLoading: false
            });
        })
    }

    render() {
        if (this.state.isLoading) {
            return null;
          }

        return ( [
            <Container>
                <Row> {
                    this.state.projects.map((project: IData) => {
                        //return <Button variant="outline-secondary" key={project.name}>{project.name}</Button>
                        return  <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="dark-text">
                                <Card.Title>{project.name}</Card.Title>
                                { project.tags ? 
                                    project.tags.map(tag => {
                                        return <Card.Subtitle className="mb-2 text-muted">#{tag}</Card.Subtitle> 
                                    
                                }) : null
                            } 
                                <Card.Text className="dark-text text-md">
                                    {project.note}
                                </Card.Text>
                                <Button variant="outline-secondary">Log time</Button>
                                </Card.Body>
                            </Card>
                        </Col> 
                    })
                    }
                </Row>
            </Container>
        ]);
    }
}

export default Home;
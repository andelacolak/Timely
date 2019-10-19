import React from 'react';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'

interface IProject {
    name: string,
    note?: string
}

interface IState {
    isLoading: boolean,
    projects: Array<IProject>
}

class Home extends React.Component<any, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            isLoading: true,
            projects: []
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:50430/api/projects`)
        .then(projects => {
            this.setState({ 
                isLoading: false,
                projects: projects.data 
            });
        }).catch(error => console.log(error))
    }

    render() {
        if (this.state.isLoading) {
            return null;
          }

        return ( [
            <Container>
                <Row> {
                    this.state.projects.map((project: IProject) => {
                        return  <Col>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="dark-text">
                                <Card.Title>{project.name}</Card.Title>
                                {/* { project.tagNames ? 
                                    project.tagNames.map(tag => {
                                        return <Card.Subtitle className="mb-2 text-muted">#{tag}</Card.Subtitle> 
                                    
                                }) : null
                                }  */}
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
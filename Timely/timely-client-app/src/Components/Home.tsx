import React from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import LogButton from './LogButton'
import 'bootstrap/dist/css/bootstrap.css';
import '../Assets/Styles/custom.css'

interface IProject {
    name: string,
    note?: string
}

interface IState {
    isLoading: boolean,
    projects: Array<IProject>,
    clickedIndex?: number
}

class Home extends React.Component<any, IState> {
    constructor( props : any ) {
        super(props)
        this.state = {
            isLoading: true,
            projects: [],
            clickedIndex: undefined
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

    // WorkSession = (index: number)  => {
    //     this.setState({activeButtonIndex: this.state.activeButtonIndex ? undefined : index});

    //     console.log(this.state.activeButtonIndex, index);
    // }

    clickTrigger = (index?: number) => {
        this.setState({clickedIndex: index});
    }

    render() {
        let index = 0;

        if (this.state.isLoading) {
            return null;
          }

        return ( [
            <Container>
                <Row> {
                    this.state.projects.map((project: IProject) => {

                        index ++;
                        
                        return  <Col key={index}>
                            <Card style={{ width: '18rem' }}>
                                <Card.Body className="dark-text">
                                    <Card.Title>{project.name}</Card.Title>
                                    <Card.Text className="dark-text text-md">
                                        {project.note}
                                    </Card.Text>
                                    {/* <Button variant="outline-secondary" 
                                        onClick = {() => this.WorkSession(index)}
                                         disabled = {this.state.activeButtonIndex === index || this.state.activeButtonIndex === undefined ? 
                                         false : true}>Log time</Button> */}
                                    <LogButton index = {index} 
                                        clickedIndex = {this.state.clickedIndex} 
                                        clickTrigger = {this.clickTrigger}></LogButton>
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
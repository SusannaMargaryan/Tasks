import React from 'react';
import idGenerator from "../../helpers/idGenerator";
import styles from './ToDoListStyle.module.css';
import {Container,Row,Col,FormControl,InputGroup,Button} from 'react-bootstrap';
import Tasks from "../Task/Task";
class ToDoList extends React.Component {
    state = {
        inputValue: '',
        tasks: []
    };
    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    }
    handleKeyDown = (event) => {
        if (event.key === 'Enter'){
            this.addTask();
        }
    }
    addTask = () => {
        const {inputValue} = this.state;
        if (!inputValue){
            return;
        };
        const newTask = {
            text: inputValue,
            _id: idGenerator()
        };
        const tasks = [newTask,...this.state.tasks];
        this.setState({
            inputValue: '',
            tasks: tasks
        });
    };
    removeTask = (taskId) => {
        const newTasks = this.state.tasks.filter((task)=>taskId!==task._id);
        this.setState({
            tasks: newTasks
        });
    };
    render() {
        const {inputValue,tasks}= this.state;
        const taskArray = tasks.map((task) => {
           return(
               <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                   <Tasks data={task} onRemove = {this.removeTask}/>
               </Col>
           );
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={6}>
                            <InputGroup className={styles.input}>
                                <FormControl
                                    placeholder="Add New Tasks"
                                    aria-label="Add New Tasks"
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleInputChange}
                                    onKeyDown={this.handleKeyDown}
                                    value={inputValue}
                                />
                                <InputGroup.Append>
                                    <Button variant="outline-primary" onClick={this.addTask} disabled={!inputValue}>Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {taskArray}
                    </Row>
                </Container>
            </div>
        );
    }
}
export default ToDoList;

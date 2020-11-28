import React from 'react';
import idGenerator from "../../helpers/idGenerator";
import styles from './ToDoListStyle.module.css';
import {Container,Row,Col,FormControl,InputGroup,Button} from 'react-bootstrap';
import Tasks from "../Task/Task";
class ToDoList extends React.Component {
    state = {
        inputValue: '',
        tasks: [],
        selectedTasks: new Set()
    };

    handleChange = (event)=>{
        this.setState({
            inputValue: event.target.value
        });
    };
    handleKeyDown = (event)=> {
        if (event.key === 'Enter'){
            this.addTasks();
        }
    };
    addTasks = () => {
        const {inputValue}=this.state;
        if (!inputValue){
            return;
        }
        const newTasks = {
            text: inputValue,
            _id: idGenerator()
        }
        const tasks=[newTasks,...this.state.tasks];
        this.setState({
            tasks: tasks,
            inputValue: ''
        });
    };
    removeTask = (taskId)=>{
        const newTasks = this.state.tasks.filter(
            task => task._id!==taskId);
        this.setState({
            tasks: newTasks
        });
    };
    handleCheck = (taskId) =>{
        const selectedTasks=new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)){
            selectedTasks.delete(taskId);
        }else{
            selectedTasks.add(taskId);
        }
        this.setState({
            selectedTasks
        });
    };
    handleRemove = () =>{
        let  tasks = [...this.state.tasks]
        this.state.selectedTasks.forEach((id)=>{
           tasks=tasks.filter((task)=> task._id!==id);
        });
        this.setState({
            tasks,
            selectedTasks: new Set()
        });
    };
    render() {
        const {inputValue,tasks,selectedTasks}=this.state;
        const tasksArray=tasks.map((task)=>{
            return(
                <Col
                    key={task._id}
                    xs={12} sm={8} md={6} lg={4} xl={2}>
                    <Tasks
                        data={task}
                        onRemove={()=>this.removeTask(task._id)}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                    />
                </Col>
            );
        });
        return (
            <div className={styles.todo}>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                            <InputGroup className={styles.input}>
                                <FormControl
                                    placeholder="Add new Tasks"
                                    aria-label="Add new Tasks"
                                    aria-describedby="basic-addon2"
                                    onChange={this.handleChange}
                                    value={inputValue}
                                    onKeyDown={this.handleKeyDown}
                                    disabled={!!selectedTasks.size}
                                />
                                <InputGroup.Append>
                                    <Button
                                        variant="outline-primary"
                                        onClick={this.addTasks}
                                        disabled={!inputValue}
                                    >Add</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        {tasksArray}
                    </Row>
                    <Row className="justify-content-center">
                        <Col xs={4}>
                            <Button
                                variant="outline-danger"
                                onClick={this.handleRemove}
                                disabled={!selectedTasks.size}
                            >Selected Items delete</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
export default ToDoList;

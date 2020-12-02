import React,{PureComponent} from 'react';
import styles from './toDoList.module.css';
import {Container,Row,Col} from "react-bootstrap";
import AddInputTasks from "../AddInputTasks/AddInputTasks";
import Tasks from "../Tasks/Tasks";
import Confirm from "../Confirm";
import idGenerator from "../../helpers/idGenerator";
import EditTaskModal from "../EditTaskModal";
class ToDoList extends PureComponent{
    state={
      tasks: [],
      selectedTasks: new Set(),
      showConfirm: false,
      editTasks: null
    };
    addTask=(value)=>{
        const newTask = {
            text: value,
            _id: idGenerator()
        };
        const tasks=[...this.state.tasks];
        tasks.push(newTask);
        this.setState({
            tasks: tasks
        });
    };
    removeTask = (taskId)=>{
        const newTasks = this.state.tasks.filter((task) =>{
           return task._id!==taskId;
        });
        this.setState({
            tasks: newTasks
        });
    }
    handleCheck=(taskId)=>{
        const selectedTasks=new Set(this.state.selectedTasks);
        if(selectedTasks.has(taskId)){
            selectedTasks.delete(taskId);
        }else {
            selectedTasks.add(taskId);
        };
        this.setState({
            selectedTasks: selectedTasks
        });
    };
    removeSelected = () =>{
        let tasks = [...this.state.tasks];
        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id!== id);
        });
        this.setState({
            tasks,
            selectedTasks: new Set(),
            showConfirm: false
        });
    }
    toggleConfirm = () =>{
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    };
    toggleEditModal=(task)=>{
        this.setState({
           editTasks: task
        });
    }
    handleSaveTask = (editedTasks)=>{
        const tasks=[...this.state.tasks];
        const foundTaskIndex=tasks.findIndex((task)=>
            task._id===editedTasks._id
        );
        tasks[foundTaskIndex]=editedTasks;
        this.setState({
           tasks: tasks,
           editTasks: null
        });
    }
    render() {
        const {tasks,selectedTasks,showConfirm,editTasks}= this.state;
        const taskArray = tasks.map((task) => {
            return(
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Tasks
                        data={task}
                        onRemove = {this.removeTask}
                        onCheck = { this.handleCheck }
                        disabled = {!!selectedTasks.size}
                        onEdit={this.toggleEditModal}
                    />
                </Col>
            );
        });
        return(
            <>
                <div className={styles}>
                    <Container>
                        <Row className="justify-content-center">
                            <Col xs={12} sm={10} md={8} lg={6}>
                                <AddInputTasks
                                    onAdd={this.addTask}
                                    disabled={!!selectedTasks.size}
                                    toggle={this.toggleConfirm}
                                />
                            </Col>
                        </Row>
                        <Row>{taskArray}</Row>
                    </Container>
                    {
                        showConfirm &&
                        <Confirm
                            onSubmit = {this.removeSelected}
                            onClose = {this.toggleConfirm}
                            count = {selectedTasks.size}
                        />
                    }
                    {
                        !!editTasks &&
                            <EditTaskModal
                                data={editTasks}
                                onSave={this.handleSaveTask}
                                onClose={()=>this.toggleEditModal(null)}
                            />
                    }
                </div>
            </>
        );
    }
}
export default ToDoList;

import React,{PureComponent} from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import styles from './TasksStyle.module.css';

class  Tasks extends PureComponent{
    state={
        checked: false
    };
    handleCheck=()=>{
        this.setState({
            checked: !this.state.checked
        });
        const{onCheck,data}=this.props;
        onCheck(data._id);
    }
    render() {
    const task = this.props.data;
    const {checked}=this.state;
    const {disabled}=this.props;
    return(
        <>
            <Card className={`${styles.task} ${ checked? styles.selected: ''}`}>
                <Card.Body>
                    <input type="checkbox"
                        onClick={
                            this.handleCheck}
                    />
                    <Card.Title>{task.text.slice(0,10)+'...'}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    <Button variant="warning"
                            className={styles.actionButton}
                            disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger"
                            onClick={()=>this.props.onRemove(task._id)}
                            disabled={disabled}
                    >
                        <FontAwesomeIcon icon={faTrash} className={styles.actionButton}/>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
   }
}
export default Tasks;

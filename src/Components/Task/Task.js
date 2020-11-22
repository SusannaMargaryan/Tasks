import React from "react";
import {Button, Card} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faTrash} from "@fortawesome/free-solid-svg-icons";
import styles from './TasksStyle.module.css';

class  Tasks extends React.Component{
    render() {
    const task = this.props.data;
    return(
        <>
            <Card className={styles.task}>
                <Card.Body>
                    <input type="checkbox"/>
                    <Card.Title>{task.text.slice(0,10)+'...'}</Card.Title>
                    <Card.Text>
                        {task.text}
                    </Card.Text>
                    <Button variant="warning" className={styles.actionButton}>
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button variant="danger" onClick={()=>this.props.onRemove(task._id)}>
                        <FontAwesomeIcon icon={faTrash} className={styles.actionButton}/>
                    </Button>
                </Card.Body>
            </Card>
        </>
    );
   }
}
export default Tasks;

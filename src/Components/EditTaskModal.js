import React, {PureComponent} from "react";
import PropTypes from 'prop-types';
import {Button, FormControl, InputGroup, Modal} from "react-bootstrap";
class EditTaskModal extends PureComponent{
    constructor(props) {
        super(props);
        this.state={
            ...props.data
        };
    }
    handleChange=(event)=>{
        this.setState({
            text: event.target.value
        });
    }
    handleSave=()=>{
        const {text}=this.state;
        if (!text){
            return;
        }
        this.props.onSave(this.state);
    }
    render() {
        const {props}=this;
        const {text}=this.state;
        return(
            <Modal show={true} onHide={props.onClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl
                            placeholder="Add New Tasks"
                            aria-label="Add New Tasks"
                            aria-describedby="basic-addon2"
                            value={text}
                            onChange={this.handleChange}
                        />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
export default EditTaskModal;
EditTaskModal.propTypes={
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};

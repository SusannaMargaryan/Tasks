import React,{PureComponent} from 'react';
import styles from './addInputTasks.module.css';
import {InputGroup,FormControl,Button} from "react-bootstrap";
import PropTypes from 'prop-types';
class AddInputTasks extends PureComponent{
    state={
        inputValue: ''
    }
    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    };
    addTask = ()=> {
        const {inputValue}=this.state;
        if (!inputValue){
            return;
        }
        this.props.onAdd(inputValue);
        this.setState({
           inputValue: ''
        });
    };
    handleKeyDown = (event) =>{
        if (event.key==='Enter'){
            this.addTask();
        }
    }
    render() {
        const {inputValue}=this.state;
        const {disabled} = this.props;
        return(
            <>
                <InputGroup className={styles.input}>
                    <FormControl
                        placeholder="Add new Tasks"
                        aria-label="Add new Tasks"
                        aria-describedby="basic-addon2"
                        value={inputValue}
                        disabled={disabled}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                    />
                    <InputGroup.Append>
                        <Button
                            variant="primary"
                            disabled={disabled}
                            onClick={this.addTask}
                        >Add</Button>
                        <Button variant="primary"
                                onClick={this.props.toggle}
                                disabled={!disabled}
                        >Remove Selected</Button>
                    </InputGroup.Append>
                </InputGroup>
            </>
        );
    }
}
export default AddInputTasks;
AddInputTasks.propTypes={
    onAdd: PropTypes.func.isRequired,
    disabled: PropTypes.bool
};

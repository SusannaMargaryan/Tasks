import React from "react";
import './App.css';
import {Container,Row} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import ToDoList from './Components/ToDoList/ToDoList';
import Header from "./Components/header/Header";
function App() {
  return (
    <div className="App">
       <Container fluid>
           <Row>
               <Header />
           </Row>
       </Container>
        <ToDoList />
    </div>
  );
}

export default App;

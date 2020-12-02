import React,{memo} from 'react';
import styles from  './headerStyle.module.css';
import {Col,Navbar,Nav,Form,FormControl,Button,NavDropdown} from "react-bootstrap"
function Header() {
    return(
      <>
          <Col>
              <Navbar bg="primary"  variant="dark" className={styles.header}>
                  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="mr-auto">
                          <Nav.Link href="#home">Home</Nav.Link>
                          <Nav.Link href="#link">Link</Nav.Link>
                          <Nav.Link href="#pricing">Pricing</Nav.Link>
                          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                              <NavDropdown.Divider />
                              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                          </NavDropdown>
                      </Nav>
                      <Form inline>
                          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                          <Button variant="success">Search</Button>
                      </Form>
                  </Navbar.Collapse>
              </Navbar>
          </Col>
      </>
    );
}
export default memo(Header);

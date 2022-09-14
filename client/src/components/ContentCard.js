import React, { useState } from "react";
import {
  Card,
  Container,
  Stack,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useToDoContext } from "../App";
import { v4 as uuid } from "uuid";
import axios from "axios";

const ContentCard = () => {
  const { setData, todo, setTodo, data } = useToDoContext();

  const handleChange = ({ target: { value } }) => {
    setTodo((prevState) => ({ ...prevState, title: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const editTodoIndex = data.findIndex((item) => item.id === todo.id);
    if (editTodoIndex === -1) {
      const id = uuid();
      const newData = {...todo};
      newData.completed = false;
      newData.userId = id;
      newData.id = id;
      console.log(newData);
      axios.post(`api/${newData}`).then(() => console.log('Success!')).catch((error) => console.log('Error'));
      setData((prevState) => [...prevState, { id: id, userId: id, completed: false, ...todo }]);
    } 
    else {
      const newData = [...data];
      newData[editTodoIndex] = todo;
      axios.put(`api/${todo}`).
      then((event) => console.log('Success!')).
      catch(error => console.log(error));
      setData(newData);
    }
    setTodo({ title: "" });
  };
  const handleClear = () => {
    setData([]);
  }
  return (
    <div >
      <Card className="m-4">
        <Card.Body>
          <Stack direction="horizontal" gap="2" className="mt-2 ">
            <Container>
              <Form onSubmit={handleSubmit} className='d-flex justify-content-center align-items-center'>
                <Col className="">
                  <Form.Control
                    type="text"
                    required
                    placeholder="Add New Task"
                    name="todo"
                    value={todo.title}
                    onChange={handleChange}
                  />
                </Col>
                <Col className="">
                  <Button variant="primary" type="submit" className="m-2">
                    Add
                  </Button>
                  <Button variant="warning" className="m-2" onClick={handleClear}>
                    Clear All
                  </Button>
                </Col>
              </Form>
            </Container>
          </Stack>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ContentCard;

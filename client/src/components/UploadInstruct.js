import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Instructions = () => {
  return (
    <Card body className="m-5">
      <Card.Title>Instructions</Card.Title>
      <ListGroup variant="flush">
        <ListGroup.Item>File should be in UTF-8 encoding.</ListGroup.Item>
        <ListGroup.Item>
          First row should only contain the headers 'id', 'login', 'name' and
          'salary'.
        </ListGroup.Item>
        <ListGroup.Item>All 4 columns must be filled.</ListGroup.Item>
        <ListGroup.Item>
          The fields 'id' and 'login' must be unique.
        </ListGroup.Item>
        <ListGroup.Item>
          The values for 'salary' must be a number that is at least 0.
        </ListGroup.Item>
        <ListGroup.Item>
          If one or more of the rows fails validation, the entire file is
          rejected.
        </ListGroup.Item>
      </ListGroup>
    </Card>
  );
};

export default Instructions;

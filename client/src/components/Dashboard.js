import { useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Pagination from "react-bootstrap/esm/Pagination";

const Dashboard = (props) => {
  const [employees, setEmployees] = useState([]);
  return (
    <Container>
      <h2>Employees</h2>
      <Pagination>
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Item>{2}</Pagination.Item>
        <Pagination.Item>{3}</Pagination.Item>
        <Pagination.Ellipsis disabled />
        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Next />
      </Pagination>
    </Container>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/Table";
import Pagination from "react-bootstrap/esm/Pagination";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import axios from "axios";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [queryParams, setQueryParams] = useState({
    minSalary: 0,
    maxSalary: 999999,
    offset: 0,
    limit: 30,
    sort: "",
  });

  let query = useQuery();
  console.log(query.get("minSalary"), query.get("maxSalary"));

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/users")
      .then((res) => {
        setEmployees(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  if (employees.length === 0) {
    return (
      <Container>
        <h2>Employees</h2>
        <p className="lead">No employee data found.</p>
      </Container>
    );
  } else {
    const renderTableHeaders = Object.keys(employees[0]).map((header, idx) => {
      if (header !== "_id" && header !== "__v") {
        return (
          <th key={idx}>{header[0].toUpperCase() + header.substring(1)}</th>
        );
      } else {
        return null;
      }
    });

    renderTableHeaders.push(<th>Action</th>);

    const renderEmployeeData = employees.map((employee) => {
      return (
        <tr key={employee.id}>
          <th>{employee.id}</th>
          <th>{employee.login}</th>
          <th>{employee.name}</th>
          <th>S${employee.salary}</th>
          <th>
            <PencilFill role="button" />
            <TrashFill className="ms-1 ms-md-4" role="button" />
          </th>
        </tr>
      );
    });

    return (
      <Container>
        <h2>Employees</h2>
        <Table striped hover responsive>
          <thead>
            <tr>{renderTableHeaders}</tr>
          </thead>
          <tbody>{renderEmployeeData}</tbody>
        </Table>
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
  }
};

export default Dashboard;

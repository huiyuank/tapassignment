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
  const [totalPages, setTotalPages] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [queryParams, setQueryParams] = useState({
    minSalary: 0,
    maxSalary: 999999999,
    offset: 0,
    limit: 30,
    sort: "+id",
  });

  // let query = useQuery();
  // console.log(query.get("minSalary"), query.get("maxSalary"));

  useEffect(() => {
    const apiUrl =
      "http://localhost:8080/api/users?minSalary=" +
      queryParams.minSalary +
      "&maxSalary=" +
      queryParams.maxSalary +
      "&offset=" +
      queryParams.offset +
      "&limit=" +
      queryParams.limit +
      "&sort=" +
      queryParams.sort;
    console.log(apiUrl);
    axios
      .get(apiUrl)
      .then((res) => {
        setEmployees(res.data.results);
        setTotalPages(res.data.totalPages);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [queryParams]);

  const handlePaginationClick = (nextPage) => {
    setQueryParams({ ...queryParams, offset: nextPage });
  };

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

    const renderPagination = [];
    if (totalPages <= 7) {
      for (let num = 1; num <= totalPages; num++) {
        renderPagination.push(
          <Pagination.Item
            key={num}
            onClick={() => handlePaginationClick(num - 1)}
            active={num === queryParams.offset + 1}
          >
            {num}
          </Pagination.Item>
        );
      }
    } else {
      if (queryParams.offset + 1 <= 4) {
        for (let num = 1; num <= 5; num++) {
          renderPagination.push(
            <Pagination.Item
              key={num}
              onClick={() => handlePaginationClick(num - 1)}
              active={num === queryParams.offset + 1}
            >
              {num}
            </Pagination.Item>
          );
        }
        renderPagination.push([
          <Pagination.Ellipsis key={6} disabled />,
          <Pagination.Item
            key={7}
            onClick={() => handlePaginationClick(totalPages - 1)}
          >
            {totalPages}
          </Pagination.Item>,
        ]);
      } else if (queryParams.offset + 1 >= totalPages - 3) {
        renderPagination.push([
          <Pagination.Item key={1} onClick={() => handlePaginationClick(0)}>
            1
          </Pagination.Item>,
          <Pagination.Ellipsis key={2} disabled />,
        ]);
        for (let num = totalPages - 4; num <= totalPages; num++) {
          renderPagination.push(
            <Pagination.Item
              key={num}
              onClick={() => handlePaginationClick(num - 1)}
              active={num === queryParams.offset + 1}
            >
              {num}
            </Pagination.Item>
          );
        }
      } else {
        renderPagination.push([
          <Pagination.Item key={1} onClick={() => handlePaginationClick(0)}>
            1
          </Pagination.Item>,
          <Pagination.Ellipsis key={2} disabled />,
        ]);
        for (
          let num = queryParams.offset;
          num <= queryParams.offset + 2;
          num++
        ) {
          renderPagination.push(
            <Pagination.Item
              key={num}
              onClick={() => handlePaginationClick(num - 1)}
              active={num === queryParams.offset + 1}
            >
              {num}
            </Pagination.Item>
          );
        }
        renderPagination.push([
          <Pagination.Ellipsis key={totalPages - 1} disabled />,
          <Pagination.Item
            key={totalPages}
            onClick={() => handlePaginationClick(totalPages - 1)}
          >
            {totalPages}
          </Pagination.Item>,
        ]);
      }
    }

    // Page number changes "offset"

    // Title name, login, salary changes "sort"

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
          <Pagination.Prev
            onClick={() =>
              handlePaginationClick(Math.max(0, queryParams.offset - 1))
            }
          />
          {renderPagination}
          <Pagination.Next
            onClick={() =>
              handlePaginationClick(
                Math.min(queryParams.offset + 1, totalPages - 1)
              )
            }
          />
        </Pagination>
      </Container>
    );
  }
};

export default Dashboard;

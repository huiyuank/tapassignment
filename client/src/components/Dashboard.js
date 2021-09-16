import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import DataTable from "./DataTable";
import DataTablePagination from "./DataTablePagination";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";
import axios from "axios";

const Dashboard = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [queryParams, setQueryParams] = useState({
    minSalary: 0,
    maxSalary: 999999999,
    offset: 0,
    limit: 30,
    sort: "%2bid",
  });

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
    return (
      <Container>
        <h2>Employees</h2>
        <DataTable employees={employees} />
        <DataTablePagination
          queryParams={queryParams}
          totalPages={totalPages}
          handlePaginationClick={handlePaginationClick}
        />
      </Container>
    );
  }
};

export default Dashboard;

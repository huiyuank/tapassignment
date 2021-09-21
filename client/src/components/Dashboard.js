import { useState, useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import DataTableFilter from "./DataTableFilter";
import DataTable from "./DataTable";
import DataTablePagination from "./DataTablePagination";
import axios from "axios";

const Dashboard = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [filterParams, setFilterParams] = useState([0, 999999999]);
  // One of the sort params must always be 1 or -1 that indicates asc or desc respectively
  const [sortParams, setSortParams] = useState({
    id: 1,
    login: 0,
    name: 0,
    salary: 0,
  });
  const [pageParams, setPageParams] = useState({
    offset: 0,
    limit: 30,
  });

  // Handles overflow
  // In case user filters query and query count decreased but page out of bounds
  if (totalPages > 0 && pageParams.offset > totalPages - 1) {
    setPageParams({ ...pageParams, offset: totalPages - 1 });
  }

  useEffect(() => {
    const [minSalary, maxSalary] = filterParams;
    const filterQuery = "?minSalary=" + minSalary + "&maxSalary=" + maxSalary;
    const pageQuery =
      "&offset=" + pageParams.offset + "&limit=" + pageParams.limit;
    const sortKey = Object.keys(sortParams).find(
      (key) => sortParams[key] !== 0
    );
    const sortSign = sortParams[sortKey] > 0 ? "%2b" : "-";
    const sortQuery = "&sort=" + sortSign + sortKey;
    const apiUrl =
      "http://localhost:8080/api/users" + filterQuery + pageQuery + sortQuery;
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
  }, [pageParams, filterParams, sortParams]);

  const handlePaginationClick = (nextPage) => {
    setPageParams({ ...pageParams, offset: nextPage });
  };

  const handleFilterClick = (index, value) => {
    // const newFilterParams = [...filterParams];
    // newFilterParams[index] = value;
    const newFilterParams = filterParams.map((val, idx) =>
      idx === index ? value : val
    );
    setFilterParams(newFilterParams);
  };

  const handleSortClick = (key) => {
    if (sortParams[key] === 0) {
      const newSortParams = {};
      for (const iterkey in sortParams) {
        if (iterkey === key) {
          newSortParams[iterkey] = 1;
        } else {
          newSortParams[iterkey] = 0;
        }
      }
      setSortParams(newSortParams);
    } else {
      const newSortParams = { ...sortParams };
      newSortParams[key] *= -1;
      setSortParams(newSortParams);
    }
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
        <DataTableFilter
          filterParams={filterParams}
          handleFilterClick={handleFilterClick}
        />
        <h2>Employees</h2>
        <DataTable
          employees={employees}
          sortParams={sortParams}
          handleSortClick={handleSortClick}
        />
        <DataTablePagination
          pageParams={pageParams}
          totalPages={totalPages}
          handlePaginationClick={handlePaginationClick}
        />
      </Container>
    );
  }
};

export default Dashboard;

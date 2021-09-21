import Table from "react-bootstrap/Table";
import {
  PencilFill,
  TrashFill,
  SortUpAlt,
  SortDown,
} from "react-bootstrap-icons";

const nonHeaders = ["_id", "__v"];

const DataTable = ({ employees, sortParams, handleSortClick }) => {
  const renderTableHeaders = Object.keys(employees[0]).map((header, idx) => {
    if (!nonHeaders.includes(header)) {
      const sortButton =
        sortParams[header] < 0 ? (
          <SortDown
            role="button"
            className="ms-1"
            onClick={() => handleSortClick(header)}
          />
        ) : (
          <SortUpAlt
            role="button"
            className="ms-1"
            color={
              sortParams[header] === 0
                ? "rgba(128,128,128,0.7)"
                : "currentColor"
            }
            onClick={() => handleSortClick(header)}
          />
        );
      return (
        <th key={idx}>
          {header[0].toUpperCase() + header.substring(1)}
          {sortButton}
        </th>
      );
    } else {
      return null;
    }
  });

  renderTableHeaders.push(<th key={6}>Action</th>);

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
    <Table striped hover responsive>
      <thead>
        <tr>{renderTableHeaders}</tr>
      </thead>
      <tbody>{renderEmployeeData}</tbody>
    </Table>
  );
};

export default DataTable;

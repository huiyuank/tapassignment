import Table from "react-bootstrap/Table";
import {
  PencilFill,
  TrashFill,
  CaretDownFill,
  CaretUpFill,
} from "react-bootstrap-icons";

const DataTable = ({ employees }) => {
  const renderTableHeaders = Object.keys(employees[0]).map((header, idx) => {
    if (header !== "_id" && header !== "__v") {
      return (
        <th key={idx}>
          {header[0].toUpperCase() + header.substring(1)} <CaretUpFill />
          <CaretDownFill />
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

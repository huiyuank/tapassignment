import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

const Home = (props) => {
  return (
    <Container>
      <h2>Mission</h2>
      <p className="lead">
        Help our HR build an MVP employee salary management web application to
        manage employees' salaries
      </p>
      <p>The app contains an employee list with the following information:</p>
      <Table hover>
        <thead>
          <tr>
            <th>Field</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ID</td>
            <td>Unique alphanumeric ID assigned by the company.</td>
          </tr>
          <tr>
            <td>Login</td>
            <td>Unique alphanumeric login assigned by the company.</td>
          </tr>
          <tr>
            <td>Name</td>
            <td>
              Possibly non-unique name. May not be in English, so have to use
              UTF-8 encoding.
            </td>
          </tr>
          <tr>
            <td>Salary</td>
            <td>Decimal number that is &gt;= 0.00</td>
          </tr>
        </tbody>
      </Table>
      <p>The application mainly supports two user stories:</p>
      <ol>
        <li>Admin uploads employees' data with csv files</li>
        <li>
          Admin views employees' information on dashboard with filter and sort
          features
        </li>
      </ol>
      <p>
        This is a MVP to gather more feedback. As a result, we have omitted a
        login feature as we are not sure how we are going to control usage nor
        what kind of authentication mechanism we will be using.
      </p>
    </Container>
  );
};

export default Home;

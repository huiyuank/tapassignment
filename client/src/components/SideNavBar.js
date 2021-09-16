import { Link, NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Image from "react-bootstrap/Image";
import {
  HouseDoor,
  Grid1x2,
  Upload,
  Gear,
  QuestionCircle,
} from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import logo from "../static/logo.png";
import placeholder from "../static/userplaceholder.png";

const SideBar = ({ uploadResponse }) => {
  const notificationBadge =
    Object.keys(uploadResponse).length !== 0 ? (
      <Badge
        pill
        className="ms-0 ms-md-2"
        bg={uploadResponse.status === 200 ? "success" : "danger"}
      >
        {" "}
      </Badge>
    ) : null;

  return (
    <Nav
      variant="pills"
      className="d-flex flex-column flex-shrink-1 bg-light p-3 min-vh-100 h-100"
    >
      <Link
        to="/"
        className="d-flex align-items-center nav-link link-dark px-1 px-md-3 pb-4 mb-4 border-bottom rounded-0 border-secondary"
        aria-current="page"
      >
        <Image
          src={logo}
          alt="Logo"
          height="36"
          width="36"
          className="me-2"
          fluid
        />
        <span className="h4 d-none d-md-inline">Employee Management App</span>
      </Link>
      <div className="mb-auto">
        <Nav.Item>
          <NavLink
            exact
            to="/"
            className="nav-link link-dark px-2 px-md-3"
            aria-current="page"
          >
            <HouseDoor className="me-2" />
            <span className="d-none d-md-inline">Home</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            exact
            to="/users"
            className="nav-link link-dark px-2 px-md-3"
          >
            <Grid1x2 className="me-2" />
            <span className="d-none d-md-inline">Dashboard</span>
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <NavLink
            exact
            to="/users/upload"
            className="nav-link link-dark px-2 px-md-3"
          >
            <Upload className="me-2" />
            <span className="d-none d-md-inline">Upload</span>
            {notificationBadge}
          </NavLink>
        </Nav.Item>
        <Nav.Item>
          <Link to="/" className="nav-link link-dark px-2 px-md-3">
            <Gear className="me-2" />
            <span className="d-none d-md-inline">Settings</span>
          </Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/" className="nav-link link-dark px-2 px-md-3">
            <QuestionCircle className="me-2" />
            <span className="d-none d-md-inline">Help</span>
          </Link>
        </Nav.Item>
      </div>
      <div className="dropdown mt-4 pt-4 border-top border-secondary">
        <img
          src={placeholder}
          alt="User profile"
          width="36"
          height="36"
          className="rounded-circle me-2"
        />
        <strong className="d-none d-md-inline">adminuser123</strong>
      </div>
    </Nav>
  );
};

export default SideBar;

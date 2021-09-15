import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SideNavBar from "./components/SideNavBar";
import Home from "./components/Home";
import Upload from "./components/Upload";
import Dashboard from "./components/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [uploading, setUploading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState({});
  return (
    <Container fluid>
      <Row className="min-vh-100">
        <Router>
          <Col xs={2} md={3} lg={2} className="p-0">
            <SideNavBar uploadResponse={uploadResponse} />
          </Col>
          <Col className="d-flex align-items-start mt-5">
            <Switch>
              <Route path="/users/upload">
                <Upload
                  uploading={uploading}
                  setUploading={setUploading}
                  uploadResponse={uploadResponse}
                  setUploadResponse={setUploadResponse}
                />
              </Route>
              <Route path="/users">
                <Dashboard />
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Col>
        </Router>
      </Row>
    </Container>
  );
}

export default App;

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import React from "react";

const UploadForm = React.forwardRef(
  ({ uploading, onFileChooseHandler, submitHandler }, ref) => {
    const buttonMessage = uploading ? (
      <>
        <Spinner
          className="me-2"
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
        <span>Loading...</span>
      </>
    ) : (
      "Submit"
    );
    return (
      <div className="d-grid mb-4">
        <Form.Group controlId="formFile" className="mb-3">
          <Form.Label>CSV File</Form.Label>
          <Form.Control
            disabled={uploading}
            type="file"
            ref={ref}
            name="employees"
            onChange={onFileChooseHandler}
          />
        </Form.Group>
        <Button
          className="mt-4 m-auto"
          disabled={uploading}
          variant="primary"
          type="submit"
          onClick={submitHandler}
        >
          {buttonMessage}
        </Button>
      </div>
    );
  }
);

export default UploadForm;

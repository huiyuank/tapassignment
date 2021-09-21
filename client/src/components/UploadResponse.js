import Alert from "react-bootstrap/esm/Alert";

const UploadResponse = ({ uploadResponse, setUploadResponse }) => {
  const { status, message, detail, filename } = uploadResponse;
  if (Object.keys(uploadResponse).length !== 0) {
    const detailMessages = detail.map((det, idx) => <p key={idx}>{det}</p>);
    return (
      <Alert
        variant={status === 200 ? "success" : "danger"}
        onClose={() => setUploadResponse({})}
        dismissible
      >
        <Alert.Heading>{message}</Alert.Heading>
        <p>
          '{filename}'{" "}
          {status === 200
            ? "has been uploaded successfully"
            : "has been rejected"}
          .
        </p>
        <hr />
        {detailMessages}
      </Alert>
    );
  } else {
    return null;
  }
};

export default UploadResponse;

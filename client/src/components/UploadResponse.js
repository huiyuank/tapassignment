import { useState } from "react";
import Alert from "react-bootstrap/esm/Alert";

const UploadResponse = ({ uploadResponse, setUploadResponse }) => {
  if (Object.keys(uploadResponse).length !== 0) {
    const detailMessages = uploadResponse.detail.map((det, idx) => (
      <p key={idx}>{det}.</p>
    ));
    return (
      <Alert
        variant={uploadResponse.status === 200 ? "success" : "danger"}
        onClose={() => setUploadResponse({})}
        dismissible
      >
        <Alert.Heading>{uploadResponse.message}</Alert.Heading>
        <p>{detailMessages}</p>
      </Alert>
    );
  } else {
    return null;
  }
};

export default UploadResponse;

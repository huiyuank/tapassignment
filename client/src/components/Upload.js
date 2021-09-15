import Container from "react-bootstrap/esm/Container";
import UploadInstructions from "./UploadInstruct";
import UploadRes from "./UploadResponse";
import UploadForm from "./UploadForm";
import { useState, useRef } from "react";
import axios from "axios";

const Upload = ({
  uploading,
  setUploading,
  uploadResponse,
  setUploadResponse,
}) => {
  const [file, setFile] = useState(null);
  const ref = useRef();

  const onFileChooseHandler = (event) => {
    setFile(event.target.files[0]);
  };

  const submitHandler = () => {
    setUploading(true);
    let formData = new FormData();
    formData.append("employees", file);
    axios
      .post("http://localhost:8080/users/upload", formData)
      .then((res) => {
        setUploading(false);
        setUploadResponse(res.data);
      })
      .catch((e) => {
        setUploading(false);
        setUploadResponse(e.response.data);
      });
    ref.current.value = "";
    setFile(null);
  };

  return (
    <Container>
      <UploadInstructions />
      <UploadRes
        uploadResponse={uploadResponse}
        setUploadResponse={setUploadResponse}
      />
      <UploadForm
        ref={ref}
        uploading={uploading}
        onFileChooseHandler={onFileChooseHandler}
        submitHandler={submitHandler}
      />
    </Container>
  );
};

export default Upload;

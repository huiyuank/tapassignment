import Form from "react-bootstrap/esm/Form";

const FilterInput = ({ filterParams, handleFilterClick }) => {
  return filterParams.map((salary, idx) => (
    <Form.Floating className="mb-3" key={idx}>
      <Form.Control
        id={idx === 0 ? "floatingInputMin" : "floatingInputMax"}
        type="number"
        step="0.01"
        min={idx === 0 ? "0" : filterParams[0]}
        max={idx === 0 ? filterParams[0] : "999999999"}
        placeholder="Enter amount"
        value={salary}
        onChange={(e) => handleFilterClick(idx, e.target.value)}
      />
      <label htmlFor={idx === 0 ? "floatingInputMin" : "floatingInputMax"}>
        {idx === 0 ? "Minimum Salary" : "Maximum Salary"}
      </label>
    </Form.Floating>
  ));
};

export default FilterInput;

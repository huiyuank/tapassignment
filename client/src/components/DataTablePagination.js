import Pagination from "react-bootstrap/esm/Pagination";

const TablePagination = ({
  queryParams,
  totalPages,
  handlePaginationClick,
}) => {
  const renderPagination = [];
  if (totalPages <= 7) {
    for (let num = 1; num <= totalPages; num++) {
      renderPagination.push(
        <Pagination.Item
          key={num}
          onClick={() => handlePaginationClick(num - 1)}
          active={num === queryParams.offset + 1}
        >
          {num}
        </Pagination.Item>
      );
    }
  } else {
    if (queryParams.offset + 1 <= 4) {
      for (let num = 1; num <= 5; num++) {
        renderPagination.push(
          <Pagination.Item
            key={num}
            onClick={() => handlePaginationClick(num - 1)}
            active={num === queryParams.offset + 1}
          >
            {num}
          </Pagination.Item>
        );
      }
      renderPagination.push([
        <Pagination.Ellipsis key={6} disabled />,
        <Pagination.Item
          key={7}
          onClick={() => handlePaginationClick(totalPages - 1)}
        >
          {totalPages}
        </Pagination.Item>,
      ]);
    } else if (queryParams.offset + 1 >= totalPages - 3) {
      renderPagination.push([
        <Pagination.Item key={1} onClick={() => handlePaginationClick(0)}>
          1
        </Pagination.Item>,
        <Pagination.Ellipsis key={2} disabled />,
      ]);
      for (let num = totalPages - 4; num <= totalPages; num++) {
        renderPagination.push(
          <Pagination.Item
            key={num}
            onClick={() => handlePaginationClick(num - 1)}
            active={num === queryParams.offset + 1}
          >
            {num}
          </Pagination.Item>
        );
      }
    } else {
      renderPagination.push([
        <Pagination.Item key={1} onClick={() => handlePaginationClick(0)}>
          1
        </Pagination.Item>,
        <Pagination.Ellipsis key={2} disabled />,
      ]);
      for (let num = queryParams.offset; num <= queryParams.offset + 2; num++) {
        renderPagination.push(
          <Pagination.Item
            key={num}
            onClick={() => handlePaginationClick(num - 1)}
            active={num === queryParams.offset + 1}
          >
            {num}
          </Pagination.Item>
        );
      }
      renderPagination.push([
        <Pagination.Ellipsis key={totalPages - 1} disabled />,
        <Pagination.Item
          key={totalPages}
          onClick={() => handlePaginationClick(totalPages - 1)}
        >
          {totalPages}
        </Pagination.Item>,
      ]);
    }
  }
  return (
    <Pagination>
      <Pagination.Prev
        onClick={() =>
          handlePaginationClick(Math.max(0, queryParams.offset - 1))
        }
      />
      {renderPagination}
      <Pagination.Next
        onClick={() =>
          handlePaginationClick(
            Math.min(queryParams.offset + 1, totalPages - 1)
          )
        }
      />
    </Pagination>
  );
};

export default TablePagination;

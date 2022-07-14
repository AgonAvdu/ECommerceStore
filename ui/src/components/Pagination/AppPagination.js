import { Box, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import { useState } from "react";

export default function AppPagination({ metaData, onPageChange }) {
  const { currentPage, totalCount, totalPages, pageSize } = metaData;

  const [pageNumber, setPageNumber] = useState(currentPage);

  function handlePageChange(page) {
    setPageNumber(page, pageNumber);
    onPageChange(page);
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      <Typography>
        Displaying {(currentPage - 1) * pageSize + 1} -{" "}
        {currentPage * pageSize > totalCount
          ? totalCount
          : currentPage * pageSize}{" "}
        of {totalCount} items
      </Typography>
      <Pagination
        color="secondary"
        size="large"
        count={metaData ? totalPages : 1}
        page={pageNumber}
        onChange={(e, page) => handlePageChange(page)}
      />
    </Box>
  );
}

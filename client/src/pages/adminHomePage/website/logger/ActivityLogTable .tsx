import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableFooter,
  TablePagination,
  Box,
  IconButton,
} from "@mui/material";
import { tableCellClasses } from "@mui/material/TableCell";
import {
  AccessTime as AccessTimeIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import { styled, useTheme } from "@mui/material/styles";
import { getLogger } from "../../../../service/admins/adminApi";
import { useWindowSize } from "../../../../helper/customHook";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  hasMoreLogs: boolean;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange, hasMoreLogs } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1 || !hasMoreLogs}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#3f51b5",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface User {
  user_id: string;
  username: string;
}

interface Log {
  id: number;
  user: User;
  action_log: string;
  created_at: Date;
}

const ActivityLogTable: React.FC = () => {
  const { height } = useWindowSize();
  const defaultRowsPerPage = height <= 707 ? 6 : 10;
  const [logs, setLogs] = useState<Log[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [hasMoreLogs, setHasMoreLogs] = useState(true);
  const [totalLogs, setTotalLogs] = useState(0);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - logs.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const savedPage = JSON.parse(sessionStorage.getItem("page") || "0");
    const savedRowsPerPage = JSON.parse(
      sessionStorage.getItem("rowsPerPage") || "10"
    );

    setPage(savedPage);
    setRowsPerPage(savedRowsPerPage);
  }, []);

  useEffect(() => {
    sessionStorage.setItem("page", JSON.stringify(page));
    sessionStorage.setItem("rowsPerPage", JSON.stringify(rowsPerPage));

    const getLoggerData = async () => {
      try {
        const response = await getLogger(page, rowsPerPage);
        setTotalLogs(response.data.totalLogs);
        setLogs(response.data.result);
        setHasMoreLogs(response.data.hasMoreLogs);
      } catch (error) {
        console.error(error);
      }
    };
    getLoggerData();
  }, [page, rowsPerPage]);

  return (
    <TableContainer
      style={{ maxWidth: "80%", margin: "auto" }}
      component={Paper}
    >
      {/* <Typography variant="h6" style={{ padding: '16px' }}>Lịch sử hoạt động</Typography> */}
      <Table aria-label="Lịch sử hoạt động">
        <TableHead>
          <StyledTableRow>
            <StyledTableCell>STT</StyledTableCell>
            <StyledTableCell align="left">User name</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
          {logs.map((row, index) => (
            <StyledTableRow key={row.id}>
              <TableCell style={{ width: 50 }} align="left">
                {page * rowsPerPage + index + 1}
              </TableCell>
              <TableCell style={{ width: 80 }} align="left">
                {row.user.username}
              </TableCell>
              <TableCell style={{ width: 200 }} align="left">
                {row.action_log}
              </TableCell>
              <TableCell style={{ width: 160 }} align="left">
                <AccessTimeIcon
                  fontSize="small"
                  style={{ marginRight: "4px" }}
                />
                {new Date(row.created_at).toLocaleString()}
              </TableCell>
            </StyledTableRow>
          ))}
          {/* {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )} */}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              colSpan={3}
              count={totalLogs}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={(paginationProps) => (
                <TablePaginationActions
                  {...paginationProps}
                  hasMoreLogs={hasMoreLogs}
                />
              )}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default ActivityLogTable;

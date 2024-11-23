import { Fragment, useEffect, useState } from "react";

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box } from "@mui/system";


interface CustomPaginationProps {
    totalRows: number;
    currentPage: number;
    setCurrentPage: (currentPage: number) => void;
}

const CustomPagination = ({ totalRows, currentPage, setCurrentPage }: CustomPaginationProps) => {

    const rowsPerPage = 10;

    const [totalPages, setTotalPages] = useState(1);

    const onChangePage = (page: number) => {
        if (page > 0 && page <= totalPages) setCurrentPage(page);
    }

    useEffect(() => {
        setTotalPages(Math.ceil(totalRows / rowsPerPage));
    }, [totalRows]);

    return (
        <Fragment>
            <Box sx={{ display: 'flex', width: '70px', justifyContent: 'space-between', margin: '10px auto' }}>
                <ArrowBackIosNewIcon sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
                }} onClick={() => onChangePage(currentPage - 1)} />
                {currentPage}
                <ArrowForwardIosIcon sx={{
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                        transform: 'scale(1.1)'
                    }
                }} onClick={() => onChangePage(currentPage + 1)} />
            </Box>
        </Fragment>
    );
}

export default CustomPagination;
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getOrders} from "redux/actions/orderAction";
import moment from "jalali-moment";
import {HoldOrdersComponent}from "../index";

const columns = [
    {
        id: 'fullName',
        label: 'نام کاربر',
        width: "20%",
        align: 'center',
    },
    {
        id: 'price',
        label: 'مجموع مبلغ ( تومان )',
        width: "30%",
        align: 'center',
    },
    {
        id: 'time',
        label: 'زمان ثبت سفارش',
        width: "30%",
        align: 'center',
    },
    {
        id: 'operation',
        label: 'فرایند',
        width: "20%",
        align: 'center'
    }
];

function createData(fullName, totalPrice, orderDate, id) {
    return {fullName, totalPrice, orderDate, id};
}

export function OrderTableComponent(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrders())
    }, [])

    const orderState = useSelector(state => state.orderState.orders)
    const filterOrder =orderState && orderState.filter((order)=>{
        return order.orderStatus == props.filtering
    })

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = filterOrder.map(order => {
        return createData(order.customerDetail.firstName + " " + order.customerDetail.lastName, order.totalPrice, order.orderDate, order.id)
    })

    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{maxHeight: 440}}>
                <Table stickyHeader
                       aria-label="sticky table">
                    <TableHead sx={{
                        "& th": {fontSize: "1.8rem", fontWeight: "700"}
                    }}>
                        <TableRow sx={{
                            fontSize: '1.6rem',
                            "& th": {
                                fontSize: "2rem",
                            },
                            ":hover": {
                                backgroundColor: '#d5d5d5',
                            }
                        }}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{fontSize: "1.5rem", width: column.width}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((order) => {
                                return (
                                    <TableRow hover
                                              role="checkbox"
                                              tabIndex={-1}
                                              key={order.id}>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            {order.fullName}
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            {new Intl.NumberFormat().format(order.totalPrice)}
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            {moment(order.orderDate).locale("fa").format("YYYY/M/D")}
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            <HoldOrdersComponent id={order.id}/>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                sx={{
                    ".MuiTablePagination-toolbar": {
                        fontSize: '1.5rem'
                    },
                    ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                        fontSize: '1.5rem'
                    },
                    '.menuItem': {
                        fontSize: '1.8rem'
                    },
                    '.MuiTablePagination-displayedRows': {
                        fontSize: '1.6rem'
                    },
                    '.MuiTablePagination-actions': {
                        fontSize: '1.6rem'
                    }
                }}
                labelRowsPerPage={"در هر صفحه :"}
                labelDisplayedRows={
                    ({ from, to, count }) => {
                        return '' + from + '-' + to + ' از ' + count
                    }
                }
            />
        </Paper>
    );
}

import React, {useEffect, useState} from 'react';
import style from "./_CheckoutTable.module.scss";
import {ORDER, REACT_APP_BASE_URL} from "configs/variables.config";
import {getProduct} from "redux/actions/productAction";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";


const columns = [
    {
        id: 'name',
        label: 'نام کالا',
        width: "30%",
        align: 'center',
    },
    {
        id: 'count',
        label: 'تعداد',
        width: "10%",
        align: 'center',
    },
    {
        id: 'price',
        label: 'قیمت کل( تومان )',
        width: "20%",
        align: 'center',
    },
];

function createData(name, price, count, id) {
    return {name, price, count, id};
}


export const CheckoutTableComponent = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = useState()

    const dispatch = useDispatch()
    useEffect(() => {
        setOrder(JSON.parse(localStorage.getItem(ORDER)))
        dispatch(getProduct())
    }, [])

    const productStore = useSelector(state => state.productState).product

    const data = order?.map((item) => {
        const product = productStore?.find((data) => data.id == item.id)
        return {
            count: +item?.count,
            id: item?.id,
            name: product?.name,
            price: product?.price,
        }
    })

    const rows = data?.map(order => createData(order.name, order.price, order.count, order.id))
    let total = 0

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <div className={style.wrapper}>
            <span className={style.title}>سبد خرید</span>
            <div className={style.table}>
                <Paper sx={{width: '100%', overflow: 'hidden'}}>
                    <TableContainer sx={{maxHeight: 450}}>
                        <Table stickyHeader
                               aria-label="sticky table">
                            <TableHead sx={{
                                "& th": {fontSize: "1.5rem", fontWeight: "600"}
                            }}>
                                <TableRow sx={{
                                    fontSize: '1.6rem',
                                    "& th": {
                                        fontSize: "1.5rem",
                                    },
                                    ":hover": {
                                        backgroundColor: '#d5d5d5',
                                    }
                                }}>
                                    {columns.map((column, index) => (
                                        <TableCell
                                            key={index}
                                            align={column.align}
                                            style={{fontSize: "1.5rem", width: column.width}}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows?.reverse()
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((product, index) => {
                                        return (
                                            <TableRow hover
                                                      role="checkbox"
                                                      tabIndex={-1}
                                                      key={index}
                                            >
                                                <TableCell style={{fontSize: "1.2rem"}}
                                                           align={"center"}>
                                                    {product.name}
                                                </TableCell>
                                                <TableCell style={{fontSize: "1.2rem"}}
                                                           align={"center"}>
                                                    {product.count}
                                                </TableCell>
                                                <TableCell style={{fontSize: "1.2rem"}}
                                                           align={"center"}>
                                                    {new Intl.NumberFormat().format(+(product.price * product.count))}
                                                </TableCell>
                                            </TableRow>
                                        )
                                            ;
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 15]}
                        component="div"
                        count={+rows?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{
                            ".MuiTablePagination-toolbar": {
                                fontSize: '1.2rem'
                            },
                            ".MuiTablePagination-selectLabel, .MuiTablePagination-input": {
                                fontSize: '1.2rem'
                            },
                            '.menuItem': {
                                fontSize: '1.2rem'
                            },
                            '.MuiTablePagination-displayedRows': {
                                fontSize: '1.2rem'
                            },
                            '.MuiTablePagination-actions': {
                                fontSize: '1.2rem'
                            }
                        }}
                        labelRowsPerPage={"در هر صفحه :"}
                        labelDisplayedRows={
                            ({from, to, count}) => {
                                return '' + from + '-' + to + ' از ' + count
                            }
                        }
                    />
                </Paper>
            </div>
                <div>
                    {
                        rows?.map((item) => {
                            total = total + (item.count * item.price)
                        })
                    }
                    <span className={style.totalPrice}>جمع کل : {new Intl.NumberFormat().format(total)} تومان</span>
                </div>
        </div>
    );
};


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
import {getProduct} from "redux/actions/productAction";
import {getCategory} from "redux/actions/categoryAction";
import style from '../../_ProductManagment.module.scss'
import {REACT_APP_BASE_URL} from "configs/variables.config";
import { Icon } from '@iconify/react';

const columns = [
    {id: 'image', label: 'تصویر', width: "10%" , align: 'center'},
    {
        id: 'name',
        label: 'نام کالا',
        width: "40%",
        align: 'center',
    },
    {
        id: 'category',
        label: 'دسته بندی',
        width: "30%",
        align: 'center',
    },
    {
        id: 'edit',
        label: 'حذف و ویرایش کالا',
        width: "20%",
        align: 'center',
    },
];

function createData(thumbnail, name, category, id) {
    return {thumbnail, name, category, id};
}

export function ProductManagementTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
        dispatch(getCategory())
    }, [])

    const productStore = useSelector(state => state.productState).product
    const categoryStore = useSelector(state => state.categoryState).category


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const rows = productStore.map(product => {
        return createData(product.thumbnail, product.name, product.category, product.id)
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
                                    style={{fontSize: "1.5rem" , width:column.width}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => {
                                return (
                                    <TableRow hover
                                              role="checkbox"
                                              tabIndex={-1}
                                              key={product.id}>
                                        <TableCell style={{fontSize: "1.3rem" , display:"flex" , justifyContent:"center"}}
                                                   align={"center"}>
                                            <div className={style.imageWrapper}>
                                                <img src={REACT_APP_BASE_URL + "/files/" + product.thumbnail}
                                                     alt="product image"/>
                                            </div>
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            {product.name}
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            {categoryStore.length !==0 && categoryStore.filter((item)=>{
                                                 return item.id===product.category
                                            })[0].name}
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            <Icon icon="fluent:delete-48-filled" color="#dc2626" width="25" />
                                            <Icon icon="fluent:edit-16-filled" color="#495ed3" width="25" />
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

            />
        </Paper>
    );
}

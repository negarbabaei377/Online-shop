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
import style from '../../_PriceQuantity.module.scss'
import {REACT_APP_BASE_URL} from "configs/variables.config";
import {EasyEditComponent} from "../EasyEdit/EasyEdit.component";
import {Types} from 'react-easy-edit';
import {putProduct} from "api/product.api";
import {toast} from "react-toastify";


const columns = [
    {id: 'image', label: 'تصویر', width: "10%", align: 'center'},
    {
        id: 'name',
        label: 'نام کالا',
        width: "40%",
        align: 'center',
    },
    {
        id: 'price',
        label: 'قیمت ( تومان )',
        width: "30%",
        align: 'center',
    },
    {
        id: 'count',
        label: 'موجودی',
        width: "20%",
        align: 'center',
    },
];

function createData(thumbnail, name, price, count, id) {
    return {thumbnail, name, price, count, id};
}

export function PriceQuantityComponent() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
    }, [])

    const productStore = useSelector(state => state.productState).product


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const changePriceHandler = (product, value) => {
        const name = value.item
        let newValue = value.newValue
        const data = productStore.filter(item => item.id === product.id)[0]
        const serverData = {...data, [name]: newValue}
        if (value.newValue.includes(",") === true) {
            value.newValue.replaceAll(",", "")
        }
        putProduct(product.id, serverData).then(res => {
            toast.success("کالای مورد نظر با موفقیت ویرایش شد")
        }).catch(error => {
            toast.error("مشکلی پیش آمده است مجددا تلاش کنید")
        })
    }

    const rows = productStore.map(product => createData(product.thumbnail, product.name, product.price, product.count, product.id))

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
                        {rows.reverse()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((product) => {
                                return (
                                    <TableRow hover
                                              role="checkbox"
                                              tabIndex={-1}
                                              key={product.id}>
                                        <TableCell style={{
                                            fontSize: "1.3rem",
                                            display: "flex",
                                            justifyContent: "center"
                                        }}
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
                                            <EasyEditComponent
                                                productId={product.id}
                                                item="price"
                                                productItem={product}
                                                value={new Intl.NumberFormat().format(+product.price)}
                                                type={Types.TEXT}
                                                onSave={(newValue) => {
                                                    changePriceHandler(product, newValue)
                                                }}
                                                instructions="قیمت جدید را وارد کنید"
                                                validation={value => value !== "" && value !== product['price'] && value >= 100}
                                                validateMessage={'قیمت نمی تواند خالی ، کمتر از سه رقم و یا برابر با مقدار قبلی باشد!'}
                                            />
                                        </TableCell>
                                        <TableCell style={{fontSize: "1.3rem"}}
                                                   align={"center"}>
                                            <EasyEditComponent
                                                productId={product.id}
                                                item="count"
                                                productItem={product}
                                                value={product.count}
                                                type={Types.TEXT}
                                                onSave={(newValue) => {
                                                    changePriceHandler(product, newValue)
                                                }}
                                                instructions = "موجودی جدید را وارد کنید"
                                                validation = {value =>value !== "" && value !== product['count'] && value >= 0}
                                                validateMessage={'موجودی کالا نمی تواند خالی ، کمتر از صفر و یا برابر با مقدار قبلی باشد!'}


                                            />
                                                </TableCell>
                                                </TableRow>
                                                )
                                                    ;
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
                            )
                                ;
                            }

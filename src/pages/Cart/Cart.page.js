import {useEffect, useState} from 'react';
import {ORDER} from "configs/variables.config";
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import style from "./_CartPage.module.scss"
import {REACT_APP_BASE_URL} from "configs/variables.config";
import {DeleteProductComponent} from "./components";
import {getProduct} from "redux/actions/productAction";
import {useDispatch, useSelector} from "react-redux";
import NumericInput from "react-numeric-input";
import {Container} from "@mui/material";
import {Link} from "react-router-dom";
import {PATH} from "configs/path.config";
import image from "assets/image/svg/SADNESS_Fullbody_Render.webp";
import {cartAction} from "../../redux/actions/cartAction";


const columns = [
    {id: 'image', label: 'تصویر', width: "10%", align: 'center'},
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
        label: 'قیمت تک( تومان )',
        width: "20%",
        align: 'center',
    },
    {
        id: 'price',
        label: 'قیمت کل( تومان )',
        width: "20%",
        align: 'center',
    },
    {
        id: 'delete',
        label: 'حذف کالا',
        width: "10%",
        align: 'center',
    }
];

function createData(thumbnail, name, price, count, id, countProduct) {
    return {thumbnail, name, price, count, id, countProduct};
}


export const CartPage = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [order, setOrder] = useState()


    const getLength = useSelector(state => state.cartState.cart)
    const dispatch = useDispatch()
    useEffect(() => {
        setOrder(JSON.parse(localStorage.getItem(ORDER)))
        dispatch(getProduct())
    }, [getLength])

    const productStore = useSelector(state => state.productState).product

    const data = order?.map((item) => {
        const product = productStore?.find((data) => data.id == item.id)
        return {
            count: +item?.count,
            id: item?.id,
            thumbnail: product?.thumbnail,
            name: product?.name,
            price: product?.price,
            countProduct: product?.count
        }
    })
    const rows = data?.map(order => createData(order.thumbnail, order.name, order.price, order.count, order.id, order.countProduct))
    let total = 0

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const changeCountHandler = (value, id) => {
        const getData = JSON.parse(localStorage.getItem(ORDER))
        getData.find((item) => item.id == id).count = value
        localStorage.setItem(ORDER, JSON.stringify(getData))
        setOrder(JSON.parse(localStorage.getItem(ORDER)))
    }

    const deleteHandler = () => {
        localStorage.removeItem(ORDER)
        setOrder(null)
        dispatch(cartAction(0))
    }

    return (
        <Container>
            {getLength !== 0 ? (
                <>
                    <div className={style.title}>سبد خرید</div>
                    <div>
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
                                                            <NumericInput
                                                                min={1}
                                                                max={+product?.countProduct}
                                                                value={+product?.count}
                                                                size={6}
                                                                name="count"
                                                                style={{
                                                                    wrap: {
                                                                        background: '#E2E2E2',
                                                                        borderRadius: '0.5rem',
                                                                        width: '130px',
                                                                        height: '40px',
                                                                        textAlign: 'center'
                                                                    }, input: {
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        borderRadius: '0.5rem',
                                                                        textAlign: 'center',
                                                                        fontSize: "1.5rem"
                                                                    }, 'input:focus': {
                                                                        border: '2px solid #9789ff',
                                                                        borderRadius: '0.5rem',
                                                                        outline: 'none',
                                                                        caretColor: 'transparent',
                                                                    }, b: {
                                                                        borderWidth: "14px !important"
                                                                    }
                                                                }}
                                                                mobile
                                                                strict
                                                                onChange={(value) => changeCountHandler(value, +product?.id)}
                                                            />
                                                        </TableCell>
                                                        <TableCell style={{fontSize: "1.3rem"}}
                                                                   align={"center"}>
                                                            {new Intl.NumberFormat().format(+product.price)}
                                                        </TableCell>
                                                        <TableCell style={{fontSize: "1.3rem"}}
                                                                   align={"center"}>
                                                            {new Intl.NumberFormat().format(+(product.price * product.count))}
                                                        </TableCell>
                                                        <TableCell style={{fontSize: "1.3rem"}}
                                                                   align={"center"}>
                                                            <DeleteProductComponent id={product.id}/>
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
                                count={+rows?.length || 0}
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
                                    ({from, to, count}) => {
                                        return '' + from + '-' + to + ' از ' + count
                                    }
                                }
                            />
                        </Paper>
                    </div>
                    <div className={style.footer}>
                        {
                            rows?.map((item) => {
                                total = total + (item.count * item.price)
                            })
                        }
                        <span>جمع : {new Intl.NumberFormat().format(total)} تومان</span>
                        <div className={style.buttonGroup}>
                            <span className={style.deleteButton}
                                  onClick={deleteHandler}>خالی کردن سبد خرید</span>
                            <Link className={style.cartButton}
                                  to={PATH.CHECKOUT}>نهایی کردن سبد خرید</Link>
                        </div>
                    </div>
                </>
            ) : (
                <div className={style.wrapper}>
                    <h1>سبد خرید شما خالی است !</h1>
                    <div className={style.image}>
                        <img src={image}/>
                    </div>
                </div>
            )}
        </Container>
    )
        ;
}

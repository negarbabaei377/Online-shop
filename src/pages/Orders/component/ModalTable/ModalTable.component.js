import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useSelector} from "react-redux";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, quantity, price , id , deliveredAt) {
    return {name, quantity, price , id , deliveredAt};
}

export function ModalTableComponent(props) {
    const orderData = useSelector(state => state.orderState.orders)
    const filterOrder = orderData.filter(item => item.id === props.id)[0]
    const rows = filterOrder.orderItems && filterOrder.orderItems.map(dataOrder => {
        return createData(dataOrder.name, dataOrder.quantity, dataOrder.price , dataOrder.id , dataOrder.deliveredAt)
    }).sort((b , a)=>(b.deliveredAt - a.deliveredAt))
    return (
        <TableContainer component={Paper}
                        sx={{width: "100%"}}>
            <Table aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>نام کالا</StyledTableCell>
                        <StyledTableCell align="right">تعداد</StyledTableCell>
                        <StyledTableCell align="right">قیمت تک(تومان)</StyledTableCell>
                        <StyledTableCell align="right">قیمت کل(تومان)</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row , index) => (
                        <StyledTableRow key={index}>
                            <StyledTableCell component="th"
                                             scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align="right">{+row.quantity}</StyledTableCell>
                            <StyledTableCell align="right">{new Intl.NumberFormat().format(+row.price)}</StyledTableCell>
                            <StyledTableCell align="right">{new Intl.NumberFormat().format(+row.quantity * +row.price)}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

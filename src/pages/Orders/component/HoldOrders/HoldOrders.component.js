import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import {styled} from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import {Link} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {ModalTableComponent} from "../index";
import {getOrders} from "redux/actions/orderAction";
import {toast} from "react-toastify";
import {putOrder} from "api/orders.api";
import moment from "jalali-moment";
import style from '../../_Orders.module.scss'


const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export function HoldOrdersComponent(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const orders = useSelector(state => state.orderState.orders)
    const filterOrder = orders.filter(item => item.id === props.id)[0]

    const dispatch = useDispatch()
    const uploadHandler=()=>{
        const today = new Date();
        putOrder(props.id , {...filterOrder , orderStatus : 1 , deliveredAt: today.getFullYear()+'/'+(today.getMonth()+1)+'-\/'+today.getDate()})
            .then(res=>{
                dispatch(getOrders())
                setOpen(false);
                toast.success("سفارش با موفقیت تحویل داده شد")
            }).catch(error=>{
                toast.error("مشکلی پیش آمده است مجددا تلاش کنید!")
        })
    }

    return (
        <div>
            <Link className={style.buttonLink} onClick={handleClickOpen}>بررسی سفارش</Link>
            <BootstrapDialog
                onClose={handleClose}
                fullWidth={true}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title"
                                      onClose={handleClose}>
                    نمایش سفارش
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <div className={style.infoOrder}>
                        <div>
                            <span>نام مشتری :</span>
                            <span>{filterOrder.customerDetail.firstName + " " + filterOrder.customerDetail.lastName}</span>
                        </div>
                        <div>
                            <span>آدرس سفارش دهنده :</span>
                            <span>i{filterOrder.customerDetail.billingAddress}</span>
                        </div>
                        <div>
                            <span>آدرس تحویل گیرنده :</span>
                            <span>{filterOrder.customerDetail.shippingAddress}</span>
                        </div>
                        <div>
                            <span>تلفن :</span>
                            <span>{filterOrder.customerDetail.phone}</span>
                        </div>
                        <div>
                            <span>زمان ثبت سفارش :</span>
                            <span>{moment(filterOrder.orderDate).locale("fa").format("YYYY/M/D")}</span>
                        </div>
                        <div>
                            <span>زمان تحویل سفارش :</span>
                            <span>{moment(filterOrder.delivery).locale("fa").format("YYYY/M/D")}</span>
                        </div>
                    </div>
                    <ModalTableComponent orderStatus={filterOrder.orderStatus} id={filterOrder.id}/>
                    <div className={style.totalPrice}>
                        <span>جمع کل (تومان) :</span>
                        <span>{new Intl.NumberFormat().format(filterOrder.purchaseTotal)}</span>
                    </div>
                </DialogContent>
                <DialogActions>
                    {filterOrder.orderStatus === 5 ?
                        <Button autoFocus
                                onClick={uploadHandler}
                                className={style.buttonDelivered}
                                style={{backgroundColor: "rgba(151, 137, 255, 0.69)" ,
                                    color: "black" ,
                                    fontSize: "1.2rem"
                                }}>
                            تحویل داده شد
                        </Button>
                    :
                        <div className={style.deliveredDate}>
                            <span>زمان تحویل :</span>
                            <span>{moment(filterOrder.deliveredAt).locale("fa").format("YYYY/M/D")}</span>
                        </div>
                    }
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}

import React, {useEffect, useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {Backdrop, CircularProgress, TextField} from "@material-ui/core";
import {Container} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import InputIcon from "react-multi-date-picker/components/input_icon";
import './_DatePicker.scss';
import 'yup-phone';
import style from './_Checkout.module.scss';
import {CheckoutTableComponent} from "./component";
import {toast} from "react-toastify";
import {ORDER} from "configs/variables.config";
import {useSelector} from "react-redux";
import {ORDERS} from "configs/variables.config";


const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
export const CheckoutPage = (props) => {
    const [open, setOpen] = React.useState(false);
    const [date, setDate] = useState()
    const [data, setData] = useState()

    const handleClose = () => {
        setOpen(false);
    };
    const handleToggle = () => {
        setOpen(!open);
    };

    useEffect(() => {
        setData(JSON.parse(localStorage.getItem(ORDER)))
    }, [])

    const productStore = useSelector(state => state.productState).product
    const productData = data?.map((item) => {
        const product = productStore?.find((data) => data.id == item.id)
        return {
            count: +item?.count,
            name: product?.name,
            price: product?.price,
        }
    })

    let total = 0
    const totalPrice = productData?.map((item) => {
        total = total + (item.count * item.price)
    })

    const validationSchema = yup.object({
        firstName: yup.string("نام را وارد کنید!").required("این فیلد الزامی است !"),
        lastName: yup.string("نام خانوادگی را وارد کنید!").required("این فیلد الزامی است !"),
        phone: yup.string("شماره تلفن همراه را وارد کنید!")
            .required("این فیلد الزامی است !")
            .phone("IR", true, "شماره وارد شده صحیح نمی باشد!")
            .max(11, "شماره تلفن همراه نمی تواند بیشتر از 11 عدد باشد!")
            .min(11, "شماره تلفن همراه نمی تواند کمتر از 11 عدد باشد!"),
        billingAddress: yup.string("آدرس فرد تحویل گیرنده را وارد کنید!").required("این فیلد الزامی است !"),
    })

    const onSubmit = (values) => {
        const customerDetail = {
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
            billingAddress: values.billingAddress
        }
        const orders = {
            customerDetail: customerDetail,
            orderDate: null,
            totalPrice: total,
            orderStatus: 5,
            delivery: new DateObject(date).unix * 1000,
            deliveredAt: null,
            orderItems: productData
        }
        if (date === undefined) {
            toast.error("زمان تحویل سفارش خود را انتخاب کنید !")
        } else {
            setOpen(true)
            setTimeout(() => {
                localStorage.setItem(ORDERS, JSON.stringify(orders))
                window.location.href = `http://localhost:63342/project/project/public/shaparak/shaparak.html?name=${values.firstName + " " + values.lastName}&totalPrice=${total}`
                setOpen(false)
            }, 3000)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            billingAddress: "",
        },
        onSubmit: onSubmit,
        validationSchema: validationSchema
    })

    const currentDate = new DateObject({calendar: persian})
    const minDate = new DateObject({calendar: persian}).add(2, 'days')
    const maxDate = new DateObject({calendar: persian}).add(10, 'days')

    return (
        <Container>
            <Backdrop
                sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 9999}}
                style={{display: "flex", flexDirection: "column", zIndex: "100"}}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress style={{color: '#fff'}}/>
                <div style={{fontSize: "2rem", marginTop: "1rem", color: '#fff'}}>در حال اتصال به درگاه بانکی</div>
            </Backdrop>
            <div className={style.outer}>
                <div className={style.wrapper}>
                    <span className={style.title}>نهایی کردن سبد خرید</span>
                    <form onSubmit={formik.handleSubmit}>
                        <div className={style.field}
                             style={{marginTop: "2rem"}}>
                            <TextField
                                style={{width: '100%'}}
                                type="firstName"
                                id="firstName"
                                name="firstName"
                                label="نام"
                                value={formik.values.firstName}
                                onChange={formik.handleChange}
                                error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                                helperText={formik.touched.firstName && formik.errors.firstName}
                                inputProps={{
                                    style: {
                                        fontSize: 15,
                                        direction: 'rtl',
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 15,
                                        left: "auto",
                                        right: 0,
                                        direction: "rtl",
                                    }
                                }}
                            />

                        </div>
                        <div className={style.field}>
                            <TextField
                                style={{width: '100%'}}
                                type="lastName"
                                id="lastName"
                                name="lastName"
                                label="نام حانوادگی"
                                value={formik.values.lastName}
                                onChange={formik.handleChange}
                                error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                                helperText={formik.touched.lastName && formik.errors.lastName}
                                inputProps={{
                                    style: {
                                        fontSize: 15,
                                        direction: 'rtl',
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 15,
                                        left: "auto",
                                        right: 0,
                                        direction: "rtl",
                                    }
                                }}
                            />
                        </div>
                        <div className={style.field}>
                            <TextField
                                style={{width: '100%'}}
                                type="name"
                                id="phone"
                                name="phone"
                                label="شماره تلفن همراه"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                error={formik.touched.phone && Boolean(formik.errors.phone)}
                                helperText={formik.touched.phone && formik.errors.phone}
                                inputProps={{
                                    style: {
                                        fontSize: 15,
                                        direction: 'rtl'
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 15,
                                        left: "auto",
                                        right: 0,
                                        direction: "rtl"
                                    }
                                }}
                            />
                        </div>
                        <div className={style.field}>
                            <TextField
                                style={{width: '100%'}}
                                type="textarea"
                                id="billingAddress"
                                name="billingAddress"
                                label="آدرس"
                                value={formik.values.billingAddress}
                                onChange={formik.handleChange}
                                error={formik.touched.billingAddress && Boolean(formik.errors.billingAddress)}
                                helperText={formik.touched.billingAddress && formik.errors.billingAddress}
                                inputProps={{
                                    style: {
                                        fontSize: 15,
                                        direction: 'rtl',
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 15,
                                        left: "auto",
                                        right: 0,
                                        direction: "rtl",
                                    }
                                }}
                            />
                        </div>
                        <div className={style.date}>
                            <span>زمان تحویل سفارش خود را انتخاب کنید : </span>
                            <div style={{direction: "rtl"}}>
                                <DatePicker
                                    value={date}
                                    required={true}
                                    style={{fontFamily: 'IranSans'}}
                                    onChange={setDate}
                                    mapDays={({date}) => {
                                        let isWeekend = [6].includes(date.weekDay.index)
                                        if (isWeekend) return {
                                            disabled: true,
                                            style: {color: "#ccc"},
                                        }
                                    }}
                                    calendar={persian}
                                    weekDays={weekDays}
                                    render={<InputIcon/>}
                                    showOtherDays={true}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    maxDate={maxDate.format()}
                                    minDate={minDate.format()}
                                    className={"rmdp-mobile"}
                                />
                            </div>
                        </div>
                    </form>
                    <button type="submit"
                            className={style.payButton}
                            onClick={formik.handleSubmit}
                    >پرداخت
                    </button>
                </div>
                <CheckoutTableComponent/>
            </div>
        </Container>
    )
        ;
};


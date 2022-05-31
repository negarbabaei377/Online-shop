import React, {useState} from 'react';
import {useFormik} from "formik";
import * as yup from "yup";
import {TextField} from "@material-ui/core";
import {Container} from "@mui/material";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DateObject from "react-date-object";
import InputIcon from "react-multi-date-picker/components/input_icon";
import './_DatePicker.scss';
import 'yup-phone';


const weekDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]
export const CheckoutPage = (props) => {
    const [date, setDate] = useState()


    const validationSchema = yup.object({
        firstName: yup.string("نام را وارد کنید!").required("این فیلد الزامی است !"),
        lastName: yup.string("نام خانوادگی را وارد کنید!").required("این فیلد الزامی است !"),
        phone: yup.string("شماره تلفن همراه را وارد کنید!")
            .required("این فیلد الزامی است !")
            .phone("IR" , true , "شماره وارد شده صحیح نمی باشد!")
    })

    const formik = useFormik({
        initialValues: {
            firstName: "",
            lastName: "",
            phone: "",
            // billingAddress: "",
            // shippingAddress: "",
            // delivery: ""
        },
        onSubmit: onsubmit,
        validationSchema: validationSchema
    })
    const currentDate = new DateObject({calendar: persian})
    const minDate = new DateObject({calendar: persian}).add(2, 'days')
    const maxDate = new DateObject({calendar: persian}).add(10, 'days')

    return (
        <Container>
            <div>
                <span>نهایی کردن سبد خرید</span>
                <form onSubmit={formik.handleSubmit}>
                    <div>
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
                    <div>
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
                    <div>
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
                    <div style={{ direction: "rtl" }}>
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
                            // ${style.information__delivery__date}
                        />
                    </div>
                </form>
                <span>پرداخت</span>
            </div>
        </Container>
    );
};


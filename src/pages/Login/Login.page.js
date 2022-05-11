import React from 'react';
import {useFormik} from 'formik'
import * as yup from 'yup' ;
import style from "./_Login.module.scss"
import {useTheme} from "@mui/material";
import {loginApi} from "api/admin.api";
import {IS_LOGIN, TOKEN} from "configs/variables.config";
import {useNavigate} from "react-router";
import {PATH} from "configs/path.config";
import {PasswordComponent, UsernameComponent} from "./component/index";
import {Button} from "@material-ui/core";
import {LightTheme} from "assets/styles/themes/light/light.theme";




const validationSchema = yup.object({
    username: yup.string("نام کاربری خود را وارد کنید").required("این فیلد الزامی است!").min(5, "نام کاربری نباید کمتر از پنج حرف باشد!"),
    password: yup.string("رمز عبور خود را وارد کنید").required("این فیلد الزامی است!")
})


export const LoginPage = () => {

    const theme = useTheme()
    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values, event) => {
            loginApi(values).then(res=>{
                const {data , status} = res
                if(status===200){
                    localStorage.setItem(TOKEN , data.token )
                    localStorage.setItem(IS_LOGIN , "true")
                    navigate(`${PATH.DASHBOARD}/${PATH.ORDERS}`)
                }
            })

        },
        validationSchema: validationSchema,
    })

    return (
        <div className={style.loginPage}>
            <div className={style.wrapper}>
                <form onSubmit={formik.handleSubmit}
                      style={{color: theme.palette.medViolet}}>
                    <h1 style={{color: theme.palette.dark}}>ورود به پنل مدیریت فروشگاه پاپیون گالری</h1>
                    <UsernameComponent value={formik.values.username}
                                    id={"username"}
                                    onChange={formik.handleChange}
                                    error={formik.touched.username && Boolean(formik.errors.username)}
                                    helperText={formik.touched.username && formik.errors.username}/>
                    <PasswordComponent value={formik.values.password}
                                    id={"password"}
                                    onChange={formik.handleChange}
                                    error={formik.touched.password && Boolean(formik.errors.password)}
                                    helperText={formik.touched.password && formik.errors.password}/>
                    <Button onClick={formik.handleSubmit}
                            className={style.buttonHover}
                            size="medium"
                            variant="contained"
                            type="submit"
                            style={{backgroundColor:LightTheme.palette.button}}
                            >
                        ورود
                    </Button>
                </form>
            </div>
        </div>
    );
};

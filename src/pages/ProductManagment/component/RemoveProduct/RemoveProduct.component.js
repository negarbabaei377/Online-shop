import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Icon} from "@iconify/react/dist/iconify";
import {LightTheme} from "assets/styles/themes/light/light.theme";
import style from '../../_ProductManagment.module.scss'
import {deleteProduct} from "api/product.api";
import {toast} from "react-toastify";
import {getProduct} from "redux/actions/productAction";
import {useDispatch} from "react-redux";


export function RemoveProductComponent(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch()
    const deleteHandler=()=>{
        deleteProduct(props.id).then(res=>{
            toast.success("کالای موردنظر شما با موفقیت حذف گردید")
            setOpen(false);
            dispatch(getProduct())
        }).catch(error=>{
            toast.error("مشکلی در حذف کالای موردنظر شما پیش آمده است لطفا مجددا تلاش کنید")
        })
    }

    return (
        <div>
            <Icon icon="fluent:delete-48-filled"
                  color="#dc2626"
                  width="25"
                  className={style.iconStyle}
                  onClick={handleClickOpen}/>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title"
                             sx={{fontSize: "1.8rem"}}
                >
                    {"حذف کالا"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description"
                                       sx={{fontSize: "1.5rem"}}
                    >
                        آیا از حذف این کالا مطمئن هستید؟
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained"
                            onClick={handleClose}
                            style={{backgroundColor: LightTheme.palette.greenSuccess}}>انصراف</Button>
                    <Button variant="contained"
                            onClick={deleteHandler}
                            style={{backgroundColor: LightTheme.palette.redError}}
                            autoFocus>
                        حذف
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

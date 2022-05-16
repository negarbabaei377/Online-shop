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
import {Icon} from "@iconify/react/dist/iconify";
import style from "../../_ProductManagment.module.scss";
import {TextField} from "@material-ui/core";
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Select from "react-select";
import {REACT_APP_BASE_URL} from "configs/variables.config";
import image from "assets/image/png/default_image_01.png";
import {LightTheme} from "assets/styles/themes/light/light.theme";
import {useEffect, useState} from "react";
import {UploadApi} from "api/upload.api";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import * as yup from "yup";
import {putProduct} from "api/product.api";
import {getProduct} from "redux/actions/productAction";
import {useFormik} from "formik";


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

export function EditProductComponent(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [description, setDescription] = useState("")
    const [thumbnail, setThumbnail] = useState([])
    const [galleryImage, setGalleryImage] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const uploadImageChangeHandler = (event) => {
        const imageData = new FormData()
        imageData.append("image", event.target.files["0"], event.target.files["0"].name)
        UploadApi(imageData).then(res => {
            const {data: {filename}} = res;
            setThumbnail(filename)
        })
    }
    const uploadGalleryImageChangeHandler = (event) => {
        const galleryData = new FormData()
        galleryData.append("image", event.target.files["0"], event.target.files["0"].name)
        UploadApi(galleryData).then(res => {
            const {data: {filename}} = res;
            setGalleryImage(prevState => ([...prevState, filename]))
        }).catch(error => {
            toast.error("مشکلی در آپلود عکس کالا به وجود آمده است ، مجددا آپلود کنید")
        })
    }
    const deleteImageHandler = (item) => {
        const array = [...galleryImage]
        const newArray = array.filter(i => i !== item)
        setGalleryImage(newArray)
    }
    const productState = useSelector(state => state.productState.product)
    const productFilter = productState.filter(item => item.id === props.id)["0"]
    const productCategory = Number(productFilter.category)
    const categoryState = useSelector(state => state.categoryState.category)
    const categoryFilter =categoryState && categoryState.filter(item=>item.id ===productCategory)["0"]
    const options =categoryState && categoryState.map(item => {
        return {
            label: item.name,
            value: item.id
        }
    })

    useEffect(()=>{
        setThumbnail(productFilter.thumbnail)
        const gallery = [productFilter.galleryImage][0] && [productFilter.galleryImage][0].split(',')
        setGalleryImage(gallery)
    },[])

    const validationSchema = yup.object({
        count: yup.string("تعداد موجودی کالا را وارد کنید!").required("این فیلد الزامی است !"),
        price: yup.string("قیمت کالا را وارد کنید !").required("این فیلد الزامی است !").min(3, "قیمت کالا نباید کمتر از سه رقم باشد !"),
        name: yup.string("نام کالا را وارد کنید!").required("این فیلد الزامی است !"),
    })
    const dispatch = useDispatch()
    const onsubmit = (values) => {
        const data = new FormData()
        data.append("name", values.name)
        data.append("price", values.price)
        data.append("count", values.count)
        data.append("category", selectedOption.value)
        data.append("description", description)
        data.append("thumbnail", thumbnail)
        data.append("galleryImage", galleryImage)
        const serverData = Object.fromEntries(data)
        if (serverData.category === "undefined") {
            toast.error("دسته بندی کالای خود را انتخاب کنید")
        } else {
            if (serverData.thumbnail === "") {
                toast.error("تصویر شاخص کالای خود را آپلود کنید")
            } else {
                putProduct(props.id , serverData).then(res => {
                    toast.success("تغییرات با موفقیت ذخیره شد")
                    dispatch(getProduct())
                    setOpen(false);
                }).catch(error => {
                    toast.error("مشکلی در دخیره تغییرات به وجود آمده است لطفا مجددا تلاش کنید !")
                })
            }
        }
    }
    const formik = useFormik({
        initialValues: {
            name: productFilter.name,
            price: productFilter.price,
            count: productFilter.count,
        },
        onSubmit: onsubmit,
        validationSchema: validationSchema
    })


    return (
        <div>
            <Icon icon="fluent:edit-16-filled"
                  color="#495ed3"
                  width="25"
                  onClick={handleClickOpen}
                  className={style.iconStyle}
            />
            <form onSubmit={formik.handleSubmit}>
                <BootstrapDialog
                    onClose={handleClose}
                    aria-labelledby="customized-dialog-title"
                    open={open}
                >
                    <BootstrapDialogTitle id="customized-dialog-title"
                                          onClose={handleClose}>
                        ویرایش کالا
                    </BootstrapDialogTitle>
                    <DialogContent dividers>
                        <div>
                            <div>
                                <TextField
                                    style={{width: '100%'}}
                                    type="name"
                                    id="name"
                                    name="name"
                                    label="نام کالا"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    error={formik.touched.name && Boolean(formik.errors.name)}
                                    helperText={formik.touched.name && formik.errors.name}
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
                            <div className={style.inputStyle}>
                                <span>توضیحات</span>
                                <CKEditor
                                    editor={ClassicEditor}
                                    data={productFilter.description}
                                    onBlur={(event, editor) => {
                                        setDescription(editor.getData())
                                    }}
                                    config={{
                                        language: 'fa',
                                    }}
                                />
                            </div>

                            <div className={style.inputStyle}>
                                <div className={style.inputStyle}>
                                    <span>دسته بندی</span>
                                    <Select
                                        required
                                        isSearchable
                                        value={selectedOption}
                                        onChange={setSelectedOption}
                                        options={options}
                                        placeholder="انتخاب کنید"
                                        defaultInputValue={categoryFilter && categoryFilter.name}
                                    />
                                </div>
                            </div>
                            <div className={style.inputStyle}>
                                <TextField
                                    style={{width: '100%'}}
                                    type="price"
                                    id="price"
                                    name="price"
                                    label="قیمت کالا"
                                    value={formik.values.price}
                                    onChange={formik.handleChange}
                                    error={formik.touched.price && Boolean(formik.errors.price)}
                                    helperText={formik.touched.price && formik.errors.price}
                                    inputProps={{
                                        style: {
                                            fontSize: 15,
                                            direction: 'ltr'
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
                            <div className={style.inputStyle}>
                                <TextField
                                    style={{width: '100%'}}
                                    type="count"
                                    id="count"
                                    name="count"
                                    label="موجودی کالا"
                                    value={formik.values.count}
                                    onChange={formik.handleChange}
                                    error={formik.touched.count && Boolean(formik.errors.count)}
                                    helperText={formik.touched.count && formik.errors.count}
                                    inputProps={{
                                        style: {
                                            fontSize: 15,
                                            direction: 'ltr'
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
                            <span className={style.imageLabel}>تصویر شاخص</span>
                            <div className={style.uploadFile}>
                                <div>
                                    <input
                                        id="thumbNail"
                                        type="file"
                                        onChange={uploadImageChangeHandler}
                                    />
                                </div>

                                <div className={style.thumbnailStyle}>
                                    {thumbnail.length !== 0 ?
                                        <div className={style.containerStyle}>
                                            <img src={REACT_APP_BASE_URL + "/files/" + thumbnail}/>
                                            <div onClick={() => setThumbnail([])}
                                                 className={style.overlay}>برای حذف عکس کلیک کنید
                                            </div>
                                        </div>
                                        :
                                        <img src={image}/>
                                    }
                                </div>
                            </div>
                            <span className={style.imageLabel}>تصاویر گالری</span>
                            <div className={style.galleryUpload}>
                                <input
                                    id="galleryImage"
                                    type="file"
                                    onChange={uploadGalleryImageChangeHandler}
                                />
                                <div className={style.galleryStyle}>
                                    <div className={style.galleryImage}>
                                        {galleryImage && galleryImage.length !== 0 ?
                                            galleryImage.map((item, index) => {
                                                return <div className={style.containerGallery}
                                                            key={index}>
                                                    <img src={REACT_APP_BASE_URL + "/files/" + item}/>
                                                    <div onClick={() => deleteImageHandler(item)}
                                                         className={style.overlayGallery}>برای حذف عکس کلیک کنید
                                                    </div>
                                                </div>
                                            })
                                            : <div className={style.containerGallery}>
                                                <img src={image}/>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions style={{padding: "1rem"}}>
                        <Button
                            className={style.buttonHover}
                            type="submit"
                            style={{backgroundColor: LightTheme.palette.button, color: "black", fontSize: "1.2rem"}}
                            onClick={formik.handleSubmit}>
                            ذخیره تغییرات
                        </Button>
                    </DialogActions>
                </BootstrapDialog>
            </form>
        </div>
    );
}

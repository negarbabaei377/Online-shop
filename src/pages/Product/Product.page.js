import React, {useEffect} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {Container} from "@material-ui/core";
import style from './_Product.module.scss'
import {SliderImageComponent} from "./component";
import {useDispatch, useSelector} from "react-redux";
import {getProduct, getSingleProductId} from "redux/actions/productAction";
import {getCategory} from "redux/actions/categoryAction";
import {PATH} from 'configs/path.config';
import NumericInput from 'react-numeric-input';
import {ProductSliderComponent} from "component";
import {Icon} from '@iconify/react';

export const ProductPage = () => {
    const [productId, setProductId] = useSearchParams()

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getSingleProductId(productId.get("id")))
        dispatch(getCategory())
        dispatch(getProduct())
    }, [productId.get("id")])
    const productData = useSelector(state => state.productState.singleProduct)[0]
    const productImage = productData && (productData.galleryImage !== "" ? [productData.thumbnail, ...productData.galleryImage.split(",")] : [productData.thumbnail])
    const categoryData = useSelector(state => state.categoryState.category)
    const categoryId = productData && categoryData.find(item => +item.id === +productData.category)
    const allProduct = useSelector(state => state.productState.product).filter(item => item.category == productData?.category)
    const filterProduct = allProduct?.filter(item => item.id != productId.get("id"))

    const submitHandler = (e) => {
        e.preventDefault()
    }

    return (
        <Container>
            <div className={style.productPage}>
                <div className={style.wrapperSwiper}>
                    <SliderImageComponent images={productImage}/>
                </div>
                <div className={style.productInfo}>
                    <h1 className={style.title}>{productData?.name}</h1>
                    <span className={style.br}></span>
                    <div className={style.item}>
                        <span className={style.label}>دسته بندی : </span>
                        <Link to={PATH.CATEGORIES}
                              className={style.categoryName}>{categoryId?.name}</Link>
                    </div>
                    <div className={style.message}>
                        <div className={style.flex}>
                            <Icon icon="material-symbols:google-guarantee"
                                  color="#65a30d"
                                  width="22"
                                  height="22"
                                  inline={true}/>
                            <span>گارانتی اصالت و سلامت فیزیکی کالا</span>
                        </div>
                        <div className={style.flex}>
                            <Icon icon="fluent:send-copy-20-regular"
                                  color="#19bfd3"
                                  width="22"
                                  height="22"
                                  inline={true}/>
                            <span>ارسال رایگان برای سفارش بالای 500 هزار تومان</span>
                        </div>
                        {productData?.count <= 5 ? (productData?.count != 0 ?
                                <span className={style.error}>تنها {productData?.count} عدد در انبار باقی مانده است</span>
                                :
                                <span className={style.error}>اتمام موجودی محصول موردنظر</span>)
                            :
                            <div className={style.flex}>
                                <Icon icon="fluent:presence-available-10-regular"
                                      color="#65a30d"
                                      width="18"
                                      height="18"
                                      inline={true}/>
                                <span className={style.success}>موجود در انبار پاپیون گالری</span>
                            </div>
                        }
                    </div>

                    <div className={style.item}>
                        <span className={style.label}>قیمت : </span>
                        <span className={style.price}>{new Intl.NumberFormat().format(+productData?.price)} تومان</span>
                    </div>
                    <div className={style.item}>
                        <span className={style.label}>تعداد : </span>
                        <NumericInput
                            min={1}
                            max={+productData?.count}
                            value={1}
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
                            disabled={productData && (+productData.count === 0 && true)}
                        />
                    </div>
                    <form onSubmit={submitHandler}>
                        {+productData.count === 0 ?
                            <button
                                className={style.disableButton}
                                disabled={true}
                            >
                                افزودن به سبدخرید
                            </button>
                            :
                            <button
                                className={style.submitButton}
                            >
                                افزودن به سبدخرید
                            </button>
                        }
                    </form>
                    <div className={style.item}>
                        <span className={style.titleDescription}>توضیحات :</span>
                        {productData?.description ?
                            <div className={style.description}
                                 dangerouslySetInnerHTML={{__html: productData?.description}}/>
                            : <div className={style.description}>توضیحی برای این محصول وجود ندارد</div>
                        }
                    </div>
                </div>
            </div>
            <div className={style.similarProduct}>
                <span>محصولات مشابه</span>
                <ProductSliderComponent productData={filterProduct}/>
            </div>
        </Container>
    );
};


import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getCategory} from "redux/actions/categoryAction";
import {Container} from "@mui/material";
import style from './_Category.module.scss'
import {Link, useSearchParams} from "react-router-dom";
import {PATH} from 'configs/path.config'
import {getSingleCategory} from "redux/actions/productAction";
import {ProductCardComponent, ProductFoundComponent} from "component";
import Pagination from '@mui/material/Pagination';

export const CategoryPage = () => {
    const [categoryId, setCategoryId] = useSearchParams()
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)


    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategory())
        dispatch(getSingleCategory(categoryId.get("id"), page)).then(res => {
            setTotalPage(res["x-total-count"])
        })
    }, [])

    useEffect(() => {
        setPage(1)
        dispatch(getSingleCategory(categoryId.get("id"), page)).then(res => {
            setTotalPage(res["x-total-count"])
        })
    }, [categoryId])

    useEffect(() => {
        dispatch(getSingleCategory(categoryId.get("id"), page)).then(res => {
            setTotalPage(res["x-total-count"])
        })
    }, [page])


    const categoryData = useSelector(state => state.categoryState.category)
    const productData = useSelector(state => state.productState.singleCategory)

    const changeHandler = (event, page) => {
        setPage(page)
    }


    return (
        <Container>
            <div className={style.wrapper}>
                <div className={style.categories}>
                    <span>دسته بندی محصولات</span>
                    {categoryData?.map(item => {
                        return (
                            <Link className={style.link}
                                  style={{color: item.id == categoryId.get("id") ? "#9789ff" : "black"}}
                                  to={PATH.CATEGORIES + `?id=` + item.id}
                                  key={item.id}>{item.name}</Link>
                        )
                    })}
                </div>
                {productData.length ?
                    (

                        <div className={style.categoryCard}>
                            {productData?.map(item => {
                                return (
                                    <ProductCardComponent image={item.thumbnail}
                                                          name={item.name}
                                                          price={item.price}
                                                          count={item.count}
                                                          key={item.id}
                                                          id={item.id}
                                    />
                                )
                            })}
                        </div>)
                    :
                    <ProductFoundComponent name={"دسته بندی"} />
                }
            </div>
            <div className={style.page}>
                <Pagination onChange={changeHandler}
                            count={Math.ceil(totalPage / 6)}
                            variant="outlined"
                            color="secondary"
                            page={page}
                />
            </div>
        </Container>
    );
};


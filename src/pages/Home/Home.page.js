import React, {useEffect} from 'react';
import {MainSliderComponent, ProductSliderComponent} from "component/index";
import {useDispatch, useSelector} from "react-redux";
import {getProduct} from "redux/actions/productAction";
import {getCategory} from "redux/actions/categoryAction";
import style from './_Home.module.scss';
import {Container} from "@material-ui/core";
import image1 from 'assets/image/jpg/Group-6.jpg'
import image2 from 'assets/image/jpg/Group-7.jpg'
import image3 from 'assets/image/jpg/Group-8.jpg'
import ScrollToTop from "react-scroll-to-top";
import {Link} from "react-router-dom";
import {PATH} from "configs/path.config";


export const HomePage = () => {

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProduct())
        dispatch(getCategory())
    }, [])

    const productData = useSelector(state => state.productState.product)
    const categoryData = useSelector(state => state.categoryState.category)
    const categoryId = categoryData && categoryData.map(item => {
        return item.id
    })
    const group1 = categoryData && categoryData.slice(0, 2)
    const group2 = categoryData && categoryData.slice(categoryData.length - 2, categoryData.length)

    return (
        <div>
            <Container>
                <MainSliderComponent/>
            </Container>
            <div className={style.galleryImage}>
                <div><Link to={PATH.CATEGORIES + '?id=6'}><img src={image1}/></Link></div>
                <div><Link to={PATH.CATEGORIES + '?id=8'}><img src={image2}/></Link></div>
                <div><Link to={PATH.CATEGORIES + '?id=9'}><img src={image3}/></Link></div>
            </div>
            <Container>
                {group1 && group1.map(category => {
                    const product = productData && productData.filter(item => item.category == category.id)
                    return (
                        <div key={category.id}>
                            <div className={style.titleStyle}>
                                <Link to={PATH.CATEGORIES + '?id=' + category.id}
                                      className={style.title}>{category.name}</Link>
                                <span className={style.br}></span>
                            </div>
                            <ProductSliderComponent productData={product}/>
                        </div>
                    )
                })}
            </Container>
            <div className={style.background}>
                <div className={style.text}>
                    <span> با پاپیون گالری ، همیشه به روز باشید :)</span>
                </div>
            </div>
            <Container>
                {group2 && group2.map((category) => {
                    const product = productData && productData.filter(item => item.category == category.id)
                    return (
                        <div key={category.id}>
                            <div className={style.titleStyle}>
                                <Link to={PATH.CATEGORIES + '?id=' + category.id}
                                      className={style.title}>{category.name}</Link>
                            <span className={style.br}></span>
                        </div>
                    <ProductSliderComponent productData={product}/>
                </div>
                )
                })}
            </Container>
            <ScrollToTop smooth
                         color="white"
                         width="35"
                         height="45"
                         style={{backgroundColor: "#b4aafc"}}
            />
        </div>
    );
};


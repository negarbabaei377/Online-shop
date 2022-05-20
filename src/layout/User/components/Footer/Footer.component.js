import React from 'react';
import image1 from 'assets/image/jpg/لوگو-رسانه-سوخته-نگاری.jpg'
import image2 from 'assets/image/png/enamad.png'
import image3 from 'assets/image/png/3.png'
import style from './_Footer.module.scss'

export const FooterComponent = (props) => {
    return (
        <div className={style.wrapper}>
            <div className={style.cont}>
                <div className={style.info}>
                    <span>قوانین سایت</span>
                    <span>درباره ما</span>
                    <span>تماس با ما</span>
                    <span>سوالات متداول</span>
                </div>
                <div className={style.image}>
                    <div>
                        <img src={image3}/>
                    </div>
                    <div>
                        <img src={image2}/>
                    </div>
                    <div>
                        <img src={image1}/>
                    </div>
                </div>
                <div className={style.address}>
                    <p>آدرس : کرج / ایران زمین / خیابان نواب صفوی / پاپیون گالری</p>
                    <p>شماره تماس : 09302011621</p>
                </div>
            </div>
        </div>
    );
};


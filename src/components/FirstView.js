import { useState, useEffect } from 'react';
import * as style from '../styles/module/_first-view.module.scss';
import * as fadein from '../styles/module/_fadein.module.scss';

const FirstView = () => {
    const [fadeIn, setFadeIn] = useState( false );
    const [imgFadeIn, setImgFadeIn] = useState( false );

    useEffect(() => {
        setTimeout(() => {
            setImgFadeIn( true );
        }, 100);
    },[])
    
    useEffect(() => {
        setTimeout(() => {
            setFadeIn( true );
        }, 600);
    }, []);

    const imageArr = ['01','02','03'];


    return (
        <div className={style.firstView}>
            <div className={`${style.firstView__container} ${fadein.animation} ${fadeIn ? fadein.active: ''}`}>
                <span className={style.firstView__iam}>I&ldquo;m a</span>
                <div className={style.firstView__role}>
                    <p className={style.role__name}>Web Front-End Developer</p>
                    <p className={style.role__name}>DOUJIN Creator</p>
                    <div className={style.firstView__role__doujin}>
                        <ul>
                            <li>Illustration</li>
                            <li>Graphic Design</li>
                            <li>Manga</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={style.imageContainer}>
                <ul className={`${fadein.animation} ${imgFadeIn ? fadein.active: ''}`}>
                    {imageArr.map( (item, ind) => 
                        <li key={ind}>{item}</li>
                    )}
                </ul>
            </div>
            <div className={style.scrollDownBoxContainer}>
                <div className={style.scrollDownBox}>
                    <div className={style.circle}></div>
                    <div className={style.circle}></div>
                    <p className={style.circleInner}>
                        <span>SCROLL</span>
                        <span>DOWN</span>
                    </p>
                    <div className={style.centerBorder}></div>
                </div>
            </div>
        </div>
    )
};

export default FirstView;
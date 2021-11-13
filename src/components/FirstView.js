import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as style from '../styles/module/_first-view.module.scss';
import * as fadein from '../styles/module/_fadein.module.scss';

const FirstView = () => {
    const [ fadeIn, setFadeIn ] = useState( false );
    const [ imgFadeIn, setImgFadeIn ] = useState( false );

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



    return (
        <div className={style.firstView}>
            <div className={`${style.firstView__arm} ${fadein.animation} ${imgFadeIn ? fadein.active: ''}`}>
                <Image
                    src='/images/bg_arm.png'
                    alt='arm'
                    width={1836/4}
                    height={3486/4}
                />
            </div>
            <div  className={`${style.firstView__sign} ${fadein.animation} ${imgFadeIn ? fadein.active: ''}`}>
                <Image
                    src='/images/sign.png'
                    alt='sign'
                    width={1280/10}
                    height={1440/10}
                />
            </div>
            <div className={`${style.firstView__container} ${fadein.animation} ${fadeIn ? fadein.active: ''}`}>
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
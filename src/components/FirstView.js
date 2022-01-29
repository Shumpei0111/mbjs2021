import { useState, useEffect } from 'react';
import Image from 'next/image';
import * as style from '../styles/module/_first-view.module.scss';
import * as fadein from '../styles/module/_fadein.module.scss';
import { motion } from 'framer-motion';

const FirstView = () => {
    const [ fadeIn, setFadeIn ] = useState( false );
    const [ imgFadeIn, setImgFadeIn ] = useState( false );

    const toTopPosition = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0 })
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setImgFadeIn( true );
            toTopPosition();
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
                        src='/images/arm_and_sign.png'
                        alt='arm'
                        width={2040/4}
                        height={3680/4}
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
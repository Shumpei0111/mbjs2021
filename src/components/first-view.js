import { useState, useEffect } from 'react';
import * as style from '../styles/module/_first-view.module.scss';
import * as fadein from '../styles/module/_fadein.module.scss';

const FirstView = () => {
    const [fadeIn, setFadeIn] = useState( false );
    
    useEffect(() => {
        setTimeout(() => {
            setFadeIn( true );
        }, 600)
    }, [])


    return (
        <div className={style.firstView}>
            <div className={`${style.firstView__container} ${fadein.animation} ${fadeIn ? fadein.active: ''}`}>
                <span className={style.firstView__iam}>I'm a</span>
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
        </div>
    )
};

export default FirstView;
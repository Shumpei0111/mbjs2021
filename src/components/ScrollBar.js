import { useState, useEffect, useRef, useCallback } from 'react';

import * as style from '../styles/module/_scrollBar.module.scss';

const ScrollBar = () => {
    const [ scrollHeight, setScrollHeight ] = useState(0);

    const isRunning = useRef(false); // スクロール多発防止用フラグ

    // リスナに登録
    const scrollController = useCallback(() => {
        if( isRunning.current ) return;
        isRunning.current = true;

        const Y = window.pageYOffset;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (Y / height) * 100;
        setScrollHeight(scrolled);
        isRunning.current = false;
    });
    

    useEffect(() => {
        document.addEventListener('scroll', scrollController, { passive: true });
        return () => {
            document.removeEventListener('scroll', scrollController, { passive: true })
        }
    }, []);

    return (
        <div id='scrollBar' className={style.scrollBar}>
            <div style={{ height: `${scrollHeight}%` }} className={`${style.scrollBar__bar}`} />
        </div>
    )
};

export default ScrollBar;
import Link from 'next/link'
import { useState } from 'react';

import Hamburger from './hamburger';

import * as style from '../styles/module/_header.module.scss';

const Header = () => {
    const [open, setOpen] = useState( false );

    const toggleModal = () => {
        if( !open ) setOpen( true );
        else setOpen( false );
    }


    return (
        <header className={style.headerContainer}>
            <Link href='/'>
                    <a className={style.headerLogo}>      
                        <p className={style.headerLogo__subtitle}>Shumpei’s portfolio site:</p>
                        <h1>                        
                            MB.js
                        </h1>
                    </a>
            </Link>
            <button aria-label='navigation' onClick={toggleModal} className={style.burgerContainer}>
                <div className={`${style.burger} ${open ? style.burger__open : ""}`}>
                    <div className={style.burger__bar} />
                    <div className={style.burger__bar} />
                    <div className={style.burger__bar} />
                    <span className={style.burger__str}>MENU</span>
                </div>
            </button>
            <Hamburger isOpen={open} />
        </header>
    )
};

export default Header;
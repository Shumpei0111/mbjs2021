import Link from 'next/link'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import Hamburger from './Hamburger';

import * as style from '../styles/module/_header.module.scss';

const Header = () => {
    const [open, setOpen] = useState( false );
    const router = useRouter();
    const pathname = router.pathname.slice(1);

    const isHome = pathname === '';
    const isBlog = pathname.match(/^archives/) || pathname.match(/^articles/);
    const isAbout = pathname.match(/^about/);
    const isContact = pathname.match(/^contact/);

    const toggleModal = () => {
        if( !open ) setOpen( true );
        else setOpen( false );
    }

    // useEffect(() => {
    //     if( open ) {
    //         document.documentElement.style.overflowY = 'hidden';
    //     } else {
    //         document.documentElement.style.overflowY = '';

    //     }
    // }, [open])


    return (
        <div className={style.header}>
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
                <Hamburger isOpen={open} toggleModal={toggleModal} pathname={pathname} />
            </header>
            <div className={`${style.breadcrumbs} ${isHome ? style.breadcrumbs__notShow : ''}`}>
                {
                    !isHome ? <Link href='/'><a>HOME</a></Link> : <></> 
                }
                {
                    isBlog ? <><span className={style.breadcrumbs__slash}>&#047;</span><Link href='/archives/1'><a className={style.breadcrumbs__item}>BLOG</a></Link></> : <></>
                }
                {
                    isAbout ? <><span className={style.breadcrumbs__slash}>&#047;</span><Link href='/about'><a className={style.breadcrumbs__item}>ABOUT</a></Link></> : <></>
                }
                {
                    isContact ? <><span className={style.breadcrumbs__slash}>&#047;</span><Link href='/contact'><a className={style.breadcrumbs__item}>CONTACT</a></Link></> : <></>
                }
            </div>
        </div>
    )
};

export default Header;
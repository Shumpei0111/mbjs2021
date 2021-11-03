import { useState } from 'react';
import Link from 'next/link';

import * as style from '../styles/module/_hambergur.module.scss';

const Hamburger = (props) => {
    const [ blogHover, setBlogHover ] = useState( false );
    const [ aboutHover, setAboutHover ] = useState( false );
    const [ contactHover, setContactHover ] = useState( false );

    const toggleBlogHover = () => setBlogHover( !blogHover );
    const toggleAboutHover = () => setAboutHover( !aboutHover );
    const toggleContactHover = () => setContactHover( !contactHover );

    const isOpen = props.isOpen;
    const pathname = props.pathname;

    const isBlog = pathname.match(/^archives/) || pathname.match(/^articles/);
    const isAbout = pathname.match(/^about/);
    const isContact = pathname.match(/^contact/);

    return (
        <nav id='hamburger' className={`${style.burgerMenu}`}>
            <div className={
                `${style.burgerMenuContainer} ${isOpen ? style.burgerIsOpen: style.burgerIsHidden} ${isOpen && blogHover ? style.burgerMenu__blogHover : '' } ${isOpen && aboutHover ? style.burgerMenu__aboutHover : '' } ${isOpen && contactHover ? style.burgerMenu__contactHover : '' }`}>
                <div className={style.burgerMenu__items}>
                    <ul>
                        <li className={`${style.burgerMenuItem} ${isBlog ? style.currentOpenPage : ''}`
                        }>
                            <Link href='/archives/1'>
                                <a 
                                onMouseEnter={toggleBlogHover}
                                onMouseLeave={toggleBlogHover}>Blog</a>
                            </Link>
                        </li>

                        <li className={`${style.burgerMenuItem} ${isAbout ? style.currentOpenPage : ''}`
                        }>
                            <Link href='/about'>
                                <a 
                                onMouseEnter={toggleAboutHover}
                                onMouseLeave={toggleAboutHover}>About</a>
                            </Link>
                        </li>

                        <li className={`${style.burgerMenuItem} ${isContact ? style.currentOpenPage : ''}`}>
                            <Link href='/contact'>
                                <a
                                onMouseEnter={toggleContactHover}
                                onMouseLeave={toggleContactHover}>Contact</a>
                            </Link>
                        </li>
                    </ul>
                </div>
                <p className={style.burgerMenu__siteTitle}>shumpei&#39;s portfolio - [MB.js]</p>
            </div>
        </nav>
    )
};

export default Hamburger;
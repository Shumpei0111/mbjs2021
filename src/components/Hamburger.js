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

    const handlClick = () => { props.toggleModal() }

    return (
        <nav id='hamburger' className={`${style.burgerMenu}`}>
            <div className={
                `${style.burgerMenuContainer} ${isOpen ? style.burgerIsOpen: style.burgerIsHidden} ${isOpen && blogHover ? style.burgerMenu__blogHover : '' } ${isOpen && aboutHover ? style.burgerMenu__aboutHover : '' } ${isOpen && contactHover ? style.burgerMenu__contactHover : '' }`}>
                <div className={style.burgerMenu__items}>
                    <ul>
                        <li onClick={handlClick} className={`${style.burgerMenuItem} ${isBlog ? style.currentOpenPage : ''}`
                        }>
                            <Link
                                href='/archives/1'
                                onMouseEnter={toggleBlogHover}
                                onMouseLeave={toggleBlogHover}>
                                Blog
                            </Link>
                        </li>

                        <li onClick={handlClick} className={`${style.burgerMenuItem} ${isAbout ? style.currentOpenPage : ''}`
                        }>
                            <Link
                                href='/about'
                                onMouseEnter={toggleAboutHover}
                                onMouseLeave={toggleAboutHover}>
                                About
                            </Link>
                        </li>

                        <li onClick={handlClick} className={`${style.burgerMenuItem} ${isContact ? style.currentOpenPage : ''}`}>
                            <Link
                                href='/contact'
                                onMouseEnter={toggleContactHover}
                                onMouseLeave={toggleContactHover}>
                                Contact
                            </Link>
                        </li>
                        <li>
                            <span onClick={handlClick}>
                                <Link href="/" className={style.burger__homeLink}>
                                    <span>HOME</span>
                                </Link>
                            </span>
                        </li>
                    </ul>
                </div>
                <p className={style.burgerMenu__siteTitle}>Shumpei portfolio - [MB.js]</p>
            </div>
        </nav>
    );
};

export default Hamburger;
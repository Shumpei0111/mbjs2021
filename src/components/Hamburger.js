import Link from 'next/link';

import * as style from '../styles/module/_hambergur.module.scss';

const Hamburger = (props) => {
    const isOpen = props.isOpen;
    const pathname = props.pathname;

    const isBlog = pathname.match(/^archives/);
    const isAbout = pathname.match(/^about/);
    const isContact = pathname.match(/^contact/);

    return (
        <nav id='hamburger' className={style.burgerMenu}>
            <div className={`${style.burgerMenuContainer} ${isOpen ? style.burgerIsOpen: style.burgerIsHidden}`}>
                <div className={style.burgerMenu__items}>
                    <ul>
                        <li className={`${style.burgerMenuItem} ${isBlog ? style.currentOpenPage : ''}`}>
                            <Link href='/archives/1'><a>Blog</a></Link>
                        </li>
                        <li className={`${style.burgerMenuItem} ${isAbout ? style.currentOpenPage : ''}`}>
                            <Link href='/about'><a>About</a></Link>
                        </li>
                        <li className={`${style.burgerMenuItem} ${isContact ? style.currentOpenPage : ''}`}>
                            <Link href='/contact'><a>Contact</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Hamburger;
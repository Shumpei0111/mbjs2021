import Link from 'next/link';

import * as style from '../styles/module/_hambergur.module.scss';

const Hamburger = (props) => {
    const isOpen = props.isOpen;

    return (
        <nav id='hamburger' className={style.burgerMenu}>
            <div className={`${style.burgerMenuContainer} ${isOpen ? style.burgerIsOpen: style.burgerIsHidden}`}>
                <div className={style.burgerMenu__items}>
                    <ul>
                        <li className={style.burgerMenuItem}>
                            <Link href='/blog'><a>Blog</a></Link>
                        </li>
                        <li className={style.burgerMenuItem}>
                            <Link href='/about'><a>About</a></Link>
                        </li>
                        <li className={style.burgerMenuItem}>
                            <Link href='/contact'><a>Contact</a></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default Hamburger;
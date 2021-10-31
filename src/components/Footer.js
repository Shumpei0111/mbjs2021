import Link from 'next/link';
import * as style from '../styles/module/_footer.module.scss';

const Footer = () => {
    return (
        <footer className={style.footerContainer}>
            <div className={style.footerTopBorder} />
            <ul className={style.footerLinks}>
                <li className={style.footerLinks__item}>
                    <Link href='/archives/1'><a>Blog</a></Link>
                </li>
                <li className={style.footerLinks__item}>
                    <Link href='/about'><a>About</a></Link>
                </li>
                <li className={style.footerLinks__item}>
                    <Link href='/contact'><a>Contact</a></Link>
                </li>
            </ul>
            <address translate='no' className={style.footer__address}>copyright 2021 Shumpei All Rights Reserved.</address>
        </footer>
    )
};

export default Footer;
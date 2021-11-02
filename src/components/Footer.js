import Link from 'next/link';
import { useRouter } from 'next/router';
import * as style from '../styles/module/_footer.module.scss';

const Footer = () => {
    const router = useRouter();
    const pathname = router.pathname.slice(1);

    const isBlog = pathname.match(/^archives/) || pathname.match(/^articles/);
    const isAbout = pathname.match(/^about/);
    const isContact = pathname.match(/^contact/);

    return (
        <footer className={style.footerContainer}>
            <div className={style.footerTopBorder} />
            <ul className={style.footerLinks}>
                <li className={`${style.footerLinks__item} ${isBlog ? style.currPage : ''}`}>
                    <Link href='/archives/1'><a>Blog</a></Link>
                </li>
                <li className={`${style.footerLinks__item} ${isAbout ? style.currPage : ''}`}>
                    <Link href='/about'><a>About</a></Link>
                </li>
                <li className={`${style.footerLinks__item} ${isContact ? style.currPage : ''}`}>
                    <Link href='/contact'><a>Contact</a></Link>
                </li>
            </ul>
            <address translate='no' className={style.footer__address}>copyright 2021 Shumpei All Rights Reserved.</address>
        </footer>
    )
};

export default Footer;
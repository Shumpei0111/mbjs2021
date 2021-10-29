import * as style from '../styles/module/_footer.module.scss';

const Footer = () => {
    return (
        <footer className={style.footerContainer}>
            <div class={style.footerTopBorder} />
            <ul className={style.footerLinks}>
                <li className={style.footerLinks__item}>Blog</li>
                <li className={style.footerLinks__item}>About</li>
                <li className={style.footerLinks__item}>Contact</li>
            </ul>
            <address translate='no' className={style.footer__address}>copyright 2021 Shumpei All Rights Reserved.</address>
        </footer>
    )
};

export default Footer;
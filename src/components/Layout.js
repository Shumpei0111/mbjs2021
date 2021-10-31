import Header from "./Header";
import Footer from "./Footer";

import * as style from '../styles/bg.module.scss';

const Layout = (props) => {
    return (
        <>
            <div className={style.noise} />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </>
    )
};

export default Layout;
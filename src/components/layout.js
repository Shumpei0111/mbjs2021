import Header from "./header";
import Footer from "./footer";

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
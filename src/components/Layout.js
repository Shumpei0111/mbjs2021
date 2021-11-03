import { useEffect } from "react";

import Header from "./Header";
import Footer from "./Footer";

import * as style from '../styles/bg.module.scss';
import * as layoutStyle from '../styles/module/_layout.module.scss';

const Layout = (props) => {
    
    return (
        <div id='mainContainer' className={layoutStyle.mainContainer}>
            <div className={style.noise} />
            <Header />
            <main>{props.children}</main>
            <Footer />
        </div>
    )
};

export default Layout;
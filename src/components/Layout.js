import { motion } from 'framer-motion';

import Header from "./Header";
import Footer from "./Footer";
import ScrollBar from "./ScrollBar";

import * as style from '../styles/bg.module.scss';
import * as layoutStyle from '../styles/module/_layout.module.scss';

const transition = {
	duration: 1,
	ease: [0.43, 0.13, 0.23, 0.96]
};

const backVariants = {
	exit: { x: 60, opacity: 0, transition },
	enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } }
};

const Layout = (props) => {
    
    return (
        <div id='mainContainer' className={layoutStyle.mainContainer}>
            <ScrollBar />
            <div className={style.noise} />
            <motion.div
				initial="exit"
				animate="enter"
				exit="exit"
			>
                <Header />
                <motion.div variants={backVariants}>
                    <main>{props.children}</main>
                </motion.div>
                <Footer />
            </motion.div>
        </div>
    )
};

export default Layout;
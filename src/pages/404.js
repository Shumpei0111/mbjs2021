import Link from 'next/link';

import Layout from "../components/Layout";
import TopMarquee from "../components/TopMarquee";

import * as style from '../styles/module/_404.module.scss';

const NotFoundPage = () => {
    return (
        <Layout>
            <div className={style.notFoundContainer}>
                <p>ここには何もありません。</p>
                <p>下記コンテンツをお楽しみください。</p>
                <div className={style.anotherContents}>
                    <div className={style.anotherContents__item}>
                        <Link href='/archives/1'>
                            <a>Blog</a>
                        </Link>
                    </div>
                </div>
            </div>
            <TopMarquee />
        </Layout>
    )
}

export default NotFoundPage;
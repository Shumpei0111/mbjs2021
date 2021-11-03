import fs from 'fs';

import Link from 'next/link';
import Layout from '../../components/Layout';
import { Pagination } from '../../components/Pagination';
import { listContentFiles, readContentFiles } from '../../lib/content-loader';
import arrangeDate from '../../lib/arrange-date';
import * as style from '../../styles/module/_page_articles.module.scss';

const COUNT_PER_PAGE = 10;

export default function Archive(props) {
    const { posts, page, total, perPage } = props;

    return (
        <Layout>
            <h2 className={style.article__h2}>BLOG</h2>
            <div className={style.articleContainer}>
                {posts.map((post) => 
                    <div className={style.articleWrapper} key={post.slug}>
                        <Link href='/articles/[slug]' as={`/articles/${post.slug}`}>
                            <a className={style.articleLink}>
                                <p className={style.articleTitle}>{post.title}</p>
                                <p className={style.postedDate}>posted at: {arrangeDate(post.date)}</p>
                            </a>
                        </Link>
                    </div>
                )}

                <Pagination
                    total={total} perPage={perPage}
                    href='/archives/[page]' callBack={(page) => `/archives/${page}`} />
            </div>
        </Layout>
    )
}


export async function getStaticProps({ params }) {
    const page = parseInt(params.page, 10);
    const end  = COUNT_PER_PAGE * page;
    const start = end - COUNT_PER_PAGE;
    const posts = await readContentFiles({ fs });

    const orderdPosts = posts.sort( (a, b) => {
        return ( a.date > b.date ) ? -1 : 1;
    } )

    return {
        props: {
            posts: orderdPosts.slice(start, end),
            page,
            total: posts.length,
            perPage: COUNT_PER_PAGE
        }
    };
};



export async function getStaticPaths() {
    // const posts = ((context) => {
    //     const keys = context.keys();
    //     const data = keys.map((key, ind) => {
    //         let slug = key.replace(/^.*[\\\/]/, '').slice( 0, -3 );
    //         return slug;
    //     });

    //     return data;
    // })(require.context('../../content/', true, /\.md$/));
    const posts = await listContentFiles({ fs });

    const pages = range(Math.ceil(posts.length / COUNT_PER_PAGE));
    const paths = pages.map((page) => {
        return {
            params: { 'page': `${page}` }
        }
    });

    return {
        paths: paths,
        fallback: false
    };
};


//ユーティリティ: 1 から指定された整数までを格納した Array を返す
function range(stop) {
    return Array.from({ length: stop }, (_, i) => i + 1)
}
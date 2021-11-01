import fs from 'fs';

import Link from 'next/link';
import Layout from "../../components/Layout";
import { Pagination } from '../../components/Pagination';
import { listContentFiles, readContentFiles } from '../../lib/content-loader';

const COUNT_PER_PAGE = 10;

export default function Archive(props) {
    const { posts, page, total, perPage } = props;
    return (
        <Layout>
            {posts.map((post) => 
                <div key={post.slug}>
                    <Link href='/articles/[slug]' as={`/articles/${post.slug}`}>{post.title}</Link>
                </div>
            )}

            <Pagination
                page={page} total={total} perPage={perPage}
                href='/archives/[page]' callBack={(page) => `/archives/${page}`} />
        </Layout>
    )
}


export async function getStaticProps({ params }) {
    const page = parseInt(params.page, 10);
    const end  = COUNT_PER_PAGE * page;
    const start = end - COUNT_PER_PAGE;
    // TODO
    // postsは新しい投稿から順に返すように
    const posts = await readContentFiles({ fs });

    return {
        props: {
            posts: posts.slice(start, end),
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
import Link from 'next/link';
import matter from "gray-matter";

import { Pagination } from '../components/Pagination';
import Layout from '../components/Layout';

import * as style from '../styles/module/_page_blog.module.scss';

const Blog = (props) => {
    return(
        <>
            <Layout>
                <Pagination totalCount={10} />
                <div className={style.blogTop}>
                    <h2 className={style.blogTop__h2}>Blog</h2>
                    {props.blogs.map( (blog, ind) => 
                        <Link href={`/articles/${blog.slug}`} key={blog.slug}>
                            <a>
                            <div className={style.blogs}>
                                <div className={style.blogs__wrapper}>
                                    <p>{blog.frontmatter.title}</p>
                                    <p>posted: {blog.frontmatter.date}</p>
                                </div>
                                [Read More...]
                            </div>
                            </a>
                        </Link>
                    )}
                </div>
            </Layout>
        </>
    )
}
export default Blog;

const COUNT_PER_PAGE = 10;
const range = (stop) => {
    return Array.from({ length: stop }, (_, i) => i + 1);
}

export async function getStaticPaths() {
    const blogSlugs = ( (context) => {
        const keys = context.keys();
        const data = keys.map((key, ind) => {
            let slug = key.replace( /^.*[\\\/]/, '' ).slice( 0, -3 );
            return slug;
        });

        return data;
    } )( require.context( '../content/', true, /\.md$/ ) );

    const pages = range(Math.ceil( blogSlugs.length / COUNT_PER_PAGE ));
    const paths = pages.map((page) => ({
        params: { page: `${page}` }
    }));

    return {
        paths: paths,
        fallback: false
    };
};

export async function getStaticProps({ params }) {
    const blogs = ( function(context) {
        const keys = context.keys();
        const vals = keys.map( context );

        const data = keys.map(( key, ind ) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice(0, -3);
            const val = vals[ ind ];
            const document = matter( val.default );

            return {
                frontmatter: JSON.parse( JSON.stringify(document.data) ),
                slug: slug
            }
        });


        return {
            props: {
                data: data,
            }
        };
        
    } )(require.context('../content/', true, /\.md$/));

    const orderedBlogs = blogs.props.data.sort( (a, b) => {
        return (a.frontmatter.date > b.frontmatter.date) ? -1 : 1;
    } );


    const page = parseInt( params.page, 10 );
    const end = COUNT_PER_PAGE * page;
    const start = end - COUNT_PER_PAGE;

    console.log(136, start, orderdBlogs);


    return {
            props: {
                blogs: orderedBlogs
            }
        // props: {
        //     blogs: orderedBlogs.slice(start. end),
        //     page: page,
        //     total: orderedBlogs.length,
        //     perPage: COUNT_PER_PAGE,
        // },
    }
};
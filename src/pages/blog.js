import Link from 'next/link';
import matter from "gray-matter";
import Layout from '../components/layout';

import * as style from '../styles/module/_page_blog.module.scss';

const Blog = (props) => {
    return(
        <>
            <Layout>
                <div className={style.blogTop}>
                    <h2 className={style.blogTop__h2}>Blog</h2>
                    {props.blogs.map( (blog, ind) => 
                        <Link href={`/blog/${blog.slug}`}>
                            <a>
                            <div className={style.blogs} key={ind}>
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


export async function getStaticProps() {
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

        return data;
        
    } )(require.context('../content/', true, /\.md$/));

    const orderedBlogs = blogs.sort( (a, b) => {
        return (a.frontmatter.date > b.frontmatter.date) ? -1 : 1;
    } );


    return {
        props: {
            blogs: orderedBlogs
        },
    }
};
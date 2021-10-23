import Link from 'next/link';
import matter from "gray-matter";
import Layout from '../components/layout';

const Blog = (props) => {
    return(
        <>
            <Layout>
                <h1>Blog page</h1>
                {props.blogs.map( (blog, ind) => 
                    <div key={ind}>
                        <h3>{blog.frontmatter.title}</h3>
                        <p>{blog.frontmatter.date}</p>
                        <Link href={`/blog/${blog.slug}`}><a>Read More</a></Link>
                    </div>
                )}
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
                frontmatter: document.data,
                slug: slug
            }
        });

        return data;
        
    } )(require.context('../content/', true, /\.md$/));

    const orderedBlogs = blogs.sort( (a, b) => {
        return b.frontmatter.id - a.frontmatter.id;
    } );


    return {
        props: {
            blogs: orderedBlogs
        },
    }
};
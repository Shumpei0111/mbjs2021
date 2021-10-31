import Link from 'next/link';

import matter from "gray-matter";
import ReactMarkdown from "react-markdown";
import Layout from '../../components/Layout';


const SingleBlog = (props) => {
    return (
        <Layout>
            <h1>{props.frontmatter.data.title}</h1>
            <p>{props.frontmatter.data.date}</p>
            <ReactMarkdown>
                {props.markdownBody}
            </ReactMarkdown>
            <Link href='/archives'><a>back to Blog-Top</a></Link>
        </Layout>
    )
}

export default SingleBlog;

export async function getStaticPaths() {
    const blogSlugs = ( (context) => {
        const keys = context.keys();
        const data = keys.map((key, ind) => {
            let slug = key.replace( /^.*[\\\/]/, '' ).slice( 0, -3 );
            return slug;
        });

        return data;
    } )( require.context( '../../content/', true, /\.md$/ ) );

    const paths = blogSlugs.map((blogSlug) => `/articles/${blogSlug}`);

    return {
        paths: paths,
        fallback: false,
    }
}


export async function getStaticProps(context) {
    const { slug } = context.params;
    const data = await import( `../../content/${slug}.md` );
    const singleDocument = matter( data.default );

    return {
        props: {
            frontmatter: JSON.parse( JSON.stringify( singleDocument ) ),
            markdownBody: singleDocument.content,
        }
    }
};
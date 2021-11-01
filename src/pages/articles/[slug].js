import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../../components/CodeBlock";
import Layout from "../../components/Layout";

import gfm from 'remark-gfm';

import * as style from '../../styles/module/_page_singleBlog.module.scss';

const SingleBlog = (props) => {
    return (
        <Layout>
            <div className={style.singleBlog}>
                <p className={style.singleBlog__title}>{props.frontmatter.title}</p>
                <p className={style.singleBlog__date}>posted at: {props.frontmatter.date}</p>
                <ReactMarkdown
                    components={{code: CodeBlock}}
                    children={props.markdownBody}
                    remarkPlugins={[gfm]}
                />
            </div>
        </Layout>
    )
};

export default SingleBlog;


export async function getStaticPaths() {
    const blogSlugs = ((context) => {
        const keys = context.keys();
        const data = keys.map((key, ind) => {
            let slug = key.replace(/^.*[\\\/]/, '').slice( 0, -3 );
            return slug;
        });

        return data;
    })(require.context('../../content/', true, /\.md$/));

    const paths = blogSlugs.map((blogSlug) => `/articles/${blogSlug}`);

    return {
        paths: paths,
        fallback: false,
    };
}

export async function getStaticProps(context) {
    const { slug } = context.params;
    const data = await import(`../../content/${slug}.md`);
    const singleDocument = matter(data.default);

    return {
        props: {
            frontmatter: JSON.parse(JSON.stringify(singleDocument.data)),
            markdownBody: singleDocument.content,
        }
    }
}
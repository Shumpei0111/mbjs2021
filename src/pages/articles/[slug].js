import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../../components/CodeBlock";
import Layout from "../../components/Layout";
import arrangeDate from "../../lib/arrange-date";

import gfm from 'remark-gfm';

import * as style from '../../styles/module/_page_singleBlog.module.scss';

const SingleBlog = (props) => {
    const H1 = ({ node, ...props }) => {
        return (
            <h1 id={node.position?.start.line.toString()}>{props.children}</h1>
        );
    }

    const H2 = ({ node, ...props }) => {
        return (
            <h2 id={node.position?.start.line.toString()}>{props.children}</h2>
        );
    }

    const ankerLink = ({ node, ...props }) => {
        return (
            <a href={"#"+node.position?.start.line.toString()}>{props.children}</a>
        );
    }


    return (
        <Layout>
            <div className={style.singleBlog}>
                <p className={style.singleBlog__title}>
                    {props.frontmatter.title}
                    <span className={style.singleBlog__date}>posted at: {arrangeDate(props.frontmatter.date)}</span>
                </p>

                {/** 目次 */}
                <div className={style.singleBlog__toc}>
                    <p className={style.singleBlog__toc__cont}>[CONTENTS]</p>
                    <ReactMarkdown
                        allowedElements={["h1", "h2"]}
                        components={{
                            h1: ankerLink,
                            h2: ankerLink,
                        }}
                    >
                        {props.markdownBody}
                    </ReactMarkdown>
                </div>

                {/** 本文 */}
                <ReactMarkdown
                    components={{code: CodeBlock, h1: H1, h2: H2}}
                    remarkPlugins={[gfm]}
                >
                    {props.markdownBody}
                </ReactMarkdown>
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
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import matter from "gray-matter";
import ReactMarkdown from 'react-markdown';
import CodeBlock from "../../components/CodeBlock";
import Layout from "../../components/Layout";
import arrangeDate from "../../lib/arrange-date";
import { getAssociatedPosts } from '../../lib/content-loader';

import gfm from 'remark-gfm';
import { TwitterShareButton, TwitterIcon } from 'react-share';

import * as style from '../../styles/module/_page_singleBlog.module.scss';

const SingleBlog = (props) => {
    const pageTitle = props.frontmatter.title;
    const { tags, relatedPosts } = props;

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

    const router = useRouter();
    const shareURL = `https://www.mb-js.site${router.asPath}`;


    return (
        <Layout>
            <Head>
                <title>{`${pageTitle} | MB.js`}</title>
            </Head>
            <div className={style.singleBlog}>
                <ul className={style.singleBlog__tags}>
                    {tags.map((tag,i) => {
                        return(
                            <li className={style.singleBlog__tag} key={i}>#{tag}</li>
                        )
                    })}
                </ul>
                <div className={style.singleBlog__title}>
                    <p>{props.frontmatter.title}</p>
                    <div className={style.singleBlog__meta}>
                        <TwitterShareButton
                            url={shareURL}
                            title={pageTitle}
                            via="seventhseven"
                            related={["seventhseven"]}
                        >
                            <TwitterIcon size={20} round={true} />
                        </TwitterShareButton>
                        <Link
                            href="https://twitter.com/seventhseven"
                            className={style.singleBlog__author}
                            target="_blank"
                            rel="noopener nofollow noreferrer">
                            @seventhseven
                        </Link>
                        <span className={style.singleBlog__date}>posted at: {arrangeDate(props.frontmatter.date)}</span>
                    </div>
                </div> 


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

                <p className={style.singleBlog__separater}>*</p>

                <div className={style.singleBlog__shareContainer}>
                    <p>この記事が「役に立つ」「面白い」と思ったら、下記のボタンから Twitter でのシェアをお願いします！</p>
                    <TwitterShareButton
                        url={shareURL}
                        title={pageTitle}
                        via="seventhseven"
                        related={["seventhseven"]}
                    >
                        <TwitterIcon size={30} round={true} />
                    </TwitterShareButton>
                </div>

                <div className={style.singleBlog__backToList}>
                    <Link href="/archives/1" className={style.singleBlog__back}>
                        一覧に戻る
                    </Link>
                </div>
            </div>
        </Layout>
    );
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

    const title = singleDocument.data.title;
    const frontmatter = JSON.parse(JSON.stringify(singleDocument.data));
    const tags = ( () => {
        if( Array.isArray(frontmatter.tags) ) return frontmatter.tags;
        return [frontmatter.tags];
    } )();

    const relatedPosts = await getAssociatedPosts(tags);

    return {
        props: {
            relatedPosts: relatedPosts,
            title: title,
            tags: tags,
            frontmatter: frontmatter,
            markdownBody: singleDocument.content,
        }
    }
}
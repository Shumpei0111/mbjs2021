import fs from 'fs';
import path from 'path';

import matter from 'gray-matter';

const DIR = path.join(process.cwd(), 'src/content/');
const EXTENSION = '.md';

const readContentFiles = async ({ fs }) => {
    const promises = listContentFiles({ fs })
                        .map((filename) => readContentFile({ fs, filename }));

    const contents = await Promise.all(promises);
    return JSON.parse(JSON.stringify(contents));
}

const listContentFiles = ({ fs }) => {
    const filenames = fs.readdirSync(DIR);
    return filenames.filter((filename) => path.parse(filename).ext === EXTENSION);
};

const readContentFile = async ({ fs, slug, filename }) => {
    if( slug === undefined ) {
        slug = path.parse(filename).name;
    }

    const raw = fs.readFileSync( path.join( DIR, `${slug}${EXTENSION}`), 'utf8' );
    const matterResult = matter( raw );

    const { title, date, tags } = matterResult.data;
    const { content } = matterResult;

    return {
        title,
        date: date,
        tags: tags,
        slug: slug,
        content: content
    }
}

// タグの絞りこみ
const getAssociatedPosts = async ( argTags ) => {
    const allPosts = await readContentFiles({ fs });
    const res = allPosts.map(( post ) => {
        const tags = Array.isArray(post.tags) ? post.tags.slice() : [ post.tags ];
        const res = [];
        for (const t of tags) {
            if( argTags.includes(t) ) {
                res.push( post );
            }
        }
        return res;
    });
    // console.log(51, res);

    return res;
};

export { readContentFiles, listContentFiles, readContentFile, getAssociatedPosts }
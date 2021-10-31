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

    // return contents.sort(( a, b ) => {
    //     return ( a.date > b.date ) ? -1 : 1
    // });
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

    const { title, date } = matterResult.data;
    const { content } = matterResult;

    return {
        title,
        date: date,
        slug: slug,
        content: content
    }
}

export { readContentFiles, listContentFiles, readContentFile }
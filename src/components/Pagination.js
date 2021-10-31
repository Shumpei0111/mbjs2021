import Link from 'next/link';

export const Pagination = (props) => {
    const { total, page, perPage, href, callBack } = props;

    const prevPage = page > 1 ? page -1 : null;
    let nextPage = null;
    if( page < Math.ceil(total / perPage) ) {
        nextPage = page + 1;
    }

    return (
        <div>
            <span>
                {prevPage ? (
                    <Link href={href} as={callBack(prevPage)}><a>{prevPage}</a></Link>
                ): ``}
            </span>
            <span>{page}</span>
            <span>
                {nextPage ? (
                    <Link href={href} as={callBack(nextPage)}><a>{nextPage}</a></Link>
                ): ``}
            </span>
        </div>
    )
};
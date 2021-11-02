import Link from 'next/link';
import * as style from '../styles/module/_pagenation.module.scss';

export const Pagination = (props) => {
    const { total, page, perPage, href, callBack } = props;

    const prevPage = page > 1 ? page -1 : null;
    let nextPage = null;
    if( page < Math.ceil(total / perPage) ) {
        nextPage = page + 1;
    }

    return (
        <div className={style.pagenationContainer}>
            <ul className={style.pagenationLists}>
                <li className={style.pagenationItem}>
                    {prevPage ? (
                        <Link href={href} as={callBack(prevPage)}><a>{prevPage}</a></Link>
                    ): ``}
                </li>
                <li className={`${style.pagenationItem} ${style.currentPage}`}>{page}</li>
                <li className={style.pagenationItem}>
                    {nextPage ? (
                        <Link href={href} as={callBack(nextPage)}><a>{nextPage}</a></Link>
                    ): ``}
                </li>
            </ul>
        </div>
    )
};
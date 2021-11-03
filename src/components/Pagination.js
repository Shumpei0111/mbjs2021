import Link from 'next/link';
import { useRouter } from 'next/router';
import * as style from '../styles/module/_pagenation.module.scss';

export const Pagination = (props) => {
    const { total, page, perPage, href, callBack } = props;
    const router = useRouter();
    const currentPage = router.asPath.slice(-1);

    const pageLength = Math.ceil(total / perPage);
    const arr = ( () => {
        let arr = [];
        for( let i = 0; i < pageLength; i++ ) {
            arr[ arr.length ] = (i+1);
        }
        return arr;
    } )();

    return (
        <div className={style.pagenationContainer}>
            <ul className={style.pagenationLists}>
                {arr.map((page) => 
                    <li key={page} className={style.pagenationItem}>
                    { String(page) === currentPage ? 
                        <Link href={href} as={callBack(page)}><a className={style.currentPage}>{page}</a></Link>
                        :
                        <Link href={href} as={callBack(page)}><a>{page}</a></Link>
                    }
                    </li>
                )}
            </ul>
        </div>
    )
};
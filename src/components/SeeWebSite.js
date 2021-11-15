import Link from 'next/link';

import * as style from '../styles/module/_seeWebSite.module.scss';

const SeeWebSite = (props) => {
    const { url, type } = props;
    const linkStr = type ? type.toUpperCase() : 'THE WEBSITE';

    return (
        <div className={style.seeWebSite__container}>
            <Link href={url}>
                <a rel='noopener' target='_blank'>SEE {linkStr}</a>
            </Link>
        </div>
    )
}

export default SeeWebSite;
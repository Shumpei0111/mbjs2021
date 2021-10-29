import * as style from '../styles/module/_top-marquee.module.scss';

const TopMarquee = () => {
    return (
        <div className={style.topMarquee}>
            <div className={style.topMarquee__inner}>
                <p className={style.topMarquee__content}>Enjoy creating!</p>
                <p className={style.topMarquee__content}>Enjoy creating!</p>
                <p className={style.topMarquee__content}>Enjoy creating!</p>
                <p className={style.topMarquee__content}>Enjoy creating!</p>
                <p className={style.topMarquee__content}>Enjoy creating!</p>
                <p className={style.topMarquee__content}>Enjoy creating!</p>
            </div>
        </div>
    )
};

export default TopMarquee;
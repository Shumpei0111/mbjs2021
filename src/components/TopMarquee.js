import * as style from '../styles/module/_top-marquee.module.scss';

const TopMarquee = () => {
    return (
        <div className={style.topMarquee}>
            <div className={style.topMarquee__inner}>
                <p className={style.topMarquee__content}>Enjoy the creation!</p>
                <p className={style.topMarquee__content}>Enjoy the creation!</p>
                <p className={style.topMarquee__content}>Enjoy the creation!</p>
                <p className={style.topMarquee__content}>Enjoy the creation!</p>
            </div>
        </div>
    )
};

export default TopMarquee;
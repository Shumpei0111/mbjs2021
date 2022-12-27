import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import Layout from '../components/Layout';
import TopMarquee from '../components/TopMarquee';
import Image from 'next/image';
import Link from 'next/link'

import * as style from '../styles/module/_page_about.module.scss';
import * as fadein from '../styles/module/_fadein.module.scss';

const About = () => {
    const devide = 2;
    const imgWidth = (1200 / devide);
    const imgHeight = (800 / devide);

    const [fadeIn, setFadeIn] = useState( false );
    useEffect(() => {
        setTimeout(() => {
            setFadeIn( true );
        }, 200);
    }, []);


    return (
        <Layout>
            <h2 className={style.about__h2}>About</h2>
            <div className={style.aboutContainer}>
                <div className={style.aboutVisual}>
                    <div className={style.names}>
                        <h3 className={style.profile__name}>Shumpei</h3>
                        <p className={`${style.profile__baseIn} ${style.profile__iam}`}>Base In Tokyo, Japan</p>
                        <p className={style.profile__iam}>フロントエンド・デベロッパー</p>
                        <p className={style.profile__iam}>同人作家</p>

                        <ul className={style.profle__snsList}>
                            <li><Link href='https://twitter.com/seventhseven' target='_blank' rel='noopener'><FontAwesomeIcon icon={faTwitter} />/ @seventhseven</Link></li>
                            <li><Link href='https://github.com/Shumpei0111' target='_blank' rel='noopener'><FontAwesomeIcon icon={faGithub} />/ Shumpei0111</Link></li>
                            <li><Link href='https://www.pixiv.net/users/91629' target='_blank' rel='noopener'>Pixiv / なな爺</Link></li>
                        </ul>
                    </div>
                    <div className={`${style.profile__img} ${fadein.animation} ${fadeIn ? fadein.active: ''}`}>
                        <Link href='https://twitter.com/seventhseven' target='_blank' rel='noopener'>

                            <Image
                                src='/images/profile.jpg'
                                alt='profile photo'
                                width={imgWidth}
                                height={imgHeight}
                            />

                        </Link>
                    </div>
                </div>

                <div className={style.line}></div>

                <div className={style.profile__motto}>
                    <h4 className={style.profile__head}>大切にしていること</h4>
                    <ul className={style.profile__motto__detail}>
                        <li>トレンドを意識したデザインで制作します。</li>
                        <li>常に学び続け、最適な対応を模索します。</li>
                        <li>お客様とのやりとりは迅速・丁寧を心がけています。</li>
                    </ul>
                </div>

                <div className={style.profile__detail}>
                    <h4 className={style.profile__head}>略歴</h4>
                    <div className={style.profile__detail__wrapper}>
                        <p className={style.profile__detail__item}>
                            1988年1月生まれ。高校卒業後、東京デザイナー学院にてグラフィックデザインとイラストレーションを学び、和食器ブランドの会社でデザイナー兼販売職（店長業務やブランディングなど）を11年経験。
                        </p>
                        <p className={style.profile__detail__item}>
                            現在は金融情報などを扱うソフトハウスにて、主にフロントエンド領域にて開発を行う。
                        </p>
                        <p className={style.profile__detail__item}>
                            レガシーサイトのリニューアル、スマホ対応案件を多く担当。コストを抑えつつ、既存の構造をなるべく壊さずに拡張するのが得意。
                        </p>
                        <p className={style.profile__detail__item}>
                            イラストを描くときはクラシカル・ガーリーなどのテイストが得意。
                        </p>
                        <p className={style.profile__detail__item}>
                            一児の父。
                        </p>
                    </div>
                </div>
                
            </div>
            <TopMarquee />
        </Layout>
    );
}

export default About;
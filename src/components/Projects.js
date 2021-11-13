import Link from 'next/link';
import Image from 'next/image';

import { IllustSwiper } from './IllustSwiper';

import * as style from '../styles/module/_projects.module.scss';

const Projects = () => {
    return (
        <div className={style.projects}>
            <h2 className={style.projects__h2}>PROJECTS</h2>
            <div className={style.projects__mainContents}>
                <h3 className={style.projects__h3}>Recent Projects</h3>

                <div className={`${style.projects__genreContainer}`}>
                    <p className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`} data-title='APP&SITE'>APP&SITE</p>
                    <ul className={style.projects__list}>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}><Link href='https://hoshikake-obake.site/'><a rel='noopener' target='_blank'>廃校探索</a></Link></p>
                            <div className={style.projects__item}>
                                <Link href='https://hoshikake-obake.site/'>
                                    <a rel='noopener' target='_blank'>
                                        <Image
                                            src='/images/pj_obake-lp.jpg'
                                            alt='廃校探索'
                                            width={1200/2}
                                            height={592/2} />
                                    </a>
                                </Link>
                                <span className={style.projects__date}>2021.8.29</span>
                            </div>
                            <p className={style.projects__pjCaption}>Twitter上の企画：星駆web制作企画に参加。「お化け屋敷」と簡単な設定をもとに、<br />約1ヶ月で調査、コンセプト作成、デザイン、実装、ライティングまで独自で行う。</p>
                            <ul className={style.projects__pj__stack}>
                                <li>フロントエンド：React</li>
                                <li>インフラ：Firebase Hosting</li>
                                <li>制作期間：1ヶ月</li>
                                <li>企画、調査、デザイン、ライティング、実装</li>
                                <li><Link href="https://github.com/Shumpei0111/obake-lp"><a target="_blank" rel="noopener">GitHub</a></Link></li>
                            </ul>
                        </li>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num2}`}><Link href='https://present-resort-point.tokyo/' ><a rel='noopener' target='_blank'>PRESENT RESORT POINT</a></Link></p>
                            <div className={style.projects__item}>
                                <Link href='https://present-resort-point.tokyo/' >
                                    <a rel='noopener' target='_blank'>
                                        <Image
                                            src='/images/pj_present-resort-point.jpg'
                                            alt='PRESENT RESORT POINT'
                                            width={1200/2}
                                            height={587/2} />
                                    </a>
                                </Link>
                                <span className={style.projects__date}>2021.7.25</span>
                            </div>
                            <p className={style.projects__pjCaption}>１週間でWebサービスを作るイベント#web1week に参加。<br />「世界のリゾート地にあるライブカメラでリゾート気分を味わう」をコンセプトに制作。</p>
                            <ul className={style.projects__pj__stack}>
                                <li>フロントエンド：React</li>
                                <li>インフラ：Netlify</li>
                                <li>制作期間：1週間</li>
                                <li>企画、調査、デザイン、実装</li>
                                <li><Link href="https://github.com/Shumpei0111/resort_anthem"><a target="_blank" rel="noopener">GitHub</a></Link></li>
                            </ul>
                        </li>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num3}`}><Link href='https://villains-homme.web.app/'><a rel='noopener' target='_blank'>VILLAINS HOMME</a></Link></p>
                            <div className={style.projects__item}>
                                <Link href='https://villains-homme.web.app/'>
                                    <a rel='noopener' target='_blank'>
                                        <Image
                                        src='/images/pj_villains-homme.jpg'
                                        alt='VILLAINS HOMME'
                                        width={748/2}
                                        height={940/2} />
                                    </a>
                                </Link>
                                <span className={style.projects__date}>2021.10.15</span>
                            </div>
                            <p className={style.projects__pjCaption}>Twitter上の企画：架空の10代〜20代向けメンズコスメブランド「VILLAINS HOMME（ヴィランズ オム）」のLP。</p>
                            <ul className={style.projects__pj__stack}>
                                <li>フロントエンド：pug / scss</li>
                                <li>インフラ：Firebase Hosting</li>
                                <li>制作期間：1ヶ月</li>
                                <li>調査、デザイン(LP、パッケージ、ロゴ)、実装</li>
                                <li><Link href="https://github.com/Shumpei0111/villains_homme"><a target="_blank" rel="noopener">GitHub</a></Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>

                <p className={style.projects__ceparate}>*</p>

                <div className={`${style.projects__genreContainer}`}>
                    <p className={style.projects__genreTitle}>同人活動&nbsp;|&nbsp;DOUJIN</p>
                    <p className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`} data-title='DOUJIN'>DOUJIN</p>
                    <div className={style.projects__circleTop}>
                        <p className={style.projects__pjCaption}>「なな爺」名義にて活動中。</p>
                        <p className={style.projects__pjCaption}>【ファッションイラスト×アニメ】をコンセプトに、同人サークル「1月の朝」で<br />ガルパン（ガールズアンドパンツァー）やプリキュアなどの二次創作をしています。<br />アナログ感のある、ガーリーでちょっとクラシカルなイラストを制作しています。</p>
                    </div>
                    {/* <div className={`${style.illustSwiper__wrapper} ${style.projects__list}`}>
                        <IllustSwiper />
                    </div> */}
                    <div className={style.projects__circle}>
                        <p className={style.projects__circle__join}>サークル参加イベント</p>
                        <ul className={style.projects__list}>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}>パンツァーガールズ8</p>
                                <div className={style.projects__item}>
                                    <Link href='https://www.pixiv.net/artworks/59232048'>
                                        <a rel='noopener' target='_blank'>
                                            <Image
                                                src='/images/wakenai.jpg'
                                                alt='パンツァーガールズ8 頒布物'
                                                width={1360/2}
                                                height={640/2}
                                            />
                                        </a>
                                    </Link>
                                    <span className={style.projects__date}>2016.10.02</span>
                                </div>
                                <div className={style.projects__circle__distribution}>
                                    <p className={style.projects__circle__genreName}>ジャンル：ガールズ&パンツァー</p>
                                    <p>西 × ダジ本。相手を好きな気持ちに理由なんてない。そんな感情をぶつける2人の乙女の話。<br />他、ポストカード数種と色紙</p>
                                    <div className={style.projects__circle__hanpuWrapper}>
                                        <ul className={style.projects__pj__stack}>
                                            <li>同人誌</li>
                                            <li>ポストカード</li>
                                            <li>色紙</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num2}`}>ぱんっあ！ふぉー！7</p>
                                <div className={style.projects__item}>
                                    <Link href='https://www.pixiv.net/artworks/57371698'>
                                        <a rel='noopener' target='_blank'>
                                            <Image
                                                src='/images/datesuru.jpg'
                                                alt='ぱんっあ！ふぉー！7 頒布物'
                                                width={868/2}
                                                height={640/2}
                                            />
                                        </a>
                                    </Link>
                                    <span className={style.projects__date}>2016.06.12</span>
                                </div>
                                <div className={style.projects__circle__distribution}>
                                    <p className={style.projects__circle__genreName}>ジャンル：ガールズ&パンツァー</p>
                                    <p>西 × ダジ本。『ガールズ＆パンツァー 劇場版』後、親密になった彼女らのデートの様子を描きました。</p>
                                    <div className={style.projects__circle__hanpuWrapper}>
                                        <ul className={style.projects__pj__stack}>
                                            <li>同人誌</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num3}`}>海ゆかば4</p>
                                <div className={style.projects__item}>
                                    <Link href='https://www.pixiv.net/artworks/55104947'>
                                        <a rel='noopener' target='_blank'>
                                            <Image
                                                src='/images/umiyukaba.jpg'
                                                alt='海ゆかば 頒布物'
                                                width={1140/2}
                                                height={800/2}
                                            />
                                        </a>
                                    </Link>
                                    <span className={style.projects__date}>2016.02.05</span>
                                </div>
                                <div className={style.projects__circle__distribution}>
                                    <p className={style.projects__circle__genreName}>ジャンル：艦隊これくしょん−艦これ−</p>
                                    <p>大本営から「鎮守府をPRセヨ」という命令が与えられた鎮守府。秘書艦の鳥海に押し付けたら、他の艦娘の協力もあって無事PR動画！...と思われたが。という本。</p>
                                    <div className={style.projects__circle__hanpuWrapper}>
                                        <ul className={style.projects__pj__stack}>
                                            <li>同人誌</li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <p className={style.projects__ceparate}>*</p>
        </div>
    )
};

export default Projects;
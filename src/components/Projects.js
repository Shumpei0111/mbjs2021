import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import GoogleExtension from './GoogleExtension.js';
import SeeWebSite from './SeeWebSite.js';

import * as style from '../styles/module/_projects.module.scss';

const Projects = () => {
    // ref: https://stackoverflow.com/questions/44205000/how-to-add-class-in-element-on-scroll-react-js

    const [isEnter, setIsEnter] = useState( false );

    useEffect( () => {
        const handleScroll = () => {
            let flg = false;
            if( !flg && window.scrollY > 700 ) {
                setIsEnter(true);
                flg = true;
            }
        }
        window.addEventListener( 'scroll', handleScroll );
        return () => window.removeEventListener( 'scroll', handleScroll );
    }, [] );

    return (
        <div className={style.projects}>
            <h2 className={style.projects__h2}>PROJECTS</h2>
            <div className={style.projects__mainContents}>
                <h3 className={`${style.projects__h3} ${isEnter ? style.visible : ''}`}>
                    <span>R</span>
                    <span>e</span>
                    <span>c</span>
                    <span>e</span>
                    <span>n</span>
                    <span>t</span>
                    <span>&thinsp;</span>
                    <span>P</span>
                    <span>r</span>
                    <span>o</span>
                    <span>j</span>
                    <span>e</span>
                    <span>c</span>
                    <span>t</span>
                    <span>s</span>
                </h3>

                <div className={`${style.projects__genreContainer}`}>
                    <p className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`} data-title='APP&SITE'>APP&SITE</p>
                    <ul className={style.projects__list}>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}>百合に酔う。「上伊那ぼたん、酔へる姿は百合の花」ファンサイト</p>
                            <div className={style.projects__item}>
                                <Link href='https://yuriyoi.site/'>
                                    <a rel='noopener' target='_blank'>
                                        <Image
                                            src='/images/kamiinabotan-site.png'
                                            alt='百合に酔う。「上伊那ぼたん、酔へる姿は百合の花」ファンサイトのスクリーンショット'
                                            width={1200}
                                            height={592} />
                                    </a>
                                </Link>
                                <span className={style.projects__date}>2022.04.17</span>
                            </div>
                            <div className={style.projects__captionWrapper}>
                                <div className={style.projects__overviewWrapper}>
                                    <h4>概要</h4>
                                    <p className={style.projects__pjCaption}>秋田書店マンガクロスで現在連載中の「上伊那ぼたん、酔へる姿は百合の花」を応援するために作成したファンサイト。</p>
                                    <SeeWebSite url='https://yuriyoi.site/' />
                                </div>
                                <ul className={style.projects__pj__stack}>
                                    <li>フロントエンド：React（Next.js）</li>
                                    <li>インフラ：Vercel</li>
                                    <li>制作期間：1ヶ月半</li>
                                    <li>企画、デザイン、ライティング、実装</li>
                                    {/* <li><Link href="https://github.com/Shumpei0111/obake-lp"><a target="_blank" rel="noopener">GitHub</a></Link></li> */}
                                </ul>
                            </div>
                        </li>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num2}`}>廃校探索</p>
                            <div className={style.projects__item}>
                                <Link href='https://hoshikake-obake.site/'>
                                    <a rel='noopener' target='_blank'>
                                        <Image
                                            src='/images/pj_obake-lp.jpg'
                                            alt='廃校探索'
                                            width={1200}
                                            height={592} />
                                    </a>
                                </Link>
                                <span className={style.projects__date}>2021.08.29</span>
                            </div>
                            <div className={style.projects__captionWrapper}>
                                <div className={style.projects__overviewWrapper}>
                                    <h4>概要</h4>
                                    <p className={style.projects__pjCaption}>Twitter上の企画：星駆web制作企画に参加。「お化け屋敷」と簡単な設定をもとに、<br />約1ヶ月で調査、コンセプト作成、デザイン、実装、ライティングまで独自で行う。</p>
                                    <SeeWebSite url='https://hoshikake-obake.site/' />
                                </div>
                                <ul className={style.projects__pj__stack}>
                                    <li>フロントエンド：React</li>
                                    <li>インフラ：Firebase Hosting</li>
                                    <li>制作期間：1ヶ月</li>
                                    <li>企画、調査、デザイン、ライティング、実装</li>
                                    <li><Link href="https://github.com/Shumpei0111/obake-lp"><a target="_blank" rel="noopener">GitHub</a></Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num3}`}>PRESENT RESORT POINT</p>
                            <div className={style.projects__item}>
                                <Link href='https://present-resort-point.tokyo/' >
                                    <a rel='noopener' target='_blank'>
                                        <Image
                                            src='/images/pj_present-resort-point.jpg'
                                            alt='PRESENT RESORT POINT'
                                            width={1200}
                                            height={587} />
                                    </a>
                                </Link>
                                <span className={style.projects__date}>2021.07.25</span>
                            </div>
                            <div className={style.projects__captionWrapper}>
                                <div className={style.projects__overviewWrapper}>
                                    <h4>概要</h4>
                                    <p className={style.projects__pjCaption}>１週間でWebサービスを作るイベント#web1week に参加。<br />「世界のリゾート地にあるライブカメラでリゾート気分を味わう」をコンセプトに制作。</p>
                                    <SeeWebSite url='https://present-resort-point.tokyo/' />
                                </div>
                                <ul className={style.projects__pj__stack}>
                                    <li>フロントエンド：React</li>
                                    <li>インフラ：Netlify</li>
                                    <li>制作期間：1週間</li>
                                    <li>企画、調査、デザイン、実装</li>
                                    <li><Link href="https://github.com/Shumpei0111/resort_anthem"><a target="_blank" rel="noopener">GitHub</a></Link></li>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num4}`}>VILLAINS HOMME</p>
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
                            <div className={style.projects__captionWrapper}>
                                <div className={style.projects__overviewWrapper}>
                                    <h4>概要</h4>
                                    <p className={style.projects__pjCaption}>Twitter上の企画：架空の10代〜20代向けメンズコスメブランド<br />「VILLAINS HOMME（ヴィランズ オム）」のLP。</p>
                                    <SeeWebSite url='https://villains-homme.web.app/' />
                                </div>
                                
                                <ul className={style.projects__pj__stack}>
                                    <li>フロントエンド：pug / scss</li>
                                    <li>インフラ：Firebase Hosting</li>
                                    <li>制作期間：1ヶ月</li>
                                    <li>調査、デザイン(LP、パッケージ、ロゴ)、実装</li>
                                    <li><Link href="https://github.com/Shumpei0111/villains_homme"><a target="_blank" rel="noopener">GitHub</a></Link></li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                <p className={style.projects__ceparate}>*</p>

                <div className={`${style.projects__genreContainer}`}>
                    <p className={style.projects__genreTitle}>発表&nbsp;|&nbsp;PRESENT</p>
                    <p className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`} data-title='PRESENT'>PRESENT</p>
                    <div className={style.projects__presentTop}>
                        <p className={style.projects__pjCaption}>複数のオンラインコミュニティでLT（20分）をしたり、レクチャーをする機会がありました。</p>
                        <p className={style.projects__pjCaption}>その際、セキュリティについてのレクチャーはWebサイト化しているので掲載します。</p>
                    </div>
                    <div>
                        <ul className={style.projects__list}>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}>フロントエンド講座</p>
                                <ul>
                                    <li>
                                        <Link href="https://frontend-lecture.vercel.app/" >
                                            <a target="_blank" rel="noopener noreferrer">
                                                <p className={style.projects__pjCaption}>作成したテキスト</p>
                                                <p className={style.projects__pjCaption}>受講登録等にCookieを使用したり、<br />手元の環境にnodeサーバを立ててテキストアプリを起動するなどして、<br />フロントエンドで扱う技術のさわりを体感してもらいながらレクチャーを行いました。</p>
                                                <Image
                                                    src='/images/frontend-lec.png'
                                                    alt='フロントエンド講座で作成したテキストのスクリーンショット'
                                                    width={1360}
                                                    height={640}
                                                    objectFit='contain'
                                                />
                                            </a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="https://lecture-cookie-memo.vercel.app/" >
                                            <a target="_blank" rel="noopener noreferrer">
                                                <p className={style.projects__pjCaption}>作成したサンプルアプリ（ログイン用パスワードはテキストに記載）</p>
                                                <Image
                                                    src='/images/task-app.png'
                                                    alt='題材に作成したタスク管理アプリ'
                                                    width={560}
                                                    height={420}
                                                    objectFit='contain'
                                                />
                                            </a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
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
                                                width={1360}
                                                height={640}
                                            />
                                        </a>
                                    </Link>
                                    <span className={style.projects__date}>2016.10.02</span>
                                </div>
                                <div className={style.projects__circle__distribution}>
                                    <div className={style.projects__overviewWrapper}>
                                        <h4>概要</h4>
                                        <p className={style.projects__circle__genreName}>GENRE：ガールズ&パンツァー</p>
                                        <p>西 × ダジ本。相手を好きな気持ちに理由なんてない。そんな感情をぶつける2人の乙女の話。<br />他、ポストカード数種と色紙</p>
                                        <SeeWebSite type='pixiv' url='https://www.pixiv.net/artworks/59232048' />
                                    </div>
                                    <div className={style.projects__circle__hanpuWrapper}>
                                        <ul className={style.projects__pj__stack}>
                                            <li>
                                                <p className={style.creative}>同人誌 * 1</p>
                                                <p>CLIP STUDIO PAINT | Illustrator | Photoshop</p>
                                                <p>オンデマンド印刷</p>
                                            </li>
                                            <li>
                                                <p className={style.creative}>ポストカード * 5</p>
                                            </li>
                                            <li>
                                                <p className={style.creative}>色紙 * 1</p>
                                                <p>色紙にアクリルガッシュ</p>
                                            </li>
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
                                                width={868}
                                                height={640}
                                            />
                                        </a>
                                    </Link>
                                    <span className={style.projects__date}>2016.06.12</span>
                                </div>
                                <div className={style.projects__circle__distribution}>
                                    <div className={style.projects__overviewWrapper}>
                                        <h4>概要</h4>
                                        <p className={style.projects__circle__genreName}>GENRE：ガールズ&パンツァー</p>
                                        <p>西 × ダジ本。『ガールズ＆パンツァー 劇場版』後、親密になった彼女らのデートの様子を描きました。</p>
                                        <SeeWebSite type='pixiv' url='https://www.pixiv.net/artworks/57371698' />
                                    </div>
                                    <div className={style.projects__circle__hanpuWrapper}>
                                        <ul className={style.projects__pj__stack}>
                                            <li>
                                                <p className={style.creative}>同人誌 * 1</p>
                                                <p>CLIP STUDIO PAINT | Illustrator | Photoshop</p>
                                                <p>オンデマンド印刷</p>
                                            </li>
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
                                                width={1140}
                                                height={800}
                                            />
                                        </a>
                                    </Link>
                                    <span className={style.projects__date}>2016.02.05</span>
                                </div>
                                <div className={style.projects__circle__distribution}>
                                    <div className={style.projects__overviewWrapper}>
                                        <h4>概要</h4>
                                        <p className={style.projects__circle__genreName}>GENRE：艦隊これくしょん−艦これ−</p>
                                        <p>大本営から「鎮守府をPRセヨ」という命令が与えられた鎮守府。<br />秘書艦の鳥海に押し付けたら、他の艦娘の協力もあって無事PR動画！...と思われたが。という本。</p>
                                        <SeeWebSite type='pixiv' url='https://www.pixiv.net/artworks/55104947' />
                                    </div>
                                    <div className={style.projects__circle__hanpuWrapper}>
                                        <ul className={style.projects__pj__stack}>
                                            <li>
                                                <p className={style.creative}>同人誌 * 1</p>
                                                <p>CLIP STUDIO PAINT | Illustrator | Photoshop</p>
                                                <p>オフセット印刷</p>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <GoogleExtension />
            </div>
            <p className={style.projects__ceparate}>*</p>
        </div>
    )
};

export default Projects;
import * as style from '../styles/module/_projects.module.scss';

const Projects = () => {
    return (
        <div className={style.projects}>
            <h2 className={style.projects__h2}>PROJECTS</h2>
            <div className={style.projects__mainContents}>
                <div className={style.projects__globalCaption}>
                    <p>個人活動 / Personal Projects</p>
                    <p>自主制作のWebアプリやWebサイト、同人活動における記録。</p>
                </div>

                <div className={style.projects__genreContainer}>
                    <p className={style.projects__genreTitle}>Webアプリ & Webサイト</p>
                    <p className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`} data-title='APP&SITE'>APP&SITE</p>
                    <ul>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}>PRESENT RESORT POINT</p>
                            <p className={style.projects__pjCaption}>１週間でWebサービスを作るイベント#web1week に参加。<br />「世界のリゾート地にあるライブカメラでリゾート気分を味わう」をコンセプトに制作。</p>
                        </li>
                        <li>
                            <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num2}`}>廃校探索</p>
                            <p className={style.projects__pjCaption}>Twitter上の企画：星駆web制作企画に参加。「お化け屋敷」と簡単な設定だけ与えられ、<br />約1ヶ月で調査、コンセプト・企画のブラッシュアップ、デザイン、実装、ライティングまで独自で行う。</p>
                        </li>
                    </ul>
                </div>

                <div className={style.projects__genreContainer}>
                    <p className={style.projects__genreTitle}>同人活動</p>
                    <p className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`} data-title='DOUJIN'>DOUJIN</p>
                    <div className={style.projects__circleTop}>
                        <p className={style.projects__pjCaption}>「なな爺」名義にて活動中。</p>
                        <p className={style.projects__pjCaption}>【ファッションイラスト×アニメ】をコンセプトに、同人サークル「1月の朝」で<br />ガルパン（ガールズアンドパンツァー）やプリキュアなどの二次創作をしています。<br />アナログ感のある、ガーリーでちょっとクラシカルなイラストを制作しています。</p>
                    </div>
                    <div className={style.projects__circle}>
                        <p className={style.projects__circle__join}>サークル参加イベント</p>
                        <ul>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}>パンツァーガールズ8（ガールズアンドパンツァー）</p>
                                <div className={style.projects__circle__distribution}>
                                    <span>頒布物：</span>
                                    <ul>
                                        <li>同人誌</li>
                                        <li>ポストカード</li>
                                        <li>色紙</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num2}`}>ぱんっあ！ふぉー！7（ガールズアンドパンツァー）</p>
                                <div className={style.projects__circle__distribution}>
                                    <span>頒布物：</span>
                                    <ul>
                                        <li>同人誌</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                <p className={`${style.projects__name} ${style.projects__num} ${style.projects__num3}`}>海ゆかば4（艦隊これくしょん−艦これ−）</p>
                                <div className={style.projects__circle__distribution}>
                                    <span>頒布物：</span>
                                    <ul>
                                        <li>同人誌</li>
                                    </ul>
                                </div>
                            </li>
                            <li>
                                その他委託頒布
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Projects;
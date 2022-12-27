import * as _style from "../styles/module/_googleExtension.module.scss";
import * as style from "../styles/module/_projects.module.scss";

import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import SeeWebSite from "./SeeWebSite.js";

const GoogleExtension = () => {
  return (
    <div className={style.projects__genreContainer}>
      <p className={style.projects__genreTitle}>
        Chrome拡張&nbsp;|&nbsp;Chrome Extension
      </p>
      <p
        className={`${style.projects__bgTitle} ${style.projects__bgTitleMarquee}`}
        data-title="CHROME EXTENSION"
      >
        CHROME EXTENSION
      </p>
      <ul className={style.projects__list}>
        <li>
          <p
            className={`${style.projects__name} ${style.projects__num} ${style.projects__num1}`}
          >
            シンプル文字数カウンター
          </p>
          <div className={`${style.projects__item}`}>
            <Link
              href="https://github.com/Shumpei0111/simple_word_count"
              rel="noopener"
              target="_blank"
            >
              <div
                className="relative width1200 height592"
                style={{
                  maxWidth: 400,
                  maxHeight: 200,
                }}
              >
                <div className="imageContainer">
                  <Image
                    src="/images/simple_counter.png"
                    alt="My Chrome Extension, simple counter screen shot"
                    fill
                    className="imageItem"
                  />
                </div>
              </div>
            </Link>
          </div>
          <div className={style.projects__captionWrapper}>
            <div className={style.projects__overviewWrapper}>
              <h4>概要</h4>
              <p className={style.projects__pjCaption}>
                Google
                Chrome用拡張機能を作成。入力欄に文字を入力すると文字数のカウントと、入力した最新の文字列を保存することができる。
                <br />
                閉じると入力した文字が消えるので、「読み込み」をクリックすると保存した文字列が入力欄に挿入されます。
                <br />
                ※画像をクリックするとGitHubへ遷移します。
              </p>
              <div className={`${style.projects__marginTopAdd}`}>
                <SeeWebSite url="https://github.com/Shumpei0111/simple_word_count" />
              </div>
            </div>
            <ul className={style.projects__pj__stack}>
              <li>フロントエンド：HTML/CSS/Vanilla JavaScript</li>
              <li>制作期間：3日</li>
              <li>デザイン、実装</li>
              <li>
                <Link
                  href="https://github.com/Shumpei0111/obake-lp"
                  target="_blank"
                  rel="noopener"
                >
                  GitHub
                </Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default GoogleExtension;

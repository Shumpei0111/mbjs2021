---
title: Gulp4のシンプルセッティング
date: 2019-07-10 23:15:27
tags: [node.js, gulp, javascript]
---

こんばんは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。
今回は、フロントエンド定番のビルドヘルパー**Gulp**についてのお話です。

ビルドヘルパー（ビルドシステム）とは、コンパイルやファイルの更新などを感知して、
ブラウザのリロードを自動でしてくれたりなど、
面倒なタスクを任せられるシステムです。

node.jsで動くので、バックエンド用に新たにサーバを立てる必要もありません。

圧縮して、結合したり、ソースマップ作ったり、ブラウザの更新をしたり…
そんな作業をgulpにやってもらいます。



## npmでインストール
鹿野 壮さんの[最新ビルドシステムGulp 4入門 〜環境構築からタスク作成まで〜](https://qiita.com/tonkotsuboy_com/items/9ab83fe0f25cf0b010f3)を参考に、
コマンドでちゃちゃっとインストールしちゃいましょう。

```
$ cd /Users/myproject

$ npm init -y
# -yはインストールの際の質問に、入力しなくてもすべてyesと答えるオプション

$ npm install gulp -D
# -Dは--save-devの略。ローカルにインストールしてこのプロジェクトのみ使用します。

$ npx gulp -v
# バージョンの確認
# 
# グローバルにインストールしなかった場合、
# 通常はpackage.jsonにnpm scriptとして
# gulpコマンドの使用を書かなくてはいけないのですが、
# npm5.2.0から「npx」コマンドを使うことで、グローバルと同じふるまいをしてくれます。
```

## gulpfile.js

さて、下記に紹介するのは自分が使ったgulpの設定です。

**pug + sass + javascript**

の更新をwatchで監視しながら、ブラウザシンクで自動でブラウザをリロードするようにしています。

※requireで書かれた部分はgulpのプラグインになりますので、
別途インストールが必要です。

```js
// gulpプラグインの読み込み
var gulp = require("gulp");
var browserSync = require("browser-sync").create();


// sass系
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var plumber = require("gulp-plumber");
var sourcemaps = require("gulp-sourcemaps");
var progeny = require("gulp-progeny");


// js系
var concat = require("gulp-concat"); // ファイル結合
var jshint = require("gulp-jshint"); // 構文チェック ※別途gulp-jshintとjshintをインストールする必要がある
var rename = require("gulp-rename"); // ファイル名変更
var uglify = require("gulp-uglify"); // ファイル圧縮


// sass
gulp.task("sass", function() {
  return gulp
    .src("src/scss/style.scss")
    .pipe(plumber())
    .pipe(progeny())
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded"
      })
    )
    .pipe(
      autoprefixer({
        browsers: ["last 2 version", "iOS >= 8.1", "Android >= 4.4"],
        cascade: false
      })
    )
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("dist/css"));
});


// JS - concat js files
gulp.task("js.concat", function() {
  return gulp
    .src(["src/js/*.js"])
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter("default"))
    .pipe(concat("bundle.js"));
});


// JS - compress js files
gulp.task("js.compress", function() {
  return gulp
    .src("dist/js/bundle.js")
    .pipe(plumber())
    .pipe(uglify())
    .pipe(rename("bundle.min.js"))
    .pipe(gulp.dest("dist/js"));
});


// Browser Sync
gulp.task("server", function(done) {
  browserSync.init({
    port: 8000,
    server: {
      baseDir: "./dist/",
      index: "./html/index.html"
    }
  });
  done();
});


// watch
gulp.task("watch", function(done) {
  gulp.watch("src/scss/style.scss", gulp.task("sass"));
  gulp.watch("src/js/*.js", gulp.task("js.concat"));
  gulp.watch("dist/js/*.js", gulp.task("js.compress"));
  gulp
    .watch(["dist/html/*", "dist/css/*", "dist/js/*"])
    .on("change", function() {
      browserSync.reload();
    });
  done();
});


gulp.task("default", gulp.parallel("server", "watch"));
```

gulpfile.jsはこんな感じです。

- HTMLのテンプレートエンジンであるpugで書いたファイル
- CSSプリプロセッサ（CSSメタ言語）のsassで書いたファイル
- 細かく分かれたJavaScriptのファイル

これらのファイルを`watch`タスクで監視し、
監視下に置かれたファイルが更新されたら、
それぞれpipeで書かれたタスクで処理が走ります。

あとはコマンドで`npx gulp`と叩けばnodeサーバが起動し、
Chromeが自動で開いてlocalhostの8000ポートでアクセスした結果が表示されます。

様々なタスクがありますが、`gulp`と叩くと`default`に書いたタスクが走ります。
`default`は最終行にあるタスクで、`server`や`watch`を登録したので、
ざっくり全体をラップした形で管理しています。

## おわりに
gulpを設定するのは大変ですが一回作ってしまえば楽なので、
この設定をだいたい使いまわしています。

npm installをすると毎回node_modulesが出来上がってしまう問題があるので、
シンボリックリンクで解決されているエンジニアの方もいらっしゃるようです。

node.jsのいい練習にもなるかと思いますので、
挑戦してみてはいかがでしょうか。


参考
[最新ビルドシステムGulp 4入門 〜環境構築からタスク作成まで〜](https://qiita.com/tonkotsuboy_com/items/9ab83fe0f25cf0b010f3)
[現場で使えるgulp入門 第1回 gulpとは何か](https://app.codegrid.net/entry/gulp-1)
[[Node.js] npm installするときはどのパッケージもローカルインストールで十分](https://arui.tech/why-locally-install-is-much-better-than-globally-in-npm/)

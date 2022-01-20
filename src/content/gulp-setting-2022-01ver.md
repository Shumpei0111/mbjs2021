---
title: Gulpの設定 2022年1月版
date: 2022-01-20 22:14:00
tags: [javascript, gulp]
---

[今までのGulpシリーズはこちら](https://www.mb-js.tokyo/tags/gulp/)

## 前提

`node -v` コマンドを使ってnodeのバージョンを確認してください。

バージョン14以上を使用するようにしてください。

## Gulpの使い方

- gulpfile.jsを作る
- 読み込みたいモジュールをnpm installする
- gullpfile.jsがある階層で `npx gulp` というコマンドを叩くとnodeサーバが立ち上がり、Gulpが起動する
- control + cでサーバを止めると、Gulpが止まる

## gulpfile.js 全体

```js
const sass         = require( 'gulp-sass' )(require( 'sass' ));
const notify       = require( 'gulp-notify' );
const plumber      = require( 'gulp-plumber' );
const autoprefixer = require( 'gulp-autoprefixer' );
const uglify       = require( 'gulp-uglify' );
const rename       = require( 'gulp-rename' );
const sourcemaps   = require( 'gulp-sourcemaps' );
const glob         = require( 'gulp-sass-glob' );

const webpack       = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );
const webpackConfig = require( './webpack-config.js' );

const { watch, task, src, dest, parallel } = require( 'gulp' );

const paths = {
    'scss': './src/css/**/*.scss',
    'css' : '../pages/template/kyakuhon/css/',
    'jsSrc': './src/js/**/*.js',
    'js': '../pages/template/kyakuhon/js/',
    'baseHtmSrc': '../pages/template/sample/base_design.htm',
    'distHtml': '/dist/',
};

// Scss
task( 'sass', () => {
    return(
        src( paths.scss )
            .pipe( plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }) )
            .pipe( glob() )
            .pipe( sass({
                outputStyle: 'expanded'
            }) )
            .pipe( autoprefixer({
                cascade: false,
                grid: true
            }) )
            .pipe( sourcemaps.write() )
            .pipe( rename( 'sp.css' ) )
            .pipe( dest( paths.css ) )
            .pipe( dest( paths.svrCSS ) )
    );
} );

// js renameはwebpackConfigで行う
task( 'js', () => {
    return(
        src( paths.jsSrc )
            .pipe( plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }) )
            .pipe( uglify() )
            .pipe( webpackStream(webpackConfig, webpack) )
            .pipe( dest( paths.js ) )
            .pipe( dest( paths.svrJS ) )
    );
} );

task( 'baseHtm', () => {
    console.log( '=================================' );
    console.log( 'task実行時にコメントつけられます' );
    console.log( '=================================' );
    return(
        src( paths.baseHtmSrc )
        .pipe( dest( paths.distHtml ) )
    );
} );

// watch
task( 'watch', done => {
		// 引数doneは使ってないですが今回は置いておいてください
    watch( [paths.scss], task( 'sass' ) );
    watch( [paths.jsSrc], task( 'js' ) );
    watch( [paths.baseHtmSrc], task( 'baseHtm' ) );
} );

// base
task( 'default', parallel( 'watch' ) );
```

### モジュールの読み込み

```js
const sass         = require( 'gulp-sass' )(require( 'sass' ));
const notify       = require( 'gulp-notify' );
const plumber      = require( 'gulp-plumber' );
const autoprefixer = require( 'gulp-autoprefixer' );
const uglify       = require( 'gulp-uglify' );
const rename       = require( 'gulp-rename' );
const sourcemaps   = require( 'gulp-sourcemaps' );
const glob         = require( 'gulp-sass-glob' );

const webpack       = require( 'webpack' );
const webpackStream = require( 'webpack-stream' );
const webpackConfig = require( './webpack-config.js' );

const { watch, task, src, dest, parallel } = require( 'gulp' );
```

requireで読み込んでいるモジュールはすべて `npm i -D モジュール名` でインストールしてください。

※バージョン番号も知りたい場合は別途お教えしますね。

※webpackと名のつくものを除く。これはwebpackを使いたい時に必要なだけです。

※webpack-config.jsは自分で作るファイルなのでインストールはしません。

`gulp-sass` ,  `sass` はそれぞれ別のモジュールなので、それぞれインストールしてください。

また、sassは `node-sass` から、 `dart sass` を使うよう推奨されています。

`gulp-sass` はgulpがsassを扱うためのモジュールです。

### パス

```js
const paths = {
    'scss': './src/css/**/*.scss',
    'css' : '../pages/template/kyakuhon/css/',
    'jsSrc': './src/js/**/*.js',
    'js': '../pages/template/kyakuhon/js/',
    'baseHtmSrc': '../pages/template/sample/base_design.htm',
    'distHtml': '/dist/',
};
```

Gulpが監視するファイル名や、吐き出し先のディレクトリのパスをまとめておくと見やすいです。

ディレクトリ名に `**` 、ファイル名に `*` を使用すると、そのディレクトリ内の全てのファイルが対象になる、という指定になります。

ディレクトリ名だけかかれている、css、js、distHtmlはそれぞれ吐き出し先のディレクトリのパスを記載しています。

### タスク

```js
// Scss
task( 'sass', () => {
    return(
        src( paths.scss )
            .pipe( plumber({ errorHandler: notify.onError('Error: <%= error.message %>') }) )
            .pipe( glob() )
            .pipe( sass({
                outputStyle: 'expanded'
            }) )
            .pipe( autoprefixer({
                cascade: false,
                grid: true
            }) )
            .pipe( sourcemaps.write() )
            .pipe( rename( 'sp.css' ) )
            .pipe( dest( paths.css ) )
    );
} );
```

モジュールの読み込みの際、

```js
const { watch, task, src, dest, parallel } = require( 'gulp' );
```

をgulpから読み込んでいます。このうちのtaskメソッドを使用します。

```js
task（　'任意のタスク名', () => {
	return (
		src( '作業対象パス' )
	);
} 　）;
```

が基本的な構文です。

`pipe` メソッドでどんどん作業を繋げていくことができます。

順番は結構大事なので、参考にしてください。

最後に `dest()` でGulpは吐き出し先のディレクトリにファイルを保存しにいきます。

すでに同名のファイル名がある場合、上書きされます。

### watch

```js
// watch
task( 'watch', done => {
		// 引数doneは使ってないですが今回は置いておいてください
    watch( [paths.scss], task( 'sass' ) );
    watch( [paths.jsSrc], task( 'js' ) );
    watch( [paths.baseHtmSrc], task( 'baseHtm' ) );
} );
```

Gulpを起動させている間、この中に登録されている監視対象が更新されたらこのタスクを実行するよう登録できます。

```js
const { watch, task, src, dest, parallel } = require( 'gulp' );
```

このwatchメソッドを使っています。

構文

```js
watch( '更新監視対象のディレクトリ（配列で登録。複数監視させることができる）', task('実行したいタスク名') )
```

### default

```js
task( 'default', parallel( 'watch' ) );
```

Gulp起動時に行うtask。

watchタスクをparallelメソッドに渡すことで、起動時にwatchが動く（＝監視対象を常に監視できるようになる）

## まとめ

Gulpは設定さえしてしまえば自動で色々やってくれるズボラーにはかかせないツールです。

ただしGulp本体や読み込むモジュールのバージョンが上がって使えなくなってしまうことも

ちょくちょくあるので、定期的に見直したいものです。

またよりよい設定があったら加えたいと思います。
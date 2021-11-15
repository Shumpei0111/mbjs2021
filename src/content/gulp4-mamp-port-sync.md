---
title: MAMPで作った環境下のHTMLをホットリロードさせる
date: 2019-10-14 13:40:22
tags: [gulp, HTML, javascript, nodejs, PHP]
---

> [Gulpの設定](/tags/gulp/)

フロントエンドエンジニアのShumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

今回はMAMPで作った環境下のHTMLをGulpでホットリロード（自動でブラウザを更新）させる方法を書いていきます。

MAMPは、PHP・Apache・MySQLの実行環境をクリックだけで用意できるソフトです。
PHPmyAdminもついているので、これだけで簡単に始められちゃいます。

[MAMP](https://www.mamp.info/en/mamp/)


## 状況

MAMPでPHPの実行環境を用意して、HTMLテンプレートとしてPHPを混ぜて書いています。

その際、更新したら都度Cmd + Rでブラウザ更新してたのですが、
とても面倒でしたので、Gulpのブラウザシンクによるホットリロードでそのへん解消したいと思います。

### それまでの設定

今まで知っているGulpのホットリロードの方法は以下の通り。

```js
var browserSync = require("browser-sync").create();

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
```

あとはwatchで更新を監視し、defaultで"server"タスクを設定…みたいなことをしていました。

> [参照：Gulp4のシンプルセッティング](/2019/07/10/gulp-4-setting/)


### 謎だったところ

ブラウザシンクのタスクの中に、ポートを設定するところがあります。

```js
browserSync.init({
    port: 8000,  <=== これ
    server: {
      baseDir: "./dist/",
      index: "./html/index.html"
    }
```

これは、Gulpが起動したら8000番のポートでアクセスできるようになるのですが、
MAMP自身のApacheは別の80番ポートで開いています。

なので、改めてポートを追加するみたいなことができないのではないか…と思いました。

実際、Gulp側のポートをMAMPで設定しているポートと同じ番号を書いたものの、
すでにMAMPが使っているのでアクセスできず。


## MAMPでのケースはこう書く

ポートの設定は行いません。

```js
// Browser Sync
gulp.task("server", function(done) {
  browserSync.init({
    proxy: "http://localhost:80/myproject/www/",
    reloadOnRestart: true,
  });
  done();
});
```

代わりに、`proxy`を使います。

`watch`と`default`の部分は以下の通り。

```js
// watch
gulp.task("watch", function(done) {
  gulp
    .watch("./www/**/*")
    .on("change", function() {
      browserSync.reload();
    });
  done();
});


// default
gulp.task("default", gulp.parallel("server", "watch"));

```

これだけでMAMPで作った環境下のHTMLファイルは更新されたら自動でブラウザをリロードできるようになりました。

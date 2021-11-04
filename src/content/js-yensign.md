---
title: 【JavaScript】JS / HTML で円マークを表示させる
date: 2021-03-10 0:31:00
tags: [javascript, HTML]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

今日も超小ネタです。

いわゆる円マークを画面に表示させる時どうするのか、という話です。


# JS / HTML で円マークを表示させる

ファイルの文字コードがShift-jisでJSファイルを書いている場合、

JSファイル内で円マークを表示させるときは`\xA5`で表示されます。

これは、JSがunicodeベースで作られているためです。

また、HTML上では`&yen;`で表示することができます。

今日は以上です。
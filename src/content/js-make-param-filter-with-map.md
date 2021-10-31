---
title: 【JavaScript】URLパラメータをfilterとmapを使って構築する
date: 2021-03-06 7:16:00
tags: [javascript]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

今回はURLパラメータをJSで作る際、**filter**、**map**を使用するパターンを紹介します。

今まで頑張って文字列と変数を使って作っていたのですが、

先輩と開発していたときにその先輩がこう書いていて、初めて見た時、「なるほど、読みやすくてこっちがいいじゃん！」となりました。

とても気に入っている方法です。

<!-- toc -->

# URLパラメータをJSのfilterとmapを使って作る

具体的にはこんな感じです。

```
const targetUrl = '../index.html?' + [
    ['paramA', code],
    ['paramB', Config.settingA && settingAKey],
    ["paramC", Config.settingB && settingBKey && isStatus('hoge')],
    ['paramD', Config.settingC && settingCKey && fugaStatus]
].filter( function( p ) {
    return !!p[ 1 ];
} ).map( function( p ) {
    return p.map( function( v ) {
        return encodeURIComponent( v.trim() );
    } ).join( '=' );
} ).join( '&' );
```

## ざっくり解説

```
const targetUrl = '../index.html?' + [
    ['paramA', code],
    ['paramB', Config.settingA && settingAKey],
    ["paramC", Config.settingB && settingBKey && isStatus('hoge')],
    ['paramD', Config.settingC && settingCKey && fugaStatus]
]
```

まず、取りうるパラメータを配列内配列で用意します。

また、**paramB**〜**paramD**のように条件を設定して、trueならパラメータとして有効にしたいものを設定します。

```
.filter( function( p ) {
    return !!p[ 1 ];
} )
```

次にfilterを噛ませます。

これは最初の配列内配列の中で、各１番目の値がtrueならfilterを通ります。

つまり、パラメータとして追加されることになります。

また、値の前に`!!`をつけると真偽値を返してくれるようになります。

```
.map( function( p ) {
    return p.map( function( v ) {
        return encodeURIComponent( v.trim() );
    } ).join( '=' );
} ).join( '&' );
```

**map**が２回使われています。

外側のmapは、filterで通ってきた配列（パラメータのペア）に対してループ処理を行います。

内側のmapは、上記で取り出された配列をキーと値をそれぞれ分解して処理を行います。

```
p.map( function( v ) {
        return encodeURIComponent( v.trim() );
    } ).join( '=' );
```

引数vはvalueという意味です。

`encodeURIComponent`でエスケープしてセキュリティ対策を行います。

v.trim()で余計な空白を取り除きます。

そして最後にjoinで「`キー=値`」としてパラメータとして組み立てます。

```
} ).join( '&' );
```
そして最後に内側のループで作ったパラメータのペアが複数あるので、`&`で繋いで完成です。

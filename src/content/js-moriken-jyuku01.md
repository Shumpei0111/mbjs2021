---
title: 【JavaScript】もりけん塾のフロントエンドエンジニア向けドリルをやってみた １〜５
date: 2021-03-15 2:17:00
tags: [javascript]
---

## intro-1

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

最近ツイッターで「**#もりけん塾**」というワードを見かけました。

追っていくと、フロントエンドエンジニアの森田さん([@terrace_tech](https://twitter.com/terrace_tech))という方が開いている

コーダーの方がフロントエンドエンジニアになるために学習されている向けの塾だそうです。

## intro-2

森田さんのGitHubに、その熟成の方向けに作られたJSの課題が置かれているのを発見しました。

[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)

独学でもコードを書く練習ができる教材を見つけては勝手にやらせてもらっているので、

もりけん塾の塾生の方とは何ら無関係ですが、とりあえずドリルをやってみたのでアウトプットとしてブログに残しておきたいと思います。

---

もしポリシーに違反していたりする場合は当該記事・ツイートを削除いたしますので、

ご連絡いただけましたら幸いです。



# マークアップエンジニアの方がフロントエンドエンジニアになる為の課題 １〜５

## 課題1

### 1.このDOMをhtml内のulの中に差し込んでください

```
<li>これです</li>
```

### 回答

- HTML

```
<div class='kadai-1'>
    <p>課題1</p>
    <ul id='kadai1Ul'></ul>
</div>
```

- JS

```
const kadai1 = function() {
    const $ = document.getElementById( 'kadai1Ul' );
    const newLi = document.createElement( 'li' );
    const newContent = document.createTextNode( 'これです' );
    newLi.appendChild( newContent );

    $.appendChild( newLi );
}
```

```
function init() {
    kadai1();
}

init();
```

### コメント

今まで`document.getElementById()`で取得する変数名に対し、`$`を使うことをしていませんでした。

ただ、明示的にDOMだということがわかりやすくなると思ったので

今回の課題に対しては採用していきたいと思います。

また、実行する`init()`関数は、すべての課題に対してこの形で実行していきます。


## 課題2

### 2.このDOMをJavaScriptでつくり、html内のulの中に差し込んでください

```
<li>
  <a href="1.html"><img src="bookmark.png" alt="ブックマーク" />これです</a>
</li>
```

### 回答

- HTML

```
<div class='kadai-2'>
    <p>課題2</p>
    <ul id='kadai2Ul'></ul>
</div>
```

- JS

```
const kadai2 = function() {
    const $ = document.getElementById( 'kadai2Ul' );
    
    function makeInnerElms() {
        const newLi = document.createElement( 'li' );
        const newContent = document.createTextNode( 'これです' );

        const aTag = document.createElement( 'a' );
        aTag.href = '1.html';

        const imgTag = document.createElement( 'img' );
        imgTag.src = 'bookmark.png';
        imgTag.alt = 'ブックマーク';

        const elms = [ aTag, imgTag, newContent ];

        elms.forEach( item => {
            newLi.appendChild( item );
        } )

        return newLi;
    }

    const elms = makeInnerElms();

    $.appendChild( elms );
}
```

### コメント

`li`用のエレメントを作って返してくれる便利な関数`makeInnerElms`を作りました。

`elms`という配列を作ってループで`appendChild`していくので、

配列の順序を変えてあげることで、DOMの構造を変えることができるのでいいかなと考えました。

今後はこの`makeInnerElms`を拡張していく形で進めていきます。


## 課題3

### 3.このDOMをJavaScriptでつくり、html内のulの中に差し込んでください

```
<ul>
  <li><a href="a1.html"><img src="/img/bookmark.png">a1</li>
  <li><a href="a2.html"><img src="/img/bookmark.png">a2</li>
</ul>
```

### 回答

- HTML

```
<div class='kadai-3'>
    <p>課題3</p>
    <ul id='kadai3Ul'></ul>
</div>
```

- JS

```
const kadai3 = function() {
    const $ = document.getElementById( 'kadai3Ul' );

    const elmContents = [
        {
            href: 'a1.html',
            imgSrc: '/img/bookmark1.png',
            txt: 'a1'
        },
        {
            href: 'a2.html',
            imgSrc: '/img/bookmark2.png',
            txt: 'a2'
        },
    ];
    
    function createLines ( elmContents ) {

        function makeInnerElms( obj ) {
            const newLi = document.createElement( 'li' );
            const newContent = document.createTextNode( obj.txt );

            const aTag = document.createElement( 'a' );
            aTag.href = obj.href;

            const imgTag = document.createElement( 'img' );
            imgTag.src = obj.imgSrc;

            const elms = [ aTag, imgTag, newContent ];

            elms.map( item => {
                newLi.appendChild( item );
            } );

            return newLi;
        }

        elmContents.forEach( item => {
            $.appendChild( makeInnerElms( item ) );
        } );
    }

    createLines( elmContents );
}
```

### コメント

`elmContents`という配列に、ピュアなオブジェクトでDOMにあてる要素を作り格納しました。

前回の課題で作った`makeInnerElms`を拡張して、配列を引数にとってリストを作る`createLines`という関数を作りました。

`elmContents`を分解してDOMを作るループ処理を行っています。


## 課題4

### 配列を使ってhtmlの中でJavaScriptでDOMを作りブラウザ出力がこのようになるようにしてください

- 配列

```
[{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}]
```

- DOM

```
<ul>
 <li><a href="/bookmark.html"><img src="1.png" alt="画像1">ブックマーク</a></li>
 <li><a href="/message.html"><img src="2.png" alt="画像2">メッセージ</a></li>
</ul>
```

### 回答

- HTML

```
<div class='kadai-4'>
    <p>課題4</p>
    <ul id='kadai4Ul'></ul>
</div>
```

- JS

```
const kadai4 = function() {
    const $ = document.getElementById( 'kadai4Ul' );

    const elmContents = [
        {
            to: 'bookmark.html',
            img: '1.png',
            alt: '画像1',
            text: 'ブックマーク'
        },
        {
            to: 'message.html',
            img: '2.png',
            alt: '画像2',
            text: 'メッセージ'
        },
    ];

    function createLines ( elmContents ) {

        function makeInnerElms( obj ) {
            const newLi = document.createElement( 'li' );
            const newContent = document.createTextNode( obj.text );

            const aTag = document.createElement( 'a' );
            aTag.href = obj.to;

            const imgTag = document.createElement( 'img' );
            imgTag.src = obj.img;

            const elms = [ aTag, imgTag, newContent ];

            elms.map( item => {
                newLi.appendChild( item );
            } );

            return newLi;
        }

        elmContents.forEach( item => {
            $.appendChild( makeInnerElms( item ) );
        } );
    }

    createLines( elmContents );
}
```

### コメント

図らずとも課題3でほぼ同じことを行っていましたので、配列に入れるオブジェクトのキー名を変更した程度でした

## 課題5

### 4のこちらをつかって、こんどはPromiseオブジェクトを使って解決された値として受け取り、同じようにDOMへ出力する

- 配列

```
[{to: "bookmark.html", img: "1.png", alt:"画像1", text: "ブックマーク"}, {to: "message.html", img: "2.png", alt:"画像2", text: "メッセージ"}]
```

- DOM

```
<ul>
 <li><a href="/bookmark.html"><img src="1.png" alt="画像1">ブックマーク</a></li>
 <li><a href="/message.html"><img src="2.png" alt="画像2">メッセージ</a></li>
</ul>
```

### 回答

- HTML

```
<div class='kadai-5'>
    <p>課題5</p>
    <ul id='kadai5Ul'></ul>
</div>
```

- JS

```
const kadai5 = function() {
    const $ = document.getElementById( 'kadai5Ul' );

    function getElmContents() {
        return [
            {
                to: 'bookmark.html',
                img: '1.png',
                alt: '画像1',
                text: 'ブックマーク'
            },
            {
                to: 'message.html',
                img: '2.png',
                alt: '画像2',
                text: 'メッセージ'
            },
        ];
    }


    return new Promise( (resolve) => {
        resolve( getElmContents() );
    } )
    .then( res => {
        if( !res ) { return; }

        const elmContents = res;

        function createLines ( elmContents ) {

            function makeInnerElms( obj ) {
                const newLi = document.createElement( 'li' );
                const newContent = document.createTextNode( obj.text );
    
                const aTag = document.createElement( 'a' );
                aTag.href = obj.to;
    
                const imgTag = document.createElement( 'img' );
                imgTag.src = obj.img;
    
                const elms = [ aTag, imgTag, newContent ];
    
                elms.map( item => {
                    newLi.appendChild( item );
                } );
    
                return newLi;
            }
    
            elmContents.forEach( item => {
                $.appendChild( makeInnerElms( item ) );
            } );
        }
    
        createLines( elmContents );
    } )
    .catch( err => {
        console.log( err );
    } );

}
```

### コメント

Promiseが出てきました。今回はrejectは書かないため、引数はresolveだけ取っています。

ただ、then/catchで最低限のエラーハンドリングだけ用意しています。

また、thenの最初で早期リターンを行い、余計なコードが走らないようにしています。

今回は`this`を使っていないので、`this`がどこを指しているかなどのスコープは考えていません。


## forEachとmap

今回、forEachとmapを使い分けるということを考えてみました

- mapは新しい配列を値として返す
- forEachはundefinedを値として返す

という違いがあることから、

- 加工して持ち歩きたい配列を作るときは**map**
- ただ配列を渡して処理をさせるだけのときは**forEach**

ということを意識しました。

## まとめ

今回は課題１〜５までを書きました。

`createElement`などのメソッドは普段使わないので、

`createTextNode`を副次的に使ったりするなど、知らないことを知るいいきっかけになりました。

現在課題17まで終わっているので、問題なければ順次ブログに上げていこうと思います。
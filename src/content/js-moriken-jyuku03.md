---
title: 【JavaScript】もりけん塾のフロントエンドエンジニア向けドリルをやってみた ９〜１１
date: 2021-03-17 2:32:00
tags: [javascript]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

[前回](https://www.mb-js.tokyo/2021/03/14/js-moriken-jyuku02/)に引き続き、**#もりけん塾**の課題を

野良でやっていこうと思います。

[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)

---

もしポリシーに違反していたりする場合は当該記事・ツイートを削除いたしますので、

ご連絡いただけましたら幸いです。



# マークアップエンジニアの方がフロントエンドエンジニアになる為の課題 ９〜１１

## 課題9

### async awaitを使って同じことをやってください。rejectは考慮しないでいいです。問題7をasync awaitを使って書いてください

[課題7](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#7)は、ローディングアニメーションが表示された後、リストが画面に表示される仕様になっています。

これをasyncとawaitを使って書き換えていきます。

### 回答

- HTML

```
<div class='kadai-9'>
    <p>課題9</p>
    <div class='kadai-9-wrapper'>
        <img src='./img/loading.gif' alt='loading' id='isLoading-kadai9' style='display:none'>
        <ul id='kadai9Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai9 = function() {
    const $ = document.getElementById( 'kadai9Ul' );
    const $loading = document.getElementById( 'isLoading-kadai9' );

    $loading.style = 'display:block';

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

    const getContentAsync = () => new Promise( (resolve, _) => {
        setTimeout( () => {
            $loading.style = 'display:none;'
            resolve( getElmContents() );
        }, 3000 );
    } );

    async function execute() {
        const items = await getContentAsync();
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
    
        createLines( items );
    }

    execute();
}
```

### コメント

async用の関数に、`execute`を用意しました。

また、async内で`await`で実行する関数名を`getContentAsync`としました。

getContentAsyncは中身はPromiseを使い、`getElmContents`を実行し、処理結果をPromiseオブジェクトとして返します。

その処理結果を変数`items`として`createLines`に渡します。

itemsは名前からして配列が返ってくる感じにできてるか、若干抽象的な名前になっているかもしれません。


## 課題10

### 問題9に追加で try-catch-finaliy を書いてください

１つ前の課題に、`try-catch-finaliy`を追加します。

### 回答

- HTML

```
<div class='kadai-10'>
    <p>課題10</p>
    <div class='kadai-10-wrapper'>
        <img src='./img/loading.gif' alt='loading' id='isLoading-kadai10' style='display:none;'>
        <ul id='kadai10Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai10 = function() {
    const $ = document.getElementById( 'kadai10Ul' );
    const $loading = document.getElementById( 'isLoading-kadai10' );

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

    const getContentAsync = () => new Promise( (resolve, _) => {
        try {
            // setTimeout( () => {
            //     $loading.style = 'display:none;'
            //     resolve( getElmContents() );
            // }, 3000 );
        } catch( e ) {
            console.log( e );
        }
         finally {
            setTimeout( () => {
                $loading.style = 'display:none;'
                resolve( getElmContents() );
            }, 3000 );
        }
    } );

    async function execute() {
        const items = await getContentAsync();
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
    
        createLines( items );
    }

    execute();
}
```

### コメント

Promiseを使うタイミングで`try/catch`を使いました。

Promiseで書いているんだし、then/catchでもいいかもしれませんが、

解決中に判定して絶対コケない処理をしたいという時に有効なのかな？と思いました。

```
const getContentAsync = () => new Promise( (resolve, _) => {
    try {
        // setTimeout( () => {
        //     $loading.style = 'display:none;'
        //     resolve( getElmContents() );
        // }, 3000 );
    } catch( e ) {
        console.log( e );
    }
        finally {
        setTimeout( () => {
            $loading.style = 'display:none;'
            resolve( getElmContents() );
        }, 3000 );
    }
} );
```

ただtry節に何書いていいかわからなかったので、何もしないでいます。

ここ、どうしたらよかったかな…実際はリクエスト処理とかをやる感じでしょうか

次回Promise内でtry/catchしたときの動きを確かめてみたいと思います。

## 課題11

### 簡易的なAPIを使ってエンドポイントを取得 前回までのコードを生かしてfetchを使ってデータを取得してください

問題文：

簡易的なAPIを使って同じことを[こちら](https://jsondata.okiba.me)のサイトに

```
{ "data": [
  {
    "a": "bookmark",
    "img": "img/1.png",
    "alt": "画像１",
    "text": "ブックマーク"
  },
  {
    "a": "message",
    "img": "img/2.png",
    "alt": "画像２",
    "text": "メッセージ"
  }
]}
```

上記を登録してエンドポイントを取得 前回までのコードを生かして fetchを使ってデータを取得してください

取得したデータは前回と同じように表示してください

### 回答

- HTML

```
<div class='kadai-11'>
    <p>課題11</p>
    <div class='kadai-11-wrapper'>
        <img src='./img/loading.gif' alt='loading' id='isLoading-kadai11'>
        <ul id='kadai11Ul'></ul>
    </div>
</div>

```

- JS

```
const kadai11 = function() {
    const $ = document.getElementById( 'kadai11Ul' );
    const $loading = document.getElementById( 'isLoading-kadai11' );

    function getElmContents() {
        return fetch( 'https://jsondata.okiba.me/v1/json/ydbaQ210312030342' )
                .then( res => res.json() )
    }

    const getContentAsync = () => new Promise( (resolve, _) => {
        try {
            // setTimeout( () => {
            //     $loading.style = 'display:none;'
            //     resolve( getElmContents() );
            // }, 3000 );
        } catch( e ) {
            console.log( e );
        }
         finally {
            setTimeout( () => {
                $loading.style = 'display:none;'
                resolve( getElmContents() );
            }, 3000 );
        }
    } );

    async function execute() {
        const items = await getContentAsync();
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
    
        createLines( items.data );
    }

    execute();
}
```

### コメント

JSON Okibaというサービスを初めて知りました。

リクエストのテストするのにいい練習になりますね。

[JSON Okiba](https://json.okiba.me/)

---

今回は`fetch`を使ってのリクエストを行います。

fetchメソッドを使ったことがなかったですが、Promiseが返ってくるなら書き方が想像できます。

```
function getElmContents() {
    return fetch( 'https://jsondata.okiba.me/v1/json/ydbaQ210312030342' )
            .then( res => res.json() )
}
```

最小だとこんな感じでしょうか。

thenしか書いてないですが、ちゃんと書くならcatchも書いてエラーハンドリングしたほうがいいですね。

あとはawaitで使う`getContentAsync`でこのメソッドを叩きます。

```
const getContentAsync = () => new Promise( (resolve, _) => {
    try {
        // setTimeout( () => {
        //     $loading.style = 'display:none;'
        //     resolve( getElmContents() );
        // }, 3000 );
    } catch( e ) {
        console.log( e );
    }
        finally {
        setTimeout( () => {
            $loading.style = 'display:none;'
            resolve( getElmContents() );
        }, 3000 );
    }
} );
```

finally節内のsetTimeoutで実行します。

executeメソッド内でawaitでgetContentAsyncを実行

↓

try/catch/finallyで最終的に必ずgetElmContentsが実行

↓

getElmContents内でもthen/catchを用意して、必ずなにか行う

という網を張っておく感じでしょうか。


## まとめ

Promise、async/await、fetchなど、非同期関数がたくさん出てきました。

WebアプリならSPAが基本になってきますし、UIの構築に絡んでくるため

非同期処理を覚えないといけないので、何回も試してみて理解を深めていきたいですね。

また、非同期で取得したレスポンスはピュアオブジェクトで返ってくるのか、JSONで返ってくるのかで

使うメソッドも変わってくるかと思います。

JSのアップデートによる純粋なAPIやライブラリを使って便利にラップしてくれるメソッドを使えますが、

中でどんな事が起きているのか、軽くでも確認しつつ勉強していきたいと思います。
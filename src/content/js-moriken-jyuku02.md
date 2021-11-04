---
title: 【JavaScript】もりけん塾のフロントエンドエンジニア向けドリルをやってみた ６〜８
date: 2021-03-17 1:58:00
tags: [javascript]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

[前回](https://www.mb-js.tokyo/2021/03/14/js-moriken-jyuku01/)に引き続き、**#もりけん塾**の課題を

野良でやっていこうと思います。

[マークアップエンジニアの方がフロントエンドエンジニアになる為の課題](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md)

---

もしポリシーに違反していたりする場合は当該記事・ツイートを削除いたしますので、

ご連絡いただけましたら幸いです。



# マークアップエンジニアの方がフロントエンドエンジニアになる為の課題 ６〜８

## 課題6

### 5で作ったものを3秒後に解決されるようにしてください

5というのは、[Promiseオブジェクトを使って解決された値として受け取り、同じようにDOMへ出力する](https://www.mb-js.tokyo/2021/03/14/js-moriken-jyuku01/#ke-ti-5)の拡張になります

### 回答

- HTML

```
<div class='kadai-6'>
    <p>課題6</p>
    <ul id='kadai6Ul'></ul>
</div>
```

- JS

```
const kadai6 = function() {
    const $ = document.getElementById( 'kadai6Ul' );

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


    return new Promise( (resolve, _) => {
        setTimeout( () => {
            resolve( getElmContents() );
        }, 3000 );
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

Promise内で`setTimeout`を使います。

今回はPromiseの引数を`resolve`と`_`を書いてみました。

`reject`と書いてもいいのですが、使う予定がないので`_`として、

明示的に使わない引数ですとしています。

```
return new Promise( (resolve, _) => {
    setTimeout( () => {
        resolve( getElmContents() );
    }, 3000 );
} )
```

3000ミリ秒後に`getElmContents()`が実行され、その戻り値が解決された値としてthen/catch節に渡ってきます。

あとの処理は５番目の課題で提示したものと同じになります。

## 課題7

### loadingを実装してみてください

よくあるぐるぐるマークが表示されたあと、今まで作ってきたリストが画面に表示されるという動きです。

[課題の画面サンプル](https://github.com/kenmori/handsonFrontend/blob/master/work/markup/1.md#7)

### 回答

- HTML

```
<div class='kadai-7'>
    <p>課題7</p>
    <div class='kadai-7-wrapper'>
        <img src='./img/loading.gif' alt='loading' id='isLoading-kadai7'>
        <ul id='kadai7Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai7 = function() {
    const $ = document.getElementById( 'kadai7Ul' );
    const $loading = document.getElementById( 'isLoading-kadai7' );

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


    return new Promise( (resolve, _) => {
        setTimeout( () => {
            $loading.style = 'display:none;'
            resolve( getElmContents() );
        }, 3000 );
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

HTMLにローディングのDOMを追加しました。

```
<img src='./img/loading.gif' alt='loading' id='isLoading-kadai7'>
```

ちょっとIDの付け方がミスったなぁと今は思います。

今後の課題もローディングがでてくるのですが、この命名規則に準拠しています。。

```
const $loading = document.getElementById( 'isLoading-kadai7' );

===

return new Promise( (resolve, _) => {
    setTimeout( () => {
        $loading.style = 'display:none;'
        resolve( getElmContents() );
    }, 3000 );
} )
```

JS側では、先にローディングのidを捕捉しておいて、Promiseの中でstyleを`display:none`にしています。

そうすることでローディングのgifは消えるのですが、

あとから考えたらこの書き方はよくないなと。

- 最初は`display:none`で読み込まれるべき
- JS側でイベントなり処理が走り始めてから`display:block`にして、処理が終わったら`display:none`に戻す

ほうが自然だと思い直し、次回以降の処理は修正を加えています。

また、ローディングの結果、resolveで正常に処理が終了してもしなくても何かしら画面に表示される仕様になると思うので

今回はdisplay:noneにするタイミングはここでいいかなと考えています。


## 課題8

### 3秒後にrejectを実行してthenでその値をコンソール出力してください

課題文：

つぎはresolveで解決するのではなく(resolveを実行するのではなく) 3秒後にrejectを実行してthenでその値をコンソール出力してください。ローディングはぐるぐる状態で良いです。

いままでresolveとしていたところでrejectを実行して、エラーを起こしてcatch節でエラーをキャッチしてください

### 回答

- HTML

```
<div class='kadai-8'>
    <p>課題8</p>
    <div class='kadai-8-wrapper'>
        <img src='./img/loading.gif' alt='loading' id='isLoading-kadai8' style='display:none'>
        <ul id='kadai8Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai8 = function() {
    const $ = document.getElementById( 'kadai8Ul' );
    const $loading = document.getElementById( 'isLoading-kadai8' );

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


    return new Promise( (_, reject) => {
        setTimeout( () => {
            reject( getElmContents() );
        }, 3000 );
    } )
    .then( () => {} )
    .catch( err => {
        // console.log( err );
    } );
}
```

### コメント

最小限でrejectのテスト的な形で書きました。

そのため、Promiseの引数を`_`、`reject`としています。

そしてrejectメソットでgetElmContents()を叩き、

無事catch節にたどり着きました。


## まとめ

DOMの生成については先に作っておいた関数を実行するだけなので、大丈夫かなと思います。

実際やるとしたらutilみたいなモジュール作って実行するので、

毎回中身を書く必要はないようにします。

また、命名やloadingの表示非表示のタイミングなど、考慮不足な面がありましたので反省します。

次回は`async`、`await`を使って同じ処理を実現する課題をやっていきます。
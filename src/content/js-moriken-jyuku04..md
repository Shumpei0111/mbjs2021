---
title: 【JavaScript】もりけん塾のフロントエンドエンジニア向けドリルをやってみた １２〜１４
date: 2021-03-21 1:49:00
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


<!-- toc -->

# マークアップエンジニアの方がフロントエンドエンジニアになる為の課題 12〜14

## 課題12

### クリックしたらリクエストをして、それらが表示されるようにしてください

[前回](https://www.mb-js.tokyo/2021/03/16/js-moriken-jyuku03/#ke-ti-11)のコードをベースに作っていきます。

### 回答

- HTML

```
<div class='kadai-12'>
    <p>課題12</p>
    <div class='kadai-12-wrapper'>
        <p id='req12Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: inline-block;border-radius: 3px;cursor: pointer;'>取得</p>
        <div>
            <img src='./img/loading.gif' alt='loading' id='isLoading-kadai12'>
        </div>
        <ul id='kadai12Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai12 = function() {
    const $ = document.getElementById( 'kadai12Ul' );
    const $loading = document.getElementById( 'isLoading-kadai12' );
    const $btn = document.getElementById( 'req12Btn' );

    $loading.style='display:none;'

    function getElmContents() {
        return fetch( 'https://jsondata.okiba.me/v1/json/ydbaQ210312030342' )
                .then( res => res.json() )
    }

    // JSON Okiba
    // https://json.okiba.me/
    // { "data": [
    //     {
    //       "a": "bookmark",
    //       "img": "img/1.png",
    //       "alt": "画像１",
    //       "text": "ブックマーク"
    //     },
    //     {
    //       "a": "message",
    //       "img": "img/2.png",
    //       "alt": "画像２",
    //       "text": "メッセージ"
    //     }
    //   ]
    // }

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
                resolve( getElmContents() );
            }, 3000 );
        }
    } );

    async function execute() {
        const items = await getContentAsync();
        function createLines ( elmContents ) {
            console.log( elmContents );

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
    
        $loading.style = 'display:none;'
        createLines( items.data );
    }

    function getItemsBy12 () {
        console.log( 'click' );
        $loading.style='display:block;'
        execute();
    }

    $btn.addEventListener( 'click', getItemsBy12, false );
}
```

### コメント

HTMLにボタンを追加しました

```
<p id='req12Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: inline-block;border-radius: 3px;cursor: pointer;'>取得</p>
```

JS側でイベントハンドラーを作って、最後に呼び出して登録しています。

```
function getItemsBy12 () {
        console.log( 'click' );
        $loading.style='display:block;'
        execute();
    }

$btn.addEventListener( 'click', getItemsBy12, false );
```

FireFoxだとクリックした要素の値をもとに何かする場合、

コールバックの関数に引数が必要なケースがあった気がします。。

## 課題13

### クリックしたらモーダルが出てきて、12で作ったボタンを押したらリクエストされ表示するようにしてください

### 回答

- HTML

```
<div class='kadai-13'>
    <p>課題13</p>
    <div class='kadai-13-wrapper'>
        <p id='modalOpen13Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: inline-block;border-radius: 3px;cursor: pointer;'>取得する</p>
        
        <div id='modalWrapper13' style='display:none'>
            <div id='modalBack13' style='background-color: #313131;opacity: 0.5;position: absolute;width: 100%;height: 100%;top:0;'></div>
            <div id='modalBody13' style='width: 300px;height: 200px;background-color: white;position: absolute;top:50%;left:30%;border-radius: 3px;'>
                <div class='req-btn-wrapper' style='position:relative;width:100%;height: 100%;'>
                    <p id='req13Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: block;border-radius: 3px;margin: 0 auto;width: 90px;text-align: center; position: absolute;top:40%;left:30%;cursor: pointer;'>取得ボタン</p>
                </div>
            </div>
        </div>
        <div>
            <img src='./img/loading.gif' alt='loading' id='isLoading-kadai13' style='display: none;'>
        </div>
        <ul id='kadai13Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai13 = function() {
    const $ = document.getElementById( 'kadai13Ul' );
    const $loading = document.getElementById( 'isLoading-kadai13' );
    const $modalWrapper = document.getElementById( 'modalWrapper13' );
    const $modalOpenBtn = document.getElementById( 'modalOpen13Btn' );
    const $modalBack = document.getElementById( 'modalBack13' );
    const $btn = document.getElementById( 'req13Btn' );

    function showModal() {
        $modalWrapper.style = 'display:block';
    }

    function closeModal() {
        $modalWrapper.style = 'display: none';
    }

    function getElmContents() {
        return fetch( 'https://jsondata.okiba.me/v1/json/ydbaQ210312030342' )
                .then( res => res.json() )
    }

    // JSON Okiba
    // https://json.okiba.me/
    // { "data": [
    //     {
    //       "a": "bookmark",
    //       "img": "img/1.png",
    //       "alt": "画像１",
    //       "text": "ブックマーク"
    //     },
    //     {
    //       "a": "message",
    //       "img": "img/2.png",
    //       "alt": "画像２",
    //       "text": "メッセージ"
    //     }
    //   ]
    // }

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
                resolve( getElmContents() );
            }, 3000 );
        }
    } );

    async function execute() {
        const items = await getContentAsync();
        function createLines ( elmContents ) {
            console.log( elmContents );

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
    
        $loading.style = 'display:none;'
        createLines( items.data );
    }

    function getItemsBy13 () {
        console.log( 'click' );
        $loading.style='display:block;'
        execute();
    }

    function initializeHandler() {
        $modalOpenBtn.addEventListener( 'click', showModal, false);
        $modalBack.addEventListener( 'click', closeModal, false );
        $btn.addEventListener( 'click', getItemsBy13, false );
        $btn.addEventListener( 'click', closeModal, false );
    }
    
    initializeHandler();
}
```

### コメント

だんだん長くなってきました。

HTMLにはモーダル用のラッパーコンテナを用意しました。

```
<p id='modalOpen13Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: inline-block;border-radius: 3px;cursor: pointer;'>取得する</p>
                
<div id='modalWrapper13' style='display:none'>
    <div id='modalBack13' style='background-color: #313131;opacity: 0.5;position: absolute;width: 100%;height: 100%;top:0;'></div>
    <div id='modalBody13' style='width: 300px;height: 200px;background-color: white;position: absolute;top:50%;left:30%;border-radius: 3px;'>
        <div class='req-btn-wrapper' style='position:relative;width:100%;height: 100%;'>
            <p id='req13Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: block;border-radius: 3px;margin: 0 auto;width: 90px;text-align: center; position: absolute;top:40%;left:30%;cursor: pointer;'>取得ボタン</p>
        </div>
    </div>
</div>
<div>
```

ここではモーダル用にモーダルそのものと、モーダルより後ろの要素を暗くするためのDOMを作っておきます。

`position: absolute`で位置を設定するので、bodyにも`position: relative`を付与しました。

JSはモーダル開閉のハンドラとして、2つ用意しました。

```
function showModal() {
    $modalWrapper.style = 'display:block';
}

function closeModal() {
    $modalWrapper.style = 'display: none';
}
```

また、最後にそれを登録しておきます。

```
function initializeHandler() {
    $modalOpenBtn.addEventListener( 'click', showModal, false);
    $modalBack.addEventListener( 'click', closeModal, false );
    $btn.addEventListener( 'click', getItemsBy13, false );
    $btn.addEventListener( 'click', closeModal, false );
}

initializeHandler();
```

モーダルを操作したときに閉じるのと、暗くした背景をクリックしてもモーダルが閉じるようにしてあります。


## 課題14

### 13で作ったモーダル内にinputをおいて、クリックした際にinputのvalueを取得して、リクエストできるようにしてください

問題文：

13で作ったモーダル内にinput (typeはnumber)をおいて、クリックした際にinput(type number)のvalueを取得して、リクエストできるようにしてください。(その値はPromiseを実行する手前でconsole.log出力されていればいいです)

### 回答

- HTML

```
<div class='kadai-14'>
    <p>課題14</p>
    <div class='kadai-14-wrapper'>
        <p id='modalOpen14Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: inline-block;border-radius: 3px;cursor: pointer;'>取得する</p>
        
        <div id='modalWrapper14' style='display:none'>
            <div id='modalBack14' style='background-color: #313131;opacity: 0.5;position: absolute;width: 100%;height: 100%;top:0;'></div>
            <div id='modalBody14' style='width: 300px;height: 200px;background-color: white;position: absolute;top:50%;left:30%;border-radius: 3px;'>
                <div class='req-btn-wrapper' style='position:relative;width:100%;height: 100%;'>
                    <input type='number' name='num' id='num14'>
                    <label for='num14'>
                        <p id='req14Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: block;border-radius: 3px;margin: 0 auto;width: 90px;text-align: center; position: absolute;top:40%;left:30%;cursor: pointer;'>取得ボタン</p>
                    </label>
                </div>
            </div>
        </div>
        <div>
            <img src='./img/loading.gif' alt='loading' id='isLoading-kadai14' style='display: none;'>
        </div>
        <ul id='kadai14Ul'></ul>
    </div>
</div>
```

- JS

```
const kadai14 = function() {
    const $ = document.getElementById( 'kadai14Ul' );
    const $loading = document.getElementById( 'isLoading-kadai14' );
    const $modalWrapper = document.getElementById( 'modalWrapper14' );
    const $modalOpenBtn = document.getElementById( 'modalOpen14Btn' );
    const $modalBack = document.getElementById( 'modalBack14' );
    const $btn = document.getElementById( 'req14Btn' );
    const $input = document.getElementById( 'num14' );

    function showModal() {
        $modalWrapper.style = 'display:block';
    }

    function closeModal() {
        $modalWrapper.style = 'display: none';
    }

    function getElmContents() {
        return fetch( 'https://jsondata.okiba.me/v1/json/ydbaQ210312030342' )
                .then( res => res.json() )
    }

    // JSON Okiba
    // https://json.okiba.me/
    // { "data": [
    //     {
    //       "a": "bookmark",
    //       "img": "img/1.png",
    //       "alt": "画像１",
    //       "text": "ブックマーク"
    //     },
    //     {
    //       "a": "message",
    //       "img": "img/2.png",
    //       "alt": "画像２",
    //       "text": "メッセージ"
    //     }
    //   ]
    // }

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
                resolve( getElmContents() );
            }, 3000 );
        }
    } );

    async function execute() {
        console.log( $input.value );

        const items = await getContentAsync();
        function createLines ( elmContents ) {
            console.log( elmContents );

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
    
        $loading.style = 'display:none;'
        createLines( items.data );
    }

    function getItemsBy14 () {
        $loading.style='display:block;'
        execute();
    }

    function initializeHandler() {
        $modalOpenBtn.addEventListener( 'click', showModal, false);
        $modalBack.addEventListener( 'click', closeModal, false );
        $btn.addEventListener( 'click', getItemsBy14, false );
        $btn.addEventListener( 'click', closeModal, false );
    }
    
    initializeHandler();
}
```

### コメント

モーダルにインプットの要素が入ってきましたので、labelとinputの紐づけを行いました。

```
<input type='number' name='num' id='num14'>
<label for='num14'>
    <p id='req14Btn' style='margin: 0;padding:8px 16px;background-color: #b3b3b3;display: block;border-radius: 3px;margin: 0 auto;width: 90px;text-align: center; position: absolute;top:40%;left:30%;cursor: pointer;'>取得ボタン</p>
</label>
```
取得するボタンとinputを紐づけは普段しないのですが、要素数が少ないため、このように考えました。

（取得するボタンをbutton submitでやるのであれば、hidden属性を用意してパラメータとして持ち運ぶような形でしょうか。）

## まとめ

課題12〜14まで行いました。

モーダルが出て、値入力して、取得ボタンをクリック、ローディングして、値を表示するというただそれだけなのですが、

アプリっぽい要素が増えました。

ちゃんと作り込むともっと長くなってくるので楽しくなってきますね。


---

try-catch、Promise内でやらずに、それを呼び出しているところで書いたほうがよかったですかね…
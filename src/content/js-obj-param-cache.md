---
title: 【JavaScript】オブジェクトの特定の値をキャッシュしておきたい
date: 2021-03-08 6:59:00
tags: [javascript]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

動的に要素数が変わってしまうオブジェクトの初期値をキャッシュしておきたいなんていう時、

変数化した配列に値を入れておいて、好きなときに取り出して使う方法です。


# オブジェクトをキャッシュする方法

1. オブジェクトの配列を用意する

```js
const itemArr = [
  {
    name: "mic",
    age: 16,
    gen: "male",
    params: document.getElementById("hoge")
  },
  {
    name: "drake",
    age: 20,
    gen: "male",
    params: document.getElementById("fuga")
  },
];
```

2. キャッシュ用の殻配列を用意する

```js
const cacheArr = [];
```

3. for文を回して任意の値をキャッシュ配列に入れていく

```js
function addCache(arr) {
  for (let i = 0; i < arr.length; i++) {
    cacheArr.push(arr[i].name(or age, pamars, etc...))
  }
};

addCache(itemArr);
```

もしくは。pushを使わずに、`cacheArr[cacheArr.length]`に代入していきます。

```js
function addCache(arr) {
  for (let i = 0; i < arr.length; i++) {
    cacheArr.push(arr[i].name(or age, pamars, etc...))
    cacheArr[cacheArr.length] = arr[i].name(or age, pamars, etc...);
  }
};

addCache(itemArr);
```



## 使い所

例えば初期値と現在のパラメータの比較で使えるかと思います。

スライドショーで、最初は１枚しか表示してなかったけど、

動的に増えたから矢印ボタンを表示させる…とかだと使えるかも。

## ワンポイントメモ

個人的には、最後の`addCache`としている関数は、`name`なら`addCacheInitName`などにして、

もう少し具体的な名前にします。

また、取得したいパラメータが２つ，３つくらいであれば、

それぞれパラメータ毎に分けて`addCacheInitAge`とか`addCacheInitParams`も作っておきます。

そうしておくと、それらをラップしておく関数を作っておけば修正がしやすくなります。

```js
function addInitCacheItems() {
    addCacheInitName();
    addCacheInitAge();
    addCacheInitParams();
}
```

こんな感じにまとめてあげると、関数の呼び出し順を変えることも簡単ですし、

ひとつだけ関数を消したり、あとから付け足すことも難しくないからです。

そしてこの`addInitCacheItems`関数も、例えば`initApp`みたいな一番大きい関数の１つのルーチンとして登録しておけば

取り出しやすいですね。
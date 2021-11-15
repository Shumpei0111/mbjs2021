---
title: 【Vue.js】v-forで作ったリスト内のラジオボタンをv-modelでチェックする
date: 2021-03-07 1:35:00
tags: [javascript, Vue.js]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

今回の話は、例えばタブUIを作るときなんかで使えるかもしれないです。

ラジオボタンをv-modelで捕捉しておいて、現在どのタブが選択されているかを確認します。

また、v-forで動的にリストを取得してUIを構築するときに使えるかなと考えています。


# コード

具体的にはこんな感じです。

## Vue側
```js
data: {
  choosed: ""
  list: [
    { id: 1, name: "a", val: "b" },
    { id: 2, name: "c", val: "d" }
  ]
}
```

## テンプレート側
```html
<ul>
  <li v-for="item in list" :key='item.id'>
    <input type="radio" name="sample" 
      v-model="choosed" :id="item.name" :value="a.val">
    <label :for="item.name">{{ item.val }}</label>
  </li>
</ul>
```

---

別に特別なことはしてないですが、これを作ってCSSでラジオボタンを`display:none`で消すことで

labelをタブUIを書けば完成です。

また、表示はされていないものの、ラジオボタンとlabelタグはfor属性で紐付いているので、

CSSは`radio:checked`が有効になります。

つまり、選択状態が取得できるので、選択中のスタイルも設定することが可能です。
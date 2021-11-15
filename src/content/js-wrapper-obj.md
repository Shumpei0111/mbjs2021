---
title: 【JavaScript】プリミティブ型はほぼオブジェクトという話
date: 2021-03-11 9:37:00
tags: [javascript]
---

## intro

こんにちは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

今日はJSのラッパーオブジェクトについて書きます。

文字列型だけど一瞬プロパティが作られて、実行直後に破棄される動きです。


# JSのラッパーオブジェクトの不思議

## プリミティブ型の仕様

### 不思議に思ったこと

  ```js
  const falsy = "false";

  if(falsy) {
    console.log(falsy.aa = "aa");
    console.log(falsy);
  }

  コンソール出力結果：
  "aa"
  "false"
  ```

オブジェクト的な扱いなのであれば、

"false"の中にkey aaのValue "aa"が存在するのでは？

どういうデータ構造になっているのかわからない

---

JSは基本全てオブジェクトであるが、プリミティブ型はほぼオブジェクトというような位置づけ

JSはエラー回避のため、上記のようなコードがあった場合、
実行用のオブジェクトが一瞬作られ、実行したら即破棄される

そのため、コンソールにはaa, falseとなった

仕様上の動きであり、String, Array, Number, Booleanなどの型でも同様の動き

これがラッパーオブジェクト
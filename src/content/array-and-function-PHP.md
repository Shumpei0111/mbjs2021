---
title: PHP学習 - 配列と関数
date: 2019-07-21 11:16:32
tags: [PHP, プログラミング学習]
---

> [PHPの学習の記録](/tags/PHP/)

こんにちは、shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。
最近取り組んでいるPHP学習、まだ難しいところは出てきていないので、
とっとと進めていきたいと思います。


## コード
では今日もドットインストールさんのPHP入門をやっていきます。

> [PHP入門](https://dotinstall.com/lessons/basic_php_v2)

今回は配列と関数です。



```
<?php

// #13 配列
// key value

$sales = array(
  "shumpei" => 200,
  "shun" => 800,
  "aaa" => 400,
);

// PHP5.4は以下の書き方
$sales = [
  "shumpei" => 200,
  "shun" => 800,
  "aaa" => 400,
];

var_dump($sales["shumpei"]); //200
$sales["shumpei"] = 900;
var_dump($sales["shumpei"]); //900

$colors = ["red", "blue", "pink"];
var_dump($colors[1]); //blue


// #14 foreach
$sales = [
  "shumpei" => 200,
  "shun" => 800,
  "aaa" => 400,
];
foreach ($sales as $key => $value) {
  echo "($key) $value ";
}

$colors = ["red", "blue", "pink"];
foreach($colors as $value) {
  echo "$value ";
}

// コロン構文 foreach, if, while, for
foreach($colors as $value) :
  echo "$value ";
endforeach;

// コロン構文の利点はHTMLと混ぜて書く時に見通しがいい
?>
<ul>
  <?php foreach($colors as $value) : ?>
  <li><?php echo "$value "; ?></li>
  <?php endforeach; ?>
</ul>

<?php
// #15 関数

function sayHi($name = "shumpei", $name2 = "") {
  echo "hi! ". $name . $name2;
}

sayHi("Hikisu");
sayHi("Hikisu1", "Hikisu2"); // 引数が複数渡る場合、カンマで区切る。第2引数も与える場合、初期値も用意する
sayHi(); // 引数の初期値が渡り、shumepiが入る


function sayHi2($n = "sayHi2") {
  return "hi! " . $n;
}
$s = sayHi2();
var_dump($s);
```

## 感想

今回便利だなと思ったのは、**コロン構文**です。
HTMLの中で見通しがいいことはとても重要だと思うので、
フロントで使う場合には、結構選ぶ書き方になってくるような気がしました。

また、今までで学習してきた言語と似ている部分がありました。
JavaScriptにおける**メソッドチェーン**のような書き方です。

例えば68行目などにある`return "hi! " . $n;`というコード。
文字列と変数を`.`で繋げています。

JavaScriptも`.`でメソッドを繋げて書くことがありますので、
なれている書き方です。

ただ、ちょっと違うのは、この`.`の両サイドをスペースで開ける部分です。
JavaScriptは開けて書かないので、PHPの文化なのでしょうか。

それではまた次回。
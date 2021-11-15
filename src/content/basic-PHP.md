---
title: PHP学習 - 文字列・条件分岐・三項演算子・ループ
date: 2019-07-21 01:44:25
tags: [PHP, プログラミング学習]
---

[前回:PHPの学習をはじめました](https://www.mb-js.tokyo/2019/07/18/get-start-php/)から引き続き、
PHPの学習記録記事です。

今回はタイトル通り、**文字列・条件分岐・三項演算子・ループ**を学習しました。

## コード

```php
<?php

// #07文字列
// "" 特殊文字（\n, \t）・変数の展開が可能
// ''

$name = "shumpei";
$s1 = "hello $name!\nhello again";
$s2 = "hello {$name}!\nhello again";
$s3 = "hello ${name}!\nhello again";
$s4 = 'hello $name!\nhello again';
// {}は＄を含めても含めなくても展開される
var_dump($s1);
var_dump($s2);
var_dump($s3);
var_dump($s4);

// 文字列の連結は"."を使う
$s = "hello" . "world";
var_dump($s);


// #08 if条件分岐
$score = 2;

if ($score > 80) {
  echo "greate!";
} elseif ($score > 60) {
  echo "good!";
} else {
  echo "so so";
}

// #09 真偽値
/*
 falseになる場合
 文字列： 空、"0"
 数値： 0, 0.0
 論理値： false
 配列： 配列の要素の数が0
 null
*/

$x = 5;
if ($x) { // $x == true
  echo "great";
}

// 三項演算子
$max = ($a > $b) ? $a : $b; 
//()内の条件がtrueの場合は左辺を実行、falseなら右辺を実行

if ($a > $b) {
  $max = $a;
} else {
  $max = $b;
}

// #10 switch
$signal = "green";

switch ($signal) {
  case "red":
    echo "stop!";
    break;
  case "blue":
  case "green"; // switchで条件増やす場合はcaseを増やす
    echo "go!";
    break;
  case "yellow":
    echo "caution!";
    break;
  default:
    echo "wrong signal";
    break;   
}

// #11 while

// while
// do...while
$i = 100;

while($i < 10) {
  echo $i;
  $i++;
}
//$i=100で前判定だとfalseになってループに入らない

do {
  echo $i;
  $i++;
} while ($i < 10);
// 後判定だととりあえず1回表示されるので、100がechoされる


// $12 for
for ($i = 0; $i < 10; $i++) {
  if ($i === 5) {
    // break;
    continue;
  }
  echo $i;
}
```

## PHPの基本構文
ここはまぁ、今まで自分がやってきたRubyやJavascriptと変わらないような書き方なので
特に違和感もなく書くことができました。

またswitch文で、caseが複数あって処理は同じようにしたいときの書き方を知らなかったので、
そこはひとつ発見でした。（コード67行目）

## 進捗
ドットインストールさんのPHP入門はこれで40％まで到達しました。
もう少しペース上げたいですね。
がんばります。
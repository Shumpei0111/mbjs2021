---
title: PHPの学習をはじめました
date: 2019-07-19 00:00:21
tags: [PHP, プログラミング学習]
---

こんばんは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

昨日の記事にも書かせていただきましたが、PHPの学習をはじめました。

PHPはまだ全然書いたことがなく、WordPressの独自テーマを作ったことはあるのものの、
あれば独特だと思いますので、PHPらしいPHPはまだです。

今日からPHPの学習をはじめましたので、その記録を残しておきたいと思います。

初めは本当に簡単なところからだと思いますが、
一体どれくらい書けるようになるのか、Laravelなどを使う日が来るのか楽しみです。


## なぜPHP？

これは[昨日書かせていただきました](https://www.mb-js.tokyo/2019/07/17/recently-goal/#php-mysqldenoapurikai-fa)が、ひとつの課題からスタートしました。

Rubyもまだあまり書けないので、どうなることがわかりませんが、
一生懸命他の塾生に負けないように頑張りたいと思います。

## どこから

PHPを学習するにあたって、先日環境構築をDockerで行いました。

> [はじめてのDockerインストール](https://www.mb-js.tokyo/2019/07/13/docker-install/)

この環境を使って作っていきたいと思います。

Dockerの中はgitがインストールされておらず、gitの環境にはなってないので、
ローカル側で共有しないといけなさそうです。
（あとでやります。）


取り急ぎ、ドットインストールさんの[PHP入門](https://dotinstall.com/lessons/basic_php_v2)から始めました。

とりあえず今日は#01 ~ #06まで進めました。
入門講座は#30まであるので、まだまだ先は長いです。。

> [PHP入門](https://dotinstall.com/lessons/basic_php_v2)


## とりあえず書いたコード

Docker環境で用意した`/var/www/html/index.php`にどんどん書いていって増やして、
`localhost:80/index.php`にアクセスして実行を確認していくスタイルにしています。

```
<?php 
// #04
// 変数の書き方
$msg = "hennsu";

echo $msg;
// hensuu

var_dump($msg);
// 変数の型と値を確認できる

// #05
// 定数の書き方

define("MY_EMAIL", "test@example.com");
// 定数は大文字を使う

echo MY_EMAIL;

// MY_EMAIL = "hoge";
//Parse error: syntax error, unexpected '=' in /var/www/html/index.php on line 19
// 定数なので代入は一回のみ

var_dump(__LINE__);
// 現在の行数を出力 commit 24

var_dump(__FILE__);
// ファイル名を出力 "/var/www/html/index.php"

var_dump(__DIR__);
// ディレクトリ名を出力 "/var/www/html"

// #06
// 数値演算
$x = 10 % 3; // 余剰
$y = 30.2 / 4 ; // 割り算

var_dump($x);
// int 1

var_dump($y);
// float 7.55

$z = 5;
$z++;
var_dump($z);
// int 6

$z--;
var_dump($z);
// int 5


$x = 5;
// $x = $x + 2;
$x += 2;
var_dump($x);
// int 7
```

## 今日学んだこと

1. PHPの終了タグは、後になにか出力することがなければ`?>`を書かないことが推奨されている
1. `var_dump();`で中の値と型を確認できる
1. PHPは定数を()内で`,`で区切る

## がんばります

引き続きがんばります。
SQLもやらねば…
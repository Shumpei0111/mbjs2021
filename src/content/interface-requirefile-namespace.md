---
title: PHP学習 - インターフェース、外部ファイル読込、名前空間
date: 2019-07-23 16:39:17
tags: [PHP, プログラミング学習]
---

> [PHPの学習の記録](/tags/PHP/)

こんにちは、shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。
ドットインストールさんの入門教材もだいぶ後半になってきました。

今日もクラスから始めていきます。
それではやっていきましょう。

<!-- toc -->

## コード

今回はこんな感じで、クラスに付随する機能、外部ファイルをどう呼ぶか、名前空間の設計についてです。

```
<?php

// #24 インターフェース

// 「このクラスではこのメソッドを必ず実装してくださいというルールを定義する」ための仕組み
// intefaceの特性上、アクセス権はpublicになる
interface sayHi {
  public function sayHi(); // <-実装してほしいメソッド"sayHi()"
}

interface sayHello {
  public function sayHello(); // <-実装してほしいメソッド"sayHello()"
}

/* 抽象クラスでは、抽象クラス以外のメソッドやプロパティの実装ができるのに対して、
   interfaceではそうしたことができない点に注意
*/
// クラスを作る際、インターフェースは継承(extends)と違い、カンマ区切りで複数追加できる
class User implements sayHi, sayHello {
  public function sayHi() {
    echo "Hi";
  }

  public function sayHello(){
    echo "hello";
  }
}


// #25 外部ファイルを読み込む

require "usr.class.php";
/* 外部ファイルの中身　usr.class.php
class Usr {
  public $name;
  public function __construct($name) {
    $this->name = $name;
  }
  public function sayHi() {
    echo "hi, i am $this->name";
  }
}
*/

// require: fatal error <-エラーが出たらその場で処理を終了する
// require_once

// include: warning <-エラーが出ても処理を続行する
// include_once

// *_onceがついていると、phpが自動的に読み込まれているかチェックしてくれる
// もし読み込まれていたらスキップされる


// autoload: <-classのみでしか使用できない
// ファイルが読み込まれた際にclassが未定義だった場合に読み込まれて実行される仕組み
spl_autoload_register(function($class) {
  require $class . ".class.php";
});

$bob = new Usr("Bob");
$bob->sayHi();


// #26 名前空間

require "Ns.class.php";
/* 外部ファイルの中身
namespace Dotinstall\lib;

class Usr {
  public $name;
  public function __construct($name) {
    $this->name = $name;
  }
  public function sayHi() {
    echo "hi, i am $this->name";
  }
}
*/


// ライブラリの呼び出し方 1 ... 直接呼び出し
$bob = new Dotinstall\lib\Usr("Bob");


// ライブラリの呼び出し方 2 ... use asで省略
use Dotinstall\lib as Lib;
$bob = new Lib\Usr("Bob");

// ライブラリの呼び出し方 3 ... 最後のlibだけを判定して使うことも可能
use Dotinstall\lib;
$bob = new lib\Usr("Bob");

$bob->sayHi();
```

### インターフェース
[前回](https://www.mb-js.tokyo/2019/07/22/class-access-static-abstract/)やった継承とは違い、
そのクラス以外のメソッドやプロパティは作れないのと、
特性上すべてpublicであることが特徴ですね。

継承はやろうと思えばどこにでも使える便利な部品に対し、
インターフェースは特定のクラスで活躍する部品というイメージです。


### 外部ファイル
外部ファイルの呼び出し方が大きく3種類あることを学習しました。
依存関係を解決して使用できるようにするために、
ちゃんと保証していく仕組みとして、必ず覚えないといけないものになるかと思われます。


### 名前空間
外部ファイルを呼び出しつつ、専用の名前空間の設けることで衝突を防ぐ仕組みですね。
大規模ファイルになると名前空間が本当に大切になりますし、
プラグインなんかを作ろうとすると、こういう仕組みを利用しながら作るようになるのではないかなと思います。


## まとめ
今回は依存関係をどう処理していくかのとっかかりになるかと思われます。
とりあえずこれで呼び出し方がわかったので、今後はこれに付け足しながら覚えていく形になるかと思われます。

### 進行度

> [PHP入門](https://dotinstall.com/lessons/basic_php_v2)
  - 完了レッスン数26 / 30 回
  - 86%

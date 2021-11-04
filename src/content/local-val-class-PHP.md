---
title: PHP学習 - ローカル変数とクラス（インスタンス生成と継承）
date: 2019-07-21 22:51:35
tags: [PHP, プログラミング学習]
---

> [PHPの学習の記録](/tags/PHP/)

こんばんは、shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。


だんだんとドットインストールさんの動画を見ただけでは仕様がわからず、
調べたり質問させていただきながら学習しています。

それではいってみましょう。


## コード ローカル変数と関数

```
<?php

//#16 ローカル変数
$lang = "ruby";

function sayHi($name) {
  $lang = "php";
  echo "Hi  $name from $lang"; 
}

sayHi("Tom");
var_dump($lang); // ruby


// //#17 組み込み関数
$x = 5.6;
echo ceil($x); // 6 小数点以下を切り上げる
echo floor($x); // 5 小数点以下を切り捨て
echo round($x); // 6 四捨五入
echo rand(1, 10); // 範囲乱数

$s1 = "hello";
$s2 = "ねこ";
echo strlen($s1); // 5 文字数をカウント
echo mb_strlen($s2); // 2 日本語（マルチバイト）で文字数をカウント
printf("%s - %s - %.3f", $s1, $s2, $x); // string, string, floot(小数点以下3桁まで表示)


$colors = ["red", "blue", "pink"];
echo count($colors);
echo implode("@", $colors); // @でつなぐ
```

組み込み関数でつまづきました。

仕様の確認をするべく、最初`printf($s1, $s2, $x);`として実行したところ、
`hello`しかかえってきませんでした。

`hello`は、printfの第1引数である`$s1`です。

なんとなく思い込みで`$s2`や`$x`も代入されるつもりだったのですが、
printfメソッドの仕様を理解していませんでした。

{%twitter https://twitter.com/seventhseven/status/1152926325553823744 %}

するとすかさず、りらぞうさんが教えてくださいました。

{%twitter https://twitter.com/rirazou_/status/1152927221440323585 %}

つまり、`$s1`をまず展開して、その中に`$s2`や`$x`を入れるような仕様なのですね。
なので、第2引数以降を入れる受け皿を用意してあげないといけないイメージを持ちました。


## コード class

次はclassについてです。
個人的に概念はわかるけどまだ少しとっつきにくい感じがしています。

たい焼きの型とかで表現されていますが、
内部構造までちゃんと理解して使いこなせてないのでまだ道な部分が多いです。

```
<?php

//#18-20 クラスとインスタンス

// User class
// class名の1文字目は大文字
class User {
  // property
  public $name;

  // constructor
  // インスタンスを生成する(new)する時に、最初に実行される関数で、初期化に使う
  // 引数はインスタンスを作る時に渡される値
  // 渡された引数$nを、propertyの$nameにセットしたいので、$this->nameと書く
  // propertyやmethodにアクセスしたいときも$thisを使う
  public function __construct($n) {
    $this->name = $n;
  }

  //method
  public function sayHi() {
    echo "hi, i am $this->name!";
  }
}

$tom = new User("Tom");
$bob = new User("Bob");

echo $tom->name; // Tom

$bob->sayHi(); // hi, i am Bob!



// #20 クラスを継承する
// 親クラス
class Usr {
  public $name;

  public function __construct($n) {
    $this->name = $n;
  }
  
  // method名の前に"final"をつけると小クラスでoverrideできなくなる
  public function sayHi2() {
    echo "hi, i am $this->name!";
  }
}

// 子クラス
// extendsで継承できる
class AdminUser extends Usr {
  public function sayHello(){
    echo "hello from Admin";
  }

  //override
  public function sayHi2() {
    echo "[admin]hi, i am $this->name!";
  }
}

$tm = new Usr("Tm");
$stv = new AdminUser("Steve");

echo $tm->name;
echo $stv->name;

$tm->sayHi2();
$stv->sayHi2();
$stv->sayHello();
```

constructor、これはもうこういうものとして覚えるやつっぽいですね。

インスタンス生成時に最初に実行される関数として、
newした時に渡される引数が入って、
プロパティと紐付いたり、メソッドに紐付いたりするようです。

### クラスにおける名前空間

複数のプロパティ、複数のコンストラクタ、複数のメソッドを書いていないので
どういう動きかはまだちょっと不明な部分があります。

また、公式を見たところ、以下の説明がありました。

> クラスのプロパティとメソッドは、それぞれ別の "名前空間" に存在するので、 同じ名前のプロパティとメソッドを共存させることもできます。 プロパティを参照する場合もメソッドを参照する場合も書きかたは同じです。 それがプロパティへのアクセスなのかメソッドの呼び出しなのかは、そのコンテキストによって決まります。 つまり、変数にアクセスしようとしているのか関数を呼び出そうとしているのかの違いです。

プロパティで使う変数名とメソッド名で使う関数名は同じでも中身によって結果が変わるということなんですね。


## 並行して学ぶことで理解が進む
少し前に、初めてVue.jsをまとも書きました。

そこでmethodやcomputedなど、様々なプロパティや動作を書いていたのですが、
あれこそclass設計に近いものなのかな、と今思いました。

いろんなものをつまみながら学んでいくスタイルなので、
その時はしっくりこなくても、横断しているうちに理解が深まります。

するとまた楽しくなるので、レベルアップが期待できます。
引き続き宜しくおねがいします。

### 進行度

> [PHP入門](https://dotinstall.com/lessons/basic_php_v2)
  - 完了レッスン数20 / 30 回
  - 66%
---
title: PHP学習 - classにおけるアクセス権、staticキーワード、抽象クラス 
date: 2019-07-23 01:24:17
tags: [PHP, プログラミング学習]
---

> [PHPの学習の記録](/tags/PHP/)

こんばんは、shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。
今日も苦手なクラスについてです。

とりあえずやってたらいつか分かる日が来るよね…という心持ち。
それではやっていきましょう。

## コード

```php
<?php

// #21アクセス権
// - private: そのクラス内からのみアクセス可能
// - protected: そのクラス＋親子クラス内からのみアクセス可能
// - public: どこからでもアクセス可能

// 親クラス
class Usr {
  // public $name;
  // private $name; // this->nameからは呼べるが、インスタンスから直接呼べない
  protected $name; // 親子クラスからのみアクセス可能

  public function __construct($n) {
    $this->name = $n;
  }
  
  public function sayHi() {
    echo "hi, i am $this->name!";
  }
}

// 子クラス
// extendsで継承できる
class AdminUser extends Usr {
  public function sayHello(){
    echo "hello from $this->name";
  }
}

$tom = new AdminUser("Tom");
$bob = new Usr("Bob");

$tom->sayHello(); // privateだとアクセスできないが、protectedなら継承が通るのでアクセスできる


// #22 staticキーワード
// インスタンス化しなくても使えるメソッドやプロパティを定義することが可能
class User {
  public $name;
  public static $count = 0; // インスタンスを生成した分だけカウントが回るように

  // constructorで生成した分だけ$countが回るように
  // selfに対してカウントする
  public function __construct($n) {
    $this->name = $n;
    self::$count++;
  }
  
  public function sayHi() {
    echo "hi, i am $this->name!";
  }

  // staticにするとインスタンス化しなくても使える
  public static function getMessage() { 
    echo "`hello from user class`";
  }  
}

User::getMessage();

$t = new User("Tom");
$b = new User("Bob");

echo User::$count; // 2


// #23 抽象クラス
// 抽象クラスは継承されることを前提にして作られたクラス。それ自身をインスタンス化することはできない
abstract class BaseUser {
  public $name;
  abstract public function sayHi(); // 必ず実装するという書き方
}

class U extends BaseUser {
  public function sayHi() {
    echo "[U]hello from User";
  }
}
```

### アクセス権
private、protectedの動きは、まぁそうだよね。というところ。

ちょっとまだどんな時に使おうかピンときてないところですが、
多分昔Railsでやったはず。


### staticキーワード
インスタンスを作る必要がないのがポイントですね。

また、コンストラクタの場合、自分自身は`self`で呼び出すのがひとつ。
コンストラクタとプロパティは同じくらいのボリュームに膨れそうでなイメージを持ちました。

### 抽象クラス
継承されることを前提にして作るクラスということで、
はじめからパーツに分けておくことで、メンテンス性が高まりますね。

また、カプセル化ということでしょうか、
使う側は中身を知らなくてもよいのでベタにオブジェクト指向だなって思いました。


## まとめ
こうして継承やアクセスをどこまで許すか、クラス設計のはしっこを学習しました。

ひとつのクラスで持つ情報の粒度がかなりポイントになりそうだなという気がしています。

また、適切な名付けができないと、後々かなりきつくなるんだろうなというところ…。


### 進行度

> [PHP入門](https://dotinstall.com/lessons/basic_php_v2)
  - 完了レッスン数23 / 30 回
  - 76%
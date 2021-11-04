---
title: PHP学習 - 例外処理、フォーム処理、クッキーとセッション
date: 2019-07-23 18:00:47
tags: [PHP, プログラミング学習]
---

> [PHPの学習の記録](/tags/PHP/)

こんばんは、shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。
ドットインストールさんのPHP入門も今回でラストまで来ました。

今回は例外処理やフォームやクッキーなど、フロント側もからめた処理をやっていきます。
それではいってみましょう。


## コード

### 例外処理

例外処理も結構重要なものですよね。
何かデータを受け取ってから処理を行うようなものについてはテストも一緒にしながら例外処理を書いていく必要がありそう。


```
<?php

// #27 例外処理

// function div($a, $b) {
//   echo $a / $b;
// }

// div(7, 2);
// div(5, 0); // ０で割るのでwarning

// warningを出さず、自分で例外の動きを設定する
function div($a, $b) {
  try {
    if($b === 0) {
      throw new Exception("cannot divide by 0"); // PHPで用意されているExceptionクラスを投げる
    }
    echo $a / $b;
  } catch (Exception $e) { // throwで例外が投げられたときの処理
    echo $e->getMessage(); // getMessageでExceptionインスタンスを作った時に渡る文章を返す
  }
}

div(7, 2);
div(5, 0); // cannot divide by 0
```


### フォーム処理
今回はフォームに名前を入れてそれの文字数判定を行う処理を書きました。

```
<?php

// #28 フォームからデータを処理する
// フォームに投げられる文字数をチェックする
$n = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $n = $_POST["usrname"];
  $err = false;
  if(strlen($n) > 8) {
    $err = true;
  }
}

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="utf-8">
</head>
<body>
  <!-- #28 -->
  <form action="" method="POST">
    <input type="text" name="usrname" placeholder="name" value="<?php echo htmlspecialchars($n, ENT_QUOTES, "UTF-8"); ?>">
    <input type="submit" value="go">
    <?php if($err) { echo "too long"; } ?>
  </form>
</body>
</html>
```

最初にPHP側で`$err = false;`としてエラーが起きてない状態を定義して、
フォームに投げられたら、その下のif文に入るわけですね。

また、フォームに入力した値をPOSTしても、
入力した文字列をフォームに表示させておく処理を追加したい場合は以下のとおりです。
`value="<?php echo htmlspecialchars($n, ENT_QUOTES, "UTF-8"); ?>"`

HTML側のフォームには、`htmlspecialchars~`で
SQLインジェクションなどのセキュリティ面も考えることが大切かと思われます。


### クッキーとセッション

クッキーとセッションの大きな違いは以下の通り

- クッキー…クライアント（ブラウザ）側で情報を保存する
- セッション…サーバ側で情報を保存する

```
// #29 Cookieを使う
// ブラウザ側にデータを保存する

setcookie("usr", "shumpei"); // ブラウザを閉じるまで有効なクッキーをセットする
setcookie("usr", "shumpei", time()+60*60); // １時間で切れるクッキー
setcookie("usr", "shumpei", time()-60*60); // クッキーを削除する「-」を使う

echo $_COOKIE["usr"];


// #30 セッションを使う
// サーバ側にデータを保存する
session_start();

$_SESSION["usrname"] = "session_shumpei";

echo $_SESSION["usrname"];

// unset($_SESSION["usrname"]); // セッションを削除
```

クライアント側で重要な情報を持ってしまうと、
その情報には簡単にアクセスできてしまうので、
セキュリティ的に危険です。

ですので、クッキーに渡すのはそのページにアクセスした履歴だけなどを渡すだけとかにして、
重要な情報は原則サーバ側で管理することが大切ですね。

## まとめ
ユーザから渡される情報や、アクセスした際に持たせる重要な情報の管理は、
基本的にサーバ側で持つようにして、
クライアント側はあくまで窓口に徹するような作りがいい気がしています。

### 進行度

ドットインストールさんのPHP入門を修了しました。

> [PHP入門](https://dotinstall.com/lessons/basic_php_v2)
  - 完了レッスン数30 / 30 回
  - 100%
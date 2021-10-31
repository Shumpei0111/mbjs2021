---
title: はじめてのDockerインストール
date: 2019-07-14 01:06:42
tags: [Docker, 環境構築, PHP, mysql, apache]
---

こんばんは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。



PHPとMySQLの学習をするために、こんなツイートをしたところ、
たくさんのアドバイスをいただきました。

今回はかなり長くなってしまいましたが、
Dockerを使ってLAMP（Linux Apache MySQL PHP）環境を構築していきます。
宜しくお願いします。


<!-- toc -->

{% twitter https://twitter.com/seventhseven/status/1149729098492604416 %}

名前だけ聞いたことのあるXAMPを手がかりにしていたのですが、
**MAMP**や**Docker**をおすすめいただきました。

## MAMP
{% twitter https://twitter.com/kikkawapapa/status/1149812734994681856 %}
{% twitter https://twitter.com/seltzer/status/1149822157481897984 %}


MAMPはPHPとMySQL、ApacheをGUIで作れるソフトのようで、
[公式サイト](https://www.mamp.info/en/)を見た限り、
ソフトをインストールするだけで仮想環境作って動かせるので
すぐ始めるならとてもお手軽ですね。

WordPressのローカル環境を作った際に、「Local by flywheel」で行ったので、
同じような感じで作れそうです。

## Docker
{% twitter https://twitter.com/smyz1004/status/1149850308303941633 %}
{% twitter https://twitter.com/shimohara26/status/1149828602541690880 %}
{% twitter https://twitter.com/i_namespace/status/1149852579402174465 %}
{% twitter https://twitter.com/rirazou_/status/1149857443742011392 %}

こちらはDockerをオススメしていただいた方たちのツイートです。

仮想環境は今どき必須レベルで覚えておくスキルだと思うのですが、
業務ではVagrantしか動かしたことなかったので、まだDockerは手を出せてないです。

調べた限り、VMはOSの上に別の仮想OSを載せる仮想化とは違い、
同じOSのカーネルを共有するので、別のOSを載せずに必要なファイルだけを動かすため、
VMに比べてオーバーヘッドが少ないので、比較的軽いということがわかりました。

- [参考：Docker初めての人向け説明メモ](https://qiita.com/miyasakura_/items/87ccb6d4a52d4a00a999)

## Dockerをインストールしてみる

今回はDockerに挑戦したいと思います。
僕はmac環境なので、Docker for Macをインストールしていきます。

有償と無償があるようですが、無償にて作ります。

### Docker for macをインストール
Dockerの公式サイトでアカウントを作り、DockerHubからインストールします。

- とりあえずアカウントを作成します。
  - [公式サイト](https://hub.docker.com/)

- Docker Desktop for Macで**Get Docker**をクリック
  1. [Docker Desktop for Mac](https://hub.docker.com/editions/community/docker-ce-desktop-mac)
  1. DLしたDocker.dmgを開く
  1. ApplicationsディレクトリにDocker.appをコピー
  1. コピーしたDocker.appをFinderから開く
  1. インストール
  1. 上のツールバーにDockerアイコンが追加されるので、Dockerアカウントでログインする
  1. ターミナルで`docker version`と入力してVersion情報などが返ってきたらインストール成功

## Dockerイメージを使ってみる

### ホスト側とコンテナ側を結びつける用のファイルを作成する

Dockerイメージで作られたファイルは、簡単に壊すことができ、
また、コンテナの中で作ったファイルも消えてしまいます。

現実世界のホスト側と、仮想世界のコンテナ側で
同じファイルを参照するようにしたいと思います。

まず、自分の好きなディレクトリで`index.php`を作ります。
今回は以下の通り。

```
/Users/Documents/workspace/docker-test/www/index.php

```

### Dockerイメージをpullする

```
$ docker run -p 80:80 -v /Users/Documents/workspace/docker-test/www/:/var/www/html --name yakiniku -d php:5.6-apache
```

- Mynameの部分はご自分のプロジェクト名など、適宜変えてください。
- `/Users/Documents/workspace/docker-test/www/`がホスト側のindex.phpがあるディレクトリ
- `/var/www/html`とホスト側の上記のディレクトリとをマウント（同期接続）させます

ホスト側とコンテナ側でもちろんディレクトリが違うのですが、
これでホスト側のファイルを更新すれば、コンテナ側にも更新が走ります。

`-p 80:80`コマンドで、ホスト側の80番ポートと、コンテナ側の80番ポートをつなげるというコマンドですね。

80番ポートなので、http通信なのかな。

その後、ブラウザで`localhost:80`でアクセスすると
phpの情報が記載されたページにアクセスできると思います。
出てきたら成功です。

### MySQLも取ってくる

続けて、MySQLも設定しましょう。

```
$ docker run --name mysql -e MYSQL_ROOT_PASSWORD=pass -d mysql:5.7
```

`-e`オプションを使用し、
環境変数`MYSQL_ROOT_PASSWORD`で、パスワードを`pass`と設定します。

次に、MySQLのコンテナに入ります。
```
$ docker exec -ti mysql bash
```

`-ti`でターミナルから入るオプションで、その隣の`mysql`は、
上記のMySQLイメージを作ったときの`--name`で設定した名前です。

```
$ mysql -ppass
```

これでMySQLにログインできます。


## PHPとMySQLの連携環境を作り直す準備

残念ではありますが、ここまでで作ったコンテナイメージを壊します。

今作ったphp環境ですと、最小限の構成のため、MySQLとの連携が難しいようです。
そこで、`Dockerfile`という設定ファイルを追加して連携しやすいようにします。

何度でも作り直せるのがDockerの良さですね。

**ホスト側のファイルは削除しなくて大丈夫です。**

### Dockerコンテナの削除コマンド

作ったDockerコンテナを一括で削除するコマンド

```
$ docker rm -f $(docker ps -a -q)
```

### Dockerイメージの削除コマンド

作ったDockerイメージを削除するコマンド

```
$ docker images
# imageの一覧を表示

$ docker rmi {イメージID}

$ docker images
# 削除されたか確認
```

## PHPとMySQLの連携環境を作り直す

### Dockerfileを作る

ファイルの置き場所は以下のように、/phpディレクトリを作りました。

```
/Users/Documents/workspace/docker-test/php/
```

ここにDockerfileを作ります。
Dockerfileには以下を記述してください。

```
FROM php:5.6-apache
RUN apt-get update && \
  docker-php-ext-install pdo_mysql mysqli mbstring
```

終えたらビルドし直します。

```
docker build -t php:custom /Users/Documents/workspace/docker-test/php/
```

Dockerfileを元にphp:customというイメージを作ります。
ビルド完了後、`$ docker images`で確認できます。

### MySQLイメージの設定

Docker HubのMySQLイメージのcharacter setがlatin1なようですので、
設定ファイルを追加します。

以下に`custom.cnf`を追加します。

```
/Users/Documents/workspace/docker-test/mysql/
```

custom.cnfのcharacterに、UTF-8を設定してください。

```
[mysqld]
character-set-server=utf8
```

作り終えたら、custom.cnfを読み込んでMySQLコンテナを起動させます。

```
$ docker run --name mysql -v /Users/ootsuboshunpei/Documents/workspace/yakiniku/mysql/:/etc/mysql/conf.d -e MYSQL_ROOT_PASSWORD=pass -d mysql:5.7
```

`--name`オプションでコンテナの名前を設定します。

`-v`オプションでホスト側とコンテナ側のディレクトリを結びつけています。 
結びつけたことで、作成したcustom.cnfが読み込まれます。

### PHPコンテナとMySQLコンテナを連携させる

[Dockerfileを作る](#dockerfilewozuo-ru)でビルドしたコンテナと、

[MySQLイメージの設定](#mysqlimezinoshe-ding)で作成したMySQLのコンテナを連携させます。

```
docker run -p 80:80 -v /Users/Documents/workspace/docker-test/www:/var/www/html --link mysql:mysql --name php -d php:custom
```

ターミナルのユーザ名が`root@...`に切り替わり、コンテナにログインできたら、
念のため、hostsファイルも確認し、MySQLが連携されているか確認しましょう。

```
$ cd /etc/
```

でetcディレクトリに移動し、`$ cat hosts`で`172.17.0.2	mysql ...`となっていれば大丈夫です。
IPアドレスは各個人で異なると思いますので、`--link`で指定した名前であれば問題ないです。

ちゃんと`/etc/apache2/`ディレクトリなどもあるので、
Basic認証を掛けたりするセキュリティの練習もできますね。

## ホスト側でphpMyAdminを導入する

連携の確認用のため、phpMyAdminをインストールします。
ホスト側で行う作業です。

[phpMyAdmin ダウンロードページ](https://www.phpmyadmin.net/downloads/)へアクセス

Downloadタブを開き、**phpMyAdmin 4.9.0.1**からzipファイルをダウンロードします。
今回は`phpMyAdmin-4.9.0.1-all-languages.zip`をダウンロードしました。


### 展開する
zipファイルを開き、展開されたディレクトリを、ホスト側で作成した/Users/Documents/workspace/docker-test/wwwディレクトリ内に移動させます。

  ※展開されたディレクトリ名が長いので、`phpMyAdmin`に変更しました

移動しましたら、以下の手順で設定を変更します。
- phpMyAdminディレクトリ内にある、`config.sample.inc.php`を、`config.inc.php`に変更します
- config.inc.phpをエディターで開きます
- `$cfg['Servers'][$i]['host'] = 'localhost';`を見つけます
- `localhost`を--linkオプションで設定した`mysql`に変更します

### phpMyAdminにログインする

[http://localhost/phpMyAdmin/](http://localhost/phpMyAdmin/)にアクセスします。

ログインのためのユーザ名とパスを求められますので、`ID:root`、`パスワード:pass`でログインできれば成功です。

## phpMyAdminのテスト
ターミナルから確認のためテストします。

### ターミナルからテーブルを作成する

Dockerからログアウトしている場合は、
`$ docker exec -ti mysql bash`でログインしてください。

```
$ mysql -ppass

$ CREATE DATABASE test;
$ USE test;
$ CREATE TABLE test(name VARCHAR(100));
```

[http://localhost/phpMyAdmin/server_databases.php](http://localhost/phpMyAdmin/server_databases.php)を見てみましょう。

データベースのリストに**test**がありますでしょうか。

### test.phpを作成

/Users/Documents/workspace/docker-test/wwwディレクトリに、
`test.php`を作成し、以下の記述をしてください

```
<meta charset="UTF-8">
<title>テスト</title>
<?php
$db = new PDO('mysql:host=mysql;dbname=test', 'root', 'pass');
$db->query("INSERT INTO test VALUES('テストさん')");
$st = $db->query("SELECT * FROM test");
var_dump($st->fetchAll());
```

ブラウザで、[http://localhost/test.php](http://localhost/test.php)にアクセスしてください。
表示されますでしょうか。

次に、ブラウザでphpMyAdminに移り、[testテーブル(http://localhost/phpMyAdmin/db_structure.php?db=test)](http://localhost/phpMyAdmin/db_structure.php?db=test)をチェックしてください。

テーブル名`test`をクリックすると、
`name`カラムに`テストさん`がいれば成功です。


## 環境構築完了

お疲れ様でした。

初めてDockerを触ったのですが、Qiitaを見ながら作ることができました。

一度作ってしまえばある程度わかるので、勉強がてらやれたのがよかったです。
ただまだライブラリは探ってないですし、k8sなどもまださわれてないので、
環境構築道はまだまだ続く感じです。

とりあえずPHPとMySQLとApacheを設定できたので次に進みたいと思います。
ありがとうございました。

> 参考
[Docker Hubのオフィシャルイメージを使ったLAMP環境(Apache+PHP+MySQL)構築](https://qiita.com/naga3/items/be1a062075db9339762d)
[DockerでPHP7.0×Apacheの環境を構築する（更新: 2017/6/27）](https://qiita.com/kurkuru/items/fa7401a01c4d5dd98e4a)
[今からでも遅くない! phpMyAdminインストールから使い方まで徹底解説](https://www.sejuku.net/blog/30282)
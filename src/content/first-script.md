---
title: はじめてのシェルスクリプト - AWS/S3にログファイルをアップロードする
date: 2019-07-12 21:58:41
tags: [シェルスクリプト, AWS, S3]
---

こんばんは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

僕は今、業務でリリースしたコーポレートサイトの運用を行っています。

WordPressで制作したものをAWSに乗せて管理していますが、
アクセスをチェックすること以上に、ログチェックも欠かせない仕事です。

今回ははじめてログデータをAWSのS3バケットに保存して手元のログファイルを削除するという
ごく簡単なスクリプトを作ったので、備忘として紹介します。


## AWSの構成
AWSのマーケットプレイスから、Bitnamiが配信しているWordPressテンプレートを使っています。

EC2側のWebサーバはApache、OSはUbuntuで、
社内のGitサーバにあるテーマファイルをcloneやpullをして差分を更新しています。

## aws-cliをインストールする

CLIからファイルをアップロードするので、`aws-cli`をインストールします。

環境
  - Bitnami
  - Wordpress
  - Ubuntu
  - Apache

aws-cliは、Pythonとpip3（Pythonのパッケージマネージャ）で動くので、まずUbuntuにPythonとpipがあるか確認

1. sshでEC2に入る
1. `$ python --version`
1. `$ apt search python3-pip`
1. `$ apt search python-pip`
1. 見つかったら以下のコマンドでインストールする

```
$ sudo apt install python-pip python3-pip

# 最新版にする
$ pip install --upgrade pip

# aws-cliインストール
$ pip3 install awscli --upgrade --user
  # --upgradeで最新版にアップグレードさせる
  # pip --userでOSによる差異をなくすため、ユーザディレクトリのサブディレクトリにインストールさせる

# インストールできたか確認
$ aws --version

```

バージョンアップのコマンド
`$ pip3 uninstall awscli`
※頻繁にバージョンアップが発生する模様

## スクリプトの作り方

アクセスログ、エラーログファイルがあるディレクトリは、以下にあると仮定します。

- `/opt/User/apache2/logs/access_log.gz`
- `/opt/User/apache2/logs/error_log.gz`

※ログファイルは膨らむので、.gzで圧縮されていることが通常です。


1. 任意の場所にディレクトリを作成し、スクリプトファイル（拡張子.sh）を作成します

```
$ mkdir myshells
$ cd myshells
$ touch anyshell.sh
```

2. 関数を設定し、ファイル内で実行するところまで記述します

```
#!/bin/bash

# log to S3
logs_save() {
  TYPE=$1
  LOGDIR="/opt/User/apache2/logs"
  
  cd ${LOGDIR} 

  for F in ${TYPE}_log-*.gz; do
    aws s3 cp ${LOGDIR} s3://my-example-site/logs/${TYPE}/ --exclude "*" --include $F --recursive && rm $F;
  done
}

# 関数を引数渡して実行させる
logs_save error
logs_save access
```

先頭行の`#!/bin/bash`はシェバンといいます。
- シェバンの最後はbashか、bash以外のシェルを使うことを想定するならshと書きます。

スクリプトを実行する前に、念のため`cd ${LOGDIR}`でログファイルがあるディレクトリに移動してから実行します。

for文でアクセスログ、エラーログそれぞれのファイルがある文だけ回しています。

  - log_save関数の1行目`$1`が、関数に渡す引数の個数です
  - なるべくdryにするよう、できるだけ変数にしています
  - for文で変数を格納する`F`は`file`のFで、`$F`でs3コマンドに渡しています

S3へのアップロードコマンド

`aws s3 cp ${LOGDIR} s3://my-example-site/logs/${TYPE}/ --exclude "*" --include $F --recursive && rm $F;`

手順としては、
- `cp`でApache側のログファイルがあるディレクトリから、S3側のディレクトリへ渡す
- それが成功したら`rm $F`で、for文の変数Fに入ったログファイルたちを削除します

渡しているオプション

| exclude | include | recursive |
|-|-|-| 
| 指定した条件を除外 | 指定した条件を取り込む | 再帰的に行う |

お作法的な書き方で、この3つはセットで書いていいと思います。
- 一度`--exclude "*"`で、すべてのファイルを除外
- `--include $F`で、該当ファイルを対象に指定
- `--recursive`で、対象ディレクトリの中にある分だけ行う


## シェルを実行できるようにパスを通す


このままだと実行権限がなくコマンド使えずに`command not found`が返ってくるので、
実行権限を与えます。

`chmod 755 anyshell.sh`

さらにパスを通していきます。
ちゃんとここに使いたいスクリプトがあるよ！と伝えて使えるようにします。

### 確認方法

`$ echo $PATH`

すでに認識されているパスがずらっと表示されます。

### .bashrcに直接書いて使えるようにする

.bash_profileもあれば、`source ~/.bash_profile`コマンドで.bash_profileにも認識させておいてください

```
$ vim .bashrc

PATH="$PATH:/home/bitnami/myshellscript"
export PATH
```


### コマンドでやる場合

```
$ export PATH="$PATH:/home/bitnami/myshellscript"
```

## 使いたいときはコマンドラインからファイル名を叩きます

これでどこのディレクトリにいても使用可能ですので、
ファイル名を叩くと実行されます。

```
$ anyshell.sh
```



[参考：UNIX & Linux コマンド・シェルスクリプト リファレンス](https://shellscript.sunone.me/)



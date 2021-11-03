---
title: 【Git】いわゆるベアリポジトリ
date: 2019-07-08 23:44:03
tags: [Git]
---

今回はGit初心者向けにリモートリポジトリの作り方をお伝えします。

<!-- toc -->

## おさらい
### リモートリポジトリの作り方
`git remote add origin 該当プロジェクトのパス`

### コマンドラインでリモートリポジトリの確認する
```
$ git remote -v

# origin       https://github.com/remote-v/sample.git (fetch)
# origin       https://github.com/remote-v/sample.git (push)

```

### configファイルから確認する

ローカル側の.git/configファイルを確認する

{% codeblock # .git/config%} ...
[remote "origin"]
       url = https://github.com/remote-v/sample.git  <= これ
       fetch = refs/heads/*:refs/remotes/origin/*
...
{% endcodeblock %}


## リモートリポジトリを作る時は--bareオプションをつける
会社ではリモートリポジトリをGitHubと社内のGitサーバの両方で運用しています。
社内のGitサーバにリモートリポジトリを作成する際は、`--bare`オプションをつけて作成しています。
というより、基本的には--bareをつけておくべきものですね。

### bare（ベア）リポジトリを作る
コマンドで表すと、

{% codeblock # リモートリポジトリを作る%}
$ mkdir bare_sample.git
$ cd bare_sample.git
$ git init --bare

# 必ずリポジトリ名の最後に.gitをつけてください
{% endcodeblock %}

となります。

`--bare`をつけると、このリモートリポジトリにプッシュしても、
該当のファイルは視覚的には見えません。


### なんで見れないの？

例えばGitHubにプッシュすると、手元のファイルと同じようにファイルを見ることができますが、
`--bare`オプションをつけたリモートリポジトリはワーキングディレクトリを持ちません。

ワーキングディレクトリとは、ファイルそのものがあるディレクトリ、
つまりローカル側の**gitが管理しているディレクトリ**のことです。

なので上の例で言うところの`bare_sample.git`ディレクトリの中を見ても
git関連のファイルやディレクトリがあるだけで、
プッシュしたファイルなどは見えません。

ざっくりいうと、更新・変更した差分だけを情報として保存していて、
cloneやpullする時にそれらの実ファイルが現れてきます。

### どうして空にする必要があるの？

それには[Pro Git / Gitサーバー - プロトコル](https://git-scm.com/book/ja/v2/Git%E3%82%B5%E3%83%BC%E3%83%90%E3%83%BC-%E3%83%97%E3%83%AD%E3%83%88%E3%82%B3%E3%83%AB)から引用させていただきます。

> リモートリポジトリは、一般的に ベア（bare）リポジトリ となります。これは、作業ディレクトリをもたな
い Git リポジトリのことです。 このリポジトリは共同作業の中継地点としてのみ用いられるので、
ディスク上にスナップショットをチェックアウトする必要はありません。単に Git のデータがあればそれでよいのです。
端的に言うと、ベアリポジトリとはそのプロジェクトの .git ディレクトリだけで構成されるもののことで
す。

実ファイルじゃなくてGitのデータがあればそれでよいという設計なので、
GitHubのようなサービスでなく、管理用のリポジトリであればこれで問題ありません。

実ファイルがリモートリポジトリにあって複数人で更新していくと、
ファイルに不整合が起こる場合もあるのでルールに従ったほうがよいかと思います。


[参考：ベアリポジトリとノンベアリポジトリ：理論編〜GitでWordpressのテーマを管理](https://www.nekotricolor.com/entry/theory-of-bare-and-non-bare-repository-manage-wordpress-themes-with-git)


## 普段意識しないもの
個人で開発する分には、GitHubが有能なので普段意識しないオプションなのですが、
Gitサーバにリモートリポジトリを作成する際は注意してみてくださいね。

プログラミングを学んでいくと、開発を便利にしてくれる様々なものがありますが、
それはどんな仕組みなのか、ラップされて隠れているものは何なのかを知ると
半歩進んだ感じがします。

これからも引き続き宜しくおねがいします。
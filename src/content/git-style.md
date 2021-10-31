---
title: 【Git】Git Feature Flow（的なもの）でシンプル運用する
date: 2019-07-09 22:30:06
tags: [Git]
---

## はじめに

こんばんは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。
今回もGitのお話です。

バージョン管理としてスタンダードなGitですが、
複数人で開発する際の手法が色々とあると思います。

有名なものですと、Git Flowや、GitHub Flowなどかと思いますが、
みなさんのGitフローはどういったものでしょうか？

僕は**Git Feature Flow**というものを知ってやってみたところ、
複数人開発した際のフローがわかりやすかったのでお伝えします。

<!-- toc -->

## Git Feature Flowって？

ぐるなびさんのエンジニアブログで紹介されていたフローです。


> GitFeatureFlowで使う主なブランチはこの3つです。
  - master：本番環境にリリースするブランチ
  - feature：案件ごとにmasterから切ったブランチ
  - test-env（もしくはstg-env）：テスト環境と（stg-envはステージング環境と）同期されているブランチ
  このブランチモデルの特徴は下記の通りです。
  1. 改修案件ごとにfeatureブランチをひとつ割り当て、テスト環境と同期されているブランチに対して個別に featureブランチをマージする (GitFlowは複数のfeatureブランチを含んでいるdevelopブランチをマージする)
  1. 各featureブランチは独立しているため、急なリリースの発生、リリース日変更にも対応しやすい

  引用：[GitFlowは使わない！シンプルな「GitFeatureFlow」を紹介します](https://developers.gnavi.co.jp/entry/GitFeatureFlow/koyama)

個人開発なら関係ないですが、複数人で開発する場合、
おそらくmasterブランチの扱い方が結構迷うのではないかと思います。

Git Feature Flowであれば、リリースのタイミングだけmasterブランチに触るので、
masterブランチがごちゃつかず、
整理されたブランチがマージされて管理がしやすいのが特徴のようです。


### 自分たちのプロジェクト用にアレンジ
社内のあるプロジェクトに、僕と同僚の2人で1つの成果物を作ることとなった際に、
Gitの運用に悩みましたが、Git Feature Flowを知っていた同僚の提案で導入が決まりました。

以降、会社の同僚がGitマスター（師匠）となって僕にGitについて教えてくれるようになりました。
ありがたい。

少し自分たち用にアレンジして運用することになりました。

以下、その中でもポイントとしていることを書いていきます。

### ブランチの扱い方 - コマンド

ざっくりいうと、

1. 準masterブランチ（以下、develop）を作成
1. 各人個別の開発ブランチ（以下、hoge）を作成
1. developブランチの更新差分をpullしてくる
1. developブランチにリベースしてから--no-ffオプションをつけてマージ
1. リリースのタイミングだけmasterにdevelopをマージする

という流れになります。

Gitコマンド的に書くと、キモの部分は以下のとおりです。

```
git fetch
git checkout develop
git pull
git checkout hoge
git rebase develop
git push origin hoge
git checkout develop
git merge --no-ff hoge
git push origin develop
git checkout hoge
git merge develop

```

fetchして更新があるか確認し、あればpull。
手元のdevelopブランチにマージする前に、
先にリモートのdevelopブランチをpullして、他のメンバーのコミットを取り込みます。

自分のコミットをプッシュする前に、
まずは全員の歴史を揃えてから作業を行うことで足並みを揃えます。

### git rebase

開発ブランチのhogeにチェックアウトしてdevelopにrebaseします。

rebaseはdevelopブランチを1本のきれいな歴史にするために行います。

rebaseはmergeと同じように統合されますが、
それまでの他のメンバーが行った作業を加味した状態でその上に自分のコミットを積みます。


なんとなくのイメージですが、

- 本流のブランチに横から生えて本流に合体するのがmerge
- 本流のブランチから映えるのは一緒でも、あたかも本流が積んだコミットのように振る舞うのがrebase

という感じです。

- merge(C5が最新コミット)
![merge](/img/posts/190709-git-merge.png)

- rebase(C3のコピーであるC3'が最新コミットになり、C3は消える)
![rebase](/img/posts/190709-git-rebase1.png)
[引用：git公式ドキュメント](https://git-scm.com/book/ja/v1/Git-%E3%81%AE%E3%83%96%E3%83%A9%E3%83%B3%E3%83%81%E6%A9%9F%E8%83%BD-%E3%83%AA%E3%83%99%E3%83%BC%E3%82%B9)

そうすることで本流のブランチ（ここではdevelop）が1本の歴史になります。
「rebaseはあくまでプッシュする前のコミットをきれいにするための方法である」と
公式にも書かれているので、それくらいの温度感で運用していました。

そのあと念の為hogeブランチをバックアップのためにpushしておきます。


### git merge --no-ff 
次にdevelopブランチにcheckoutして、今まで作業していたブランチをmergeします。

mergeをする際、普通に行うとmerge元とmerge先のブランチが同じ位置に並びますが、
「--no-ff」オプションをつけることで、「ここでマージしました」というコミットを作ることができます。
※no ffはNo fast-fowardの略です。

そうすることで、**本流の歴史は1本で運用しつつ、どのタイミングでmergeしたのか**が
わかりやすくなり、管理がしやすくなります。

developブランチにいながら`git merge --no-ff hoge`とすると、
ターミナル上でエディターが開き、コミットメッセージが書けます。

デフォルトでは、`Merge branch 'hoge'`となりますので、
そのままでよければ`:wq`と入力すると画面が戻り、mergeされます。

流れ的には

1. developにチェックアウト
1. git merge --no-ff hogeをして、コメント付きでmergeしたというコミットが積まれる
1. developブランチ側の歴史が1つ進む

というフローになります。


### きれいなmasterブランチでいたい
Gitフローはプロジェクトごと個々にあるかと思いますが、
自分たちが採用したフローはこのような感じでした。

今回はなるべくmasterおよびdevelopブランチをきれいにしながら運用する
ということをテーマに進めていったのですが、
見た目が綺麗な分、見通しやすくわかりやすかったです。

ただ手作業で行っていた分、僕がよくフローをミスって
コンフリクトおこしたり`git cherry-pick`でコミット積み直したりしたので
次からはCIツールを使いたいなと思いました…。
---
title: 【HTML小ネタ】フォームの入力制限をHTMLタグだけで行う
date: 2019-08-15 22:38:13
tags: [HTML, 小ネタ]
---

こんばんは、Shumpei[(@seventhseven)](https://twitter.com/seventhseven)です。

今回はHTMLのフォームについての小ネタです。


## 正規表現で入力内容を制限する

例：カタカナ・ひらがなのみに制限する
```
<label class="f_title mst" for="client_name">お名前（ひながな・カナ）</label>
<input required type="text" id="client_name" name="client_name" 
placeholder="ひらがなかカタカナで入力" value=""
pattern="[ァ-ヶー　ぁ-ゞ]*" title="全角ひらがな・カタカナで入力してください">
```

**pattern="[ァ-ヶー　ぁ-ゞ]*"**でカタカナ、ひらがな（全角スペースと全角ハイフン）が0文字以上マッチするように制限。

- ァ-ヶでカタカナ
- ぁ-ゞでひらがな
- ー　 で全角スペースと全角ハイフン

## 桁数を制限して数字のみの入力を受け付ける

例：1行のフォームで電話番号を入力させる
```
<label class="f_title mst" for="phone_no">電話番号</label>
<input required type="tel" pattern="[\d]*" 
title="半角・ハイフンなしの数字を入力してください" id="phone_no" name="phone_no"
placeholder="012033334444（半角・ハイフンなし）" value="" minlength="11" maxlength="11">
```

**pattern="[\d]*"**で[0-9]に0文字以上マッチするように制限。

電話番号は11桁なので、**minlength="11" maxlength="11"**で最小11文字・最大11文字入力できるように制限。

## 基本的な機能に学ぶ

今回機会があってフォームを作成してたのですが、HTMLタグだけでも組み合わせれば色々とできることがわかりました。

これでメールアドレスなどの入力も正規表現での制限でエラーチェックができます。

POSTしてからバックエンド側でエラー判定を出してもいいのですが、
フロント側でPOSTする前に制限したほうがユーザビリティも高いですね。

もちろんバックエンド側もバリデーションは必須だと思いますが、
知らなかったので残しておきます。
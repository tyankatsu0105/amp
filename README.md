<font color="DeepPink">定期的にメンテナンスすること。</font>

<!-- ロゴ画像をここに貼る -->

amp-boilerplateはgulp@4を用いたampサイト構築の雛形です

# Contents
- [Contents](#contents)
- [Production environment](#production-environment)
- [Development environment](#development-environment)
- [Local development environment](#local-development-environment)
  - [install](#install)
  - [command](#command)
  - [role of application](#role-of-application)
    - [gulp v4](#gulp-v4)
    - [webpack v4](#webpack-v4)
    - [prettier](#prettier)
    - [stylelint](#stylelint)
- [Rule](#rule)
  - [Git](#git)
    - [commit message](#commit-message)
      - [prefix](#prefix)
      - [scope](#scope)
      - [emoji prefix](#emoji-prefix)
      - [seven rules](#seven-rules)
  - [html,php](#html-php)
  - [php](#php)
  - [sass(scss)](#sassscss)
    - [core](#core)
    - [components](#components)
    - [layout](#layout)
    - [modules](#modules)
    - [pages](#pages)
    - [vendor](#vendor)
  - [img](#img)
    - [common](#common)
    - [favicon](#favicon)
    - [home](#home)
    - [icon](#icon)

# Production environment
<sub><sup>[back to contents](#contents)</sup></sub>



# Development environment
<sub><sup>[back to contents](#contents)</sup></sub>



# Local development environment
<sub><sup>[back to contents](#contents)</sup></sub>

- node v8.9.0
- yarn or npm
- gulp v4
- stylelint
- prettier

## install
<sub><sup>[back to contents](#contents)</sup></sub>

package.jsonに記述しているパッケージをインストールします
```
yarn
npm install
```

## command
<sub><sup>[back to contents](#contents)</sup></sub>

```
yarn start
npm start
```

## role of application
<sub><sup>[back to contents](#contents)</sup></sub>

### gulp v4
<sub><sup>[back to contents](#contents)</sup></sub>

タスクランナーです。
`gulpfile.js`の記述を元に動きます。  
設定パスを変更する時は`config.json`を編集して下さい。

### webpack v4
<sub><sup>[back to contents](#contents)</sup></sub>

バンドラーです。
`webpack.config.js`の記述を元に動きます。  
設定パスを変更する時は`config.json`を編集して下さい。

### prettier
コードの整形に使用します。  

### stylelint
<sub><sup>[back to contents](#contents)</sup></sub>

css, sass(scss)のlinterです。  
設定は`.stylelintrc.json`に記述します。  
除外ファイルの記述は`.stylelintignore`に記述します。  
設定パスを変更する時は`config.json`を編集して下さい。

<font color="DeepPink">gulp内で使用しています。  
fix機能を使用します。  
prettierと組み合わせるために、stylelint => prettierの順番で処理させます。  
prettierのルールは`gulpfile.js`に記述します。</font>

<font color="DeepPink">エディタに拡張機能が存在している場合は併用をおすすめします</font>

# Rule
<sub><sup>[back to contents](#contents)</sup></sub>

## Git
<sub><sup>[back to contents](#contents)</sup></sub>

### commit message
<sub><sup>[back to contents](#contents)</sup></sub>

これを参考にコミットコメントを記述する。
[Git のコミットメッセージの書き方 \| POSTD](https://postd.cc/how-to-write-a-git-commit-message/)

以下例

```
feat(eslint): :tada: eslintを設定

TEAM_PR-19
```

#### prefix
<sub><sup>[back to contents](#contents)</sup></sub>

以下のものから必ず使用する。増やすことはできない。

* fix: バグやタイポなどの修正
* feat: 新しい機能の追加
* refactor: リファクタリング
* style: スタイリングに関わる変更(css/sass)
* chore: 細務(ファイル整備、移動、削除、名前変更など)
* test: テストファイルに対する変更や修正
* docs: ドキュメントの加筆や修正
* breaking: 破壊的変更
* build: ビルド周りの設定(主に gulp や webpack 周り)
* ci: CI に関わる設定
* pref: パフォーマンスの改善
* revert: 削除や変更の取り消し
* other: その他

#### scope
<sub><sup>[back to contents](#contents)</sup></sub>

変更したもののカテゴリを記入する。ルールは各自設定していいが、一貫性があったほうが良いので。以下のものに良いものがなければ追加する。尚追加する際には gitmesage.txt に追記すること（他の作業者にも共有可能にするため）

#### emoji prefix
<sub><sup>[back to contents](#contents)</sup></sub>

prefix に書いたものとは別に、さらなる意味付けのために付ける。
emoji が不足した場合は自分で追加する。尚追加する際には gitmesage.txt に追記すること（他の作業者にも共有可能にするため）

#### seven rules
<sub><sup>[back to contents](#contents)</sup></sub>

1.  タイトルの後は 1 行空けて本文を書く
2.  タイトルを 50 字以内におさめる
3.  タイトルの文頭を大文字にする
4.  タイトルの文末にピリオドを付けない
5.  タイトルは命令形で記述する
6.  本文は 1 行あたり 72 字以内におさめる
7.  本文ではどのようにではなく何をとなぜを説明する

詳細は https://postd.cc/how-to-write-a-git-commit-message/

3,4,5 は、コミットメッセージは基本日本語なので無視して良い。

## html,php

* クラス名には BEM を用いる
* クラス名及び id 名にはローワーキャメルケース、アッパーキャメルケースは用いない。単語をつなげる際には「-」で繋げる

詳細は[BEM — Block Element Modifier](http://getbem.com/naming/)

```
<!-- NG -->
<nav class="globalNav">
  <ul class="globalNavList">
    <li class="globalNavListItem"></li>
  </ul>
</nav>

<!-- OK -->
<nav class="global-nav">
  <ul class="global-nav-list">
    <li class="global-nav-list__item"></li>
  </ul>
</nav>
```

## php

Doc を必ず書く

## sass(scss)
<sub><sup>[back to contents](#contents)</sup></sub>


```
cd src/scss/
tree -L 1 -I '.DS_Store|*.scss' -a | pbcopy
```

```
.
├── components
├── core
├── layout
├── modules
├── pages
└── vendor

6 directories, 0 files
```

### core
<sub><sup>[back to contents](#contents)</sup></sub>

スタイルの核となるスタイルのため、扱う際には注意が必要

### components
<sub><sup>[back to contents](#contents)</sup></sub>

* サイト内で１つの機能になりうるものは、ここにファイルを作製する
* ファイル名は必ず BEM の Block 名にする

### layout
<sub><sup>[back to contents](#contents)</sup></sub>

全体的なレイアウトスタイル定義

### modules
<sub><sup>[back to contents](#contents)</sup></sub>

「rule of three」に則り、原則３回以上繰り返し用いられるものに関してはここにファイルを作製する

### pages
<sub><sup>[back to contents](#contents)</sup></sub>

ページ種別でスタイルを定義したい際には、ページ種名をファイル名にした上でスタイルを定義する

### vendor
<sub><sup>[back to contents](#contents)</sup></sub>

プラグイン、フレームワークを用いる際に必要になるスタイルはここに格納する

## img
* 必ずgulpで圧縮して使用する
* 画像名は「_」で単語を繋ぎ、「-」で異なる単語を繋げる。詳細は[アンダースコアとハイフンで効率よいファイル・フォルダ命名方法 \| ClockMaker Blog](http://clockmaker.jp/blog/2009/06/file-rename/)以下例
```
NG
icon-e-mail-1.svg

OK
icon-e_mail-1.svg
```
```
cd src/img/
tree -L 1 -I '.DS_Store' -a | pbcopy
```

```
.
├── common
├── favicon
├── home
└── icon

4 directories, 0 files

```

### common
共通に使用する画像（logoなど）

### favicon
favicon一式を格納する
faviconは以下のサイトで生成する  
[様々なファビコンを一括生成。favicon generator](https://ao-system.net/favicongenerator/)

### home
トップページに使用する画像を格納する。これに倣い、ディレクトリ単位でフォルダを生成して画像を格納していく

### icon
サイトに使用するアイコン画像を格納する。

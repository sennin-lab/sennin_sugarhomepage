# sennin_sugar Website

## ファイル構成
- `index.html` : ホーム（元のホーム画面の構成・デザインを維持）
- `projects.html` : Projects一覧（`data/projects.json`から取得）
- `project-detail.html?id=project-01` : プロジェクト詳細
- `about.html` : About us
- `news.html` : News一覧（`data/news.json`から取得）
- `news-detail.html?id=website-open` : News詳細
- `jobs.html` : Jobs
- `contact.html` : Contact
- `assets/css/style.css` : 共通デザイン
- `assets/js/` : 共通処理・JSON読み込み処理
- `data/news.json` : お知らせデータ
- `data/projects.json` : プロジェクトデータ
- `assets/images/` : アップロードする画像

## 画像のアップロード方法
画像ファイルを `assets/images/` に置き、JSONとHTMLで指定したファイル名に合わせてください。

| ファイル名 | 使う場所 | おすすめ画像 |
|---|---|---|
| `hero-1.jpg` | ホーム背景1 | ノートPCやデスクで作業している、明るく落ち着いた横長写真 |
| `hero-2.jpg` | ホーム背景2 | スマートフォンやアプリ画面を手に持つ写真。画面内の文字は少なめ |
| `hero-3.jpg` | ホーム背景3 | デジタル機器、キーボード、テクノロジーを感じる横長写真 |
| `about.jpg` | About画像 | シンプルで自然光の入る作業デスク・ワークスペース |
| `project-feature.jpg` | ホームProjects画像 | PC画面やアプリ制作風景、Webサービスのイメージ |
| `project-01.jpg` | Project 01カード | そのプロジェクトのロゴ・画面スクリーンショット |
| `project-02.jpg` | Project 02カード | そのプロジェクトのロゴ・画面スクリーンショット |
| `project-03.jpg` | Project 03カード | そのプロジェクトのロゴ・画面スクリーンショット |

### 画像のおすすめ仕様
- JPGまたはWebP、横長16:9または3:2がおすすめ
- ヒーロー画像は幅1920px以上、その他は幅1200px程度あれば十分
- 画像容量はできれば1枚500KB〜1MB程度に圧縮
- ヒーローは中央に文字が重なるので、中央付近がごちゃごちゃしていない写真がおすすめ
- About/Projectsの画像は横長で、被写体が中央〜少し左右に寄っていても大丈夫
- 実際のアプリ画面を使う場合は、個人情報・メールアドレス・ユーザー名などを写さないようにしてください
- 画像のファイル名は必ず表の名前と一致させてください。大文字小文字も区別されるサーバーがあります

## Newsの追加・編集
`data/news.json`を編集します。配列の中に次のようなオブジェクトを追加してください。

```json
{
  "id": "release-20261120",
  "date": "2026-11-20",
  "title": "新しいお知らせのタイトル",
  "summary": "一覧に表示する短い説明文",
  "body": "詳細ページに表示する本文です。\n\n空行を入れると段落が分かれます。",
  "image": "assets/images/news-20261120.jpg",
  "published": true
}
```
- `id`は重複しない英数字・ハイフンにしてください。詳細URLは `news-detail.html?id=release-20261120` です。
- `published`を`false`にすると一覧・詳細から非表示になります。
- `image`は任意です。画像がない場合は空文字 `""` にしてください。
- JSONでは最後の項目の後ろにカンマを付けないでください。

## Projectsの追加・編集
`data/projects.json`に同じ形式で追加します。

```json
{
  "id": "my-new-project",
  "title": "プロジェクト名",
  "category": "WEB SERVICE",
  "summary": "一覧に表示する説明",
  "body": "詳細ページに表示する説明。\n\n空行で段落を分けられます。",
  "image": "assets/images/my-new-project.jpg",
  "url": "https://example.com",
  "published": true
}
```
`url`が空文字なら外部リンクは表示されません。

## 表示・動作確認
JSONを`fetch()`で読むため、`index.html`をファイルから直接開くのではなく、ローカルWebサーバーまたはホスティングサービスで開いてください。
例：VS CodeのLive Server、GitHub Pages、Render Static Siteなど。
Render Static Siteの場合はPublish Directoryをプロジェクトのルート（通常は `.`）に設定してください。

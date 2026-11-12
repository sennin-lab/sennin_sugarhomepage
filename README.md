# sennin_sugar Website

## ファイル構成
- `index.html` : ホーム
- `projects.html` : Projects一覧（`data/projects.json`から取得）
- `project-detail.html?id=project-01` : プロジェクト詳細
- `about.html` : About us（ホームの「開発理念」「開発者紹介」と同じ構成）
- `news.html` : News一覧（`data/news.json`から取得）
- `news-detail.html?id=website-open` : News詳細
- `jobs.html` : Jobs一覧（`data/jobs.json`から取得）
- `job-detail.html?id=frontend-developer` : Jobs詳細
- `contact.html` : Contact
- `assets/css/style.css` : 共通デザイン（ガラス調・アニメーション）
- `assets/js/common.js` : 共通処理（ヘッダー、メニュー、アニメーション）
- `data/news.json` : お知らせデータ
- `data/projects.json` : プロジェクトデータ
- `data/jobs.json` : 求人データ
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
- 実際のアプリ画面を使う場合は、個人情報・メールアドレス・ユーザー名などを写さないようにしてください
- 画像のファイル名は必ず表の名前と一致させてください。大文字小文字も区別されるサーバーがあります

## Newsの追加・編集
`data/news.json`の配列に次のようなオブジェクトを追加します。

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
- `id`は重複しない英数字・ハイフンにしてください。
- `published`を`false`にすると一覧・詳細から非表示になります。
- `image`は任意です。画像がない場合は空文字 `""` にしてください。

## Jobs（求人）の追加・編集
`data/jobs.json`の配列に次のようなオブジェクトを追加します。一覧と詳細ページに自動で反映されます。

```json
{
  "id": "frontend-developer",
  "title": "フロントエンドエンジニア（業務委託）",
  "employment": "業務委託",
  "location": "リモート可",
  "status": "募集中",
  "posted": "2026-11-12",
  "summary": "一覧に表示する短い説明文",
  "body": "詳細ページに表示する募集内容です。\n\n空行を入れると段落が分かれます。",
  "requirements": ["応募条件1", "応募条件2"],
  "published": true
}
```
- `status`が「募集中」の場合は黒いラベルで強調表示されます。
- `posted`の新しい順に並びます。
- `published`を`false`にすると非表示になります。
- 最後の項目の後ろにカンマは付けないでください。

## Projectsの追加・編集
`data/projects.json`に同じ形式で追加します。`url`が空文字なら外部リンクは表示されません。

## 表示・動作確認
JSONを`fetch()`で読むため、`index.html`をファイルから直接開くのではなく、ローカルWebサーバーまたはホスティングサービスで開いてください。
例：VS CodeのLive Server、GitHub Pages、Render Static Siteなど。

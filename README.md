# KIMI K2.6 と Qwen3.6 の衝撃 — ひとつの所感

スマホ完全特化の長文読み物系ウェブサイト。2026年4月20日、北京 Moonshot と 杭州 Alibaba が同日リリースした KIMI K2.6 / Qwen3.6-Max-Preview を巡る、ひとつのエッセイと長い考察、9つの予測、3つの未来シナリオをモダンな UI で読ませる。

## 🎯 プロジェクトの目的

原文の TXT 記事(約42KB、10,000文字超)を、スマートフォンで最も快適に読める形に組み直す。ただ流し込むのではなく、長文エッセイとして集中して読める「読み物」としての立てつけと、数字・予測・シナリオを俯瞰できる「ダッシュボード」としての立てつけを、両立させる。

## ✅ 実装済みの機能

### ページ構成(全 8 ページ)
- **index.html** — トップ / 目次 / ハイライト / 主要数字
- **part1.html** — 第1章: 同時リリースの所感(エッセイ全文)
- **part2.html** — 第2章: 中国AIの今後 — ひとつの長い考察(数字・ハードウェア)
- **predictions.html** — 9つの予測(2026-2027)
- **scenarios.html** — 3つの未来シナリオ(確率付き・Chart.js)
- **data.html** — 数字で見るAI 2026(Chart.js ダッシュボード)
- **timeline.html** — 加速のリズム年表 2024 → 2028
- **models.html** — モデル & ハードウェア詳細(K2.6 / Qwen3.6 / DeepSeek V4 / Ascend 等)
- **glossary.html** — 用語集(40+ 項目、カテゴリ分類)

### スマホ特化デザイン
- `max-width: 540px` のコンテナで常に最適な読書幅
- **固定型 Bottom Navigation**(ガラスモーフィズム)で親指リーチ最適化
- **Sticky App Bar** + 共有ボタン(Web Share API / Clipboard fallback)
- セーフエリア対応 `viewport-fit=cover`
- ダークモード基調(AI らしい夜の雰囲気)+ 朱色(中国)× 青紫(AI)のアクセント
- Noto Serif JP を本文、Noto Sans JP を UI、JetBrains Mono を数値に使い分け
- 動作の軽量さを重視。**進捗バーは意図的に不採用**

### インタラクション
- `IntersectionObserver` によるフェードイン
- 数値カウントアップ(`data-count`)
- 棒グラフ・確率バーのアニメーション(`data-width`)
- スプラッシュ → 本体のフェード遷移
- 軽いハプティック(対応端末のみ)
- Chart.js によるチャート群(6種類): 横棒・棒・ライン・折れ線・円ドーナツ・前年比

### アクセシビリティ・性能
- `prefers-reduced-motion` 対応
- セマンティック HTML(`article`, `section`, `header`, `footer`, `nav`, `main`)
- 画像なし・外部ロードは CDN(jsDelivr)のみ
- 初期ペイント軽量(Google Fonts は preconnect)

## 🗺️ URL と導線

| Path | 役割 |
|------|------|
| `/` or `/index.html` | トップ・目次 |
| `/part1.html` | 第1章 エッセイ |
| `/part2.html` | 第2章 長い考察 |
| `/predictions.html` | 9つの予測(`#p1`〜`#p9` アンカー付き) |
| `/scenarios.html` | 3シナリオ |
| `/data.html` | 数字ダッシュボード(Chart.js) |
| `/timeline.html` | 時系列年表 |
| `/models.html` | モデル・ハードウェア |
| `/glossary.html` | 用語集 |

Bottom nav は全ページ共通で、**ホーム / 本文 / 予測 / 数字 / 年表** の5タブ。

## 📁 ファイル構成

```
index.html
part1.html
part2.html
predictions.html
scenarios.html
data.html
timeline.html
models.html
glossary.html
css/
  └── style.css       (全体スタイル / 約29KB)
js/
  └── main.js         (共通インタラクション / 約5.8KB)
source/
  └── article.txt     (原文の参照用)
README.md
```

## 🛠️ 使用技術

- **HTML5 / CSS3 / Vanilla JS**(フレームワーク不使用、軽量化)
- **Tailwind は使わず、完全カスタムCSS**(CSS 変数でデザイントークン一元管理)
- **Chart.js 4.4.1**(via jsDelivr)— `data.html` / `scenarios.html` のチャート
- **Font Awesome 6.5.1** — アイコン
- **Google Fonts**: Noto Serif JP / Noto Sans JP / JetBrains Mono
- データ API 不使用(静的ページのみ)

## 🚧 未実装・今後の拡張候補

- ダーク/ライトモード切替(現状はダーク固定)
- 多言語対応(現状は ja-JP 固定)
- 記事本文の検索機能
- ブックマーク/しおり(LocalStorage)
- 読了時間の自動計算表示
- ソーシャル OG 画像の自動生成
- `prefers-color-scheme: light` のサポート

## 🧪 動作確認

- Playwright 経由で `index.html` / `data.html` / `scenarios.html` を開き、コンソールエラー **0件** を確認済み
- iPhone SE(375px)〜iPad(768px)までの表示を想定してメディアクエリ調整済み

## 🚀 デプロイ

本サイトを公開する際は、ページ上部の **Publish タブ** からワンクリックでデプロイしてください。

---

© 2026 — KIMI K2.6 × Qwen 3.6 の衝撃 / Digital Edition

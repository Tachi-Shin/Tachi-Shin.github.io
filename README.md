# Shingo Portfolio (GitHub Pages) [https://tachi-shin.github.io/]

このリポジトリは GitHub Pages（`YOUR_NAME.github.io`）で公開するための静的サイトです。

## 公開手順

1. このフォルダの内容を `YOUR_NAME.github.io` という名前のパブリックリポジトリにプッシュします。
2. リポジトリの Settings → Pages で **Deploy from a branch** を選択し、ブランチを `main`（または `master`）に設定。
3. 数分後、 `https://YOUR_NAME.github.io` で公開されます。

## カスタマイズ

- `index.html` のOGP/JSON-LD内の `YOUR_NAME` を置換。
- `assets/css/style.css` で配色や余白を調整。
- `assets/js/main.js` の `news` 配列を更新（あるいは GitHub API から取得するように拡張）。
- `projects.html` の各リンクを自分のリポジトリに更新。

## 技術要素

- Web Components（<site-header>, <site-footer>）
- CSS Variables / Container Queries / prefers-reduced-motion
- Canvasパーティクル背景（外部ライブラリなし）
- IntersectionObserver でのフェードイン
- JSON-LD / OGP メタ
- ダーク/ライト/自動テーマ切替（ローカル保存）

## 追加の発展案

- Service Worker でのオフライン対応（PWA）
- Projects を `projects.json` など外部ファイルからフェッチ
- WebGL/Three.js による3Dデモを別ページに追加

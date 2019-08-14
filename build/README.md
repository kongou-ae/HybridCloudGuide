# はじめに

本ディレクトリには、Markdown を PDF に変換するツールが保存されています。

## 前提条件

Markdown を PDF に変換するためには、次のソフトウェアが必要です

- Docker
- Node.js

## 使い方（Windows）

```
npm install
npm run html
docker build ./build/docker/ -t vivliostyle-viewer
docker run -d -p 8080:80 --name vivliostyle-viewer vivliostyle-viewer
docker cp build "$(docker ps -q --filter "name=vivliostyle-viewer"):/usr/share/nginx/html/vivliostyle/viewer/"
http://localhost:8080//vivliostyle/viewer/vivliostyle-viewer.html#b=build/book.html&renderAllPages=true
npm run pdf
```

## 詳細

1. `npm install`を実行して、依存関係のあるパッケージをインストールします
2. `npm run html`を実行して、複数の Markdown ファイルを1つの HTML ファイル(`build/book.html`)に変換します。また`media`配下の画像ファイルを`build\media`にコピーします
3. `docker build ./build/docker/ -t vivliostyle-viewer`を実行して、PDF 変換用のコンテナイメージを作成します
4. `docker run -d -p 8080:80 --name vivliostyle-viewer vivliostyle-viewer`を実行して、PDF 変換用のコンテナを起動します
5. `docker cp build "$(docker ps -q --filter "name=vivliostyle-viewer"):/usr/share/nginx/html/vivliostyle/viewer/"`を実行して、`build`ディレクトリを PDF 変換用コンテナにコピーします
6. ブラウザで`http://localhost:8080/vivliostyle/viewer/vivliostyle-viewer.html#b=build/book.html&renderAllPages=true`にアクセスして Vivliostyle-Viewer で PDF 変換後の状態を確認します
7. `npm run pdf`を実行して、Vivliostyle-Viewer に表示されている内容を`dist/guideline.pdf`として保存します
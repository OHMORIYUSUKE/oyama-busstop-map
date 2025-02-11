# 小山市の病院マップ

小山市の病院をバス停からの徒歩圏内で探せる地図サービスです。

## 機能

### 地図表示

- 小山市内の病院とバス停の位置をマーカーで表示
- 病院とバス停を異なるアイコンで区別
- バス停からの徒歩圏内を円で表示
- 徒歩圏外の病院はグレーのマーカーで表示
- OpenStreetMap を使用した詳細な地図表示

### 病院情報

- 病院名
- 住所
- 診療科目
- 電話番号
- 診療時間
- Google での検索リンク
- バスでのルート検索リンク

### 検索機能

- 診療科目での絞り込み
- バス停からの徒歩時間（5 分/10 分）での絞り込み
- 徒歩圏内表示の切り替え

## 技術スタック

- フレームワーク: Next.js
- 地図ライブラリ: Leaflet (React Leaflet)
- UI コンポーネント: Material-UI
- 言語: TypeScript

## 開発環境のセットアップ

```bash
# リポジトリのクローン
git clone https://github.com/OHMORIYUSUKE/oyama-busstop-map.git

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

http://localhost:3000 にアクセスして開発版を確認できます。

## ライセンス

/data ディレクトリ以外は MIT ライセンスの下で公開されています。
だたし、/data 以下のデータは [小山市のオープンデータ](https://www.city.oyama.tochigi.jp/opendata.php) から取得しており、そのデータの利用については [小山市のオープンデータ利用規約](https://www.city.oyama.tochigi.jp/opendata.php?mode=kiyaku) ([CC-BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.ja))に従っています。

## コントリビューション

バグ報告や機能改善の提案は、GitHub の Issue や Pull Requests で受け付けています。

# Markdown Blog App - セットアップ手順

## 前提条件

- Node.js (v12以上)
- MongoDB
- Python 3 (フロントエンドのローカルサーバー用)

## セットアップ手順

1. リポジトリをクローンまたはダウンロードします：
   ```
   git clone [your-repo-url]
   cd markdown-blog-project
   ```

2. バックエンドのセットアップ：
   ```
   cd backend
   npm install
   ```

3. MongoDB を起動します。

4. `backend` ディレクトリで `server.js` を実行します：
   ```
   node server.js
   ```
   サーバーが起動し、"Server running on port 5001" と "Connected to MongoDB" というメッセージが表示されるはずです。

5. 新しいターミナルウィンドウを開き、フロントエンドのディレクトリに移動します：
   ```
   cd ../frontend
   ```

6. フロントエンドのローカルサーバーを起動します：
   ```
   python -m http.server 8000
   ```

7. ブラウザで `http://localhost:8000` を開きます。

import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 8888;

// ES 모듈에서 현재 디렉터리 경로를 얻는 방법
const __dirname = path.dirname(new URL(import.meta.url).pathname);

const loadData = (filePath) => {
  const rawData = fs.readFileSync(filePath, 'utf-8'); // JSON 파일을 동기식으로 읽기
  return JSON.parse(rawData); // JSON 데이터를 파싱하여 반환
};

// 캠페인 리스트
app.get('/api/campaigns', (req, res) => {
  // JSON 파일 경로 지정
  const filePath = path.join(__dirname, 'campaigns.json');
  const data = loadData(filePath);
  console.log("---- get [campaignList] sucess...")

  res.json({
    result: data
  });
})

// 로그인된 사용자 정보
app.get('/api/auth/me', (req, res) => {
  // JSON 파일 경로 지정
  const filePath = path.join(__dirname, 'loggedInUser.json');
  const data = loadData(filePath);
  console.log("---- get [LoggedIn User] sucess...")

  res.json({
    result: data
  });
})

app.listen(port, () => {
  console.log(`server is listening at localhost:${port}`);
});
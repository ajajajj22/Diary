const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3000;

// MongoDB 연결 설정
mongoose.connect('mongodb://localhost/signup_db', { useNewUrlParser: true, useUnifiedTopology: true });

// MongoDB 스키마 정의
const UserSchema = new mongoose.Schema({
  username: String,
  password: String
});

const UserModel = mongoose.model('User', UserSchema);

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 회원가입 POST 요청 처리
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;

    // 사용자 정보 저장
    const user = new UserModel({ username, password });
    await user.save();

    res.status(201).json({ message: '가입 완료' });
  } catch (error) {
    res.status(500).json({ message: '가입 실패' });
  }
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});

import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [user, setUser] = useState(null)
  const [lesson, setLesson] = useState(0)
  const [score, setScore] = useState(0)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      setUser(savedUser)
    }
  }, [])

  const handleLogin = (username) => {
    setUser(username)
    localStorage.setItem('user', username)
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
    setLesson(0)
    setScore(0)
    setFeedback('')
  }

  const lessons = [
    {
      question: 'Chọn từ đúng cho hình ảnh: 🍎',
      options: ['Apple', 'Banana', 'Orange'],
      correct: 'Apple',
      characterImg: '/character1.png',
      characterText: 'Nhân vật vui vẻ: "Hãy chọn đúng nhé!"',
      correctAudio: '/correct.mp3',
      wrongAudio: '/wrong.mp3'
    },
    {
      question: 'Chọn từ đúng cho hình ảnh: 🐶',
      options: ['Cat', 'Dog', 'Bird'],
      correct: 'Dog',
      characterImg: '/character2.png',
      characterText: 'Nhân vật: "Gâu gâu! Đúng rồi!"',
      correctAudio: '/correct.mp3',
      wrongAudio: '/wrong.mp3'
    },
    {
      question: 'Chọn từ đúng cho hình ảnh: 🚗',
      options: ['Car', 'Bike', 'Bus'],
      correct: 'Car',
      characterImg: '/character3.png',
      characterText: 'Nhân vật: "Vroom vroom! Tuyệt vời!"',
      correctAudio: '/correct.mp3',
      wrongAudio: '/wrong.mp3'
    }
  ]

  const playAudio = (src) => {
    const audio = new Audio(src)
    audio.play()
  }

  const handleAnswer = (answer) => {
    if (answer === lessons[lesson].correct) {
      setScore(score + 1)
      setFeedback('Đúng! 🎉')
      playAudio(lessons[lesson].correctAudio)
    } else {
      setFeedback('Sai rồi, thử lại! 😅')
      playAudio(lessons[lesson].wrongAudio)
    }
    setTimeout(() => {
      if (lesson < lessons.length - 1) {
        setLesson(lesson + 1)
        setFeedback('')
      } else {
        setFeedback(`Hoàn thành! Điểm: ${score + (answer === lessons[lesson].correct ? 1 : 0)}/${lessons.length}`)
      }
    }, 2000)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      <header>
        <h1>Học Tiếng Anh với Kiko</h1>
        <p>Chào mừng {user}! Học tiếng Anh vui vẻ!</p>
        <button onClick={handleLogout} className="logout-btn">Đăng xuất</button>
      </header>
      <main>
        <div className="lesson">
          <h2>Bài học {lesson + 1}</h2>
          <p>{lessons[lesson].question}</p>
          <div className="character">
            <img src={lessons[lesson].characterImg} alt="Nhân vật" className="character-img" onError={(e) => e.target.style.display = 'none'} />
            <p>{lessons[lesson].characterText}</p>
          </div>
          <div className="options">
            {lessons[lesson].options.map((option, index) => (
              <button key={index} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
          <p className="feedback">{feedback}</p>
        </div>
        <div className="score">Điểm: {score}</div>
      </main>
    </div>
  )
}

function Login({ onLogin }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username.trim()) {
      onLogin(username)
    }
  }

  return (
    <div className="login">
      <h1>Đăng nhập vào Kiko</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nhập tên của bạn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Đăng nhập</button>
      </form>
    </div>
  )
}

export default App

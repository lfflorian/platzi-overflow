import express from 'express'
import { setTimeout } from 'timers';

const app = express.Router()
const currentUser = {
    firstName: 'Sacha',
    lastName: 'Lifif',
    email: 'somom@sds.com',
    password: '123456'
}

function questionMiddleware(req, res, next) {
    const { id } = req.params
    // encuentra la pregunta por medio de esa funcion
    req.question = questions.find(({ _id }) => _id === +id )
    next()
}

function userMiddleware(req, res, next) {
    req.user = currentUser;
    next()
}

const question = {
    _id: 1,
    title: 'Como reutilizo un componente en iphone',
    description: 'sha la la la la',
    createAt: new Date(),
    icon: 'devicon-android-plain',
    answers: [],
    user: {
        firstName: 'Sacha',
        lastName: 'Lifif',
        email: 'somom@sds.com',
        password: '123456'
    }
}

const questions = new Array(10).fill(question)

// /api/questions
app.get('/', (req, res) => res.status(200).json(questions))

// GET /api/questions/:id
app.get('/:id', questionMiddleware,  (req, res) => {
    res.status(200).json(req.question)
  })

  app.post('/', userMiddleware, (req, res) => {
    const question = req.body
    question._id = +new Date()
    question.user = req.user
    question.createdAt = new Date()
    question.answers = []
    questions.push(question)
    res.status(201).json(question)
  })
//POST /api/questions
app.post('/:id/answers', questionMiddleware, userMiddleware, (req, res) => {
    const answer = req.body
    const q = req.question
    answer.createAt = new Date()
    answer.user = req.user
    q.answers.push(answer)
    res.status(201).json(answer)
})
export default app
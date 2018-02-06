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


export const  questionsMiddleware = (req, res, next) => {
    req.questions = questions
    next()
}

export const questionMiddleware = (req, res, next) => {
    const { id } = req.params
    // encuentra la pregunta por medio de esa funcion
    req.question = questions.find(({ _id }) => _id === +id )
    next()
}
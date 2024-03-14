const filePath = 'words/WordList.txt'

let gameStarted = false
let score = 0
let difficulty = 1

function startGame() {
    if (!gameStarted) {
        
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch the file")
                }
                return response.text()
            })
            .then(text => {
                const wordList = text.split('.')
                main(wordList, difficulty, score, gameStarted)
                gameStarted = true
                
            })
            .catch(error => {
                console.error('Error:', error)
            })
        
        
    }
}

function Menu() {
    const canvas = document?.querySelector("#game"),
        ctx = canvas.getContext('2d'),
        textzone = document?.querySelector("#textzone"),
        instruction = document?.querySelector('#instruction'),
        difficulte = document?.querySelector("#difficulte"),
        Score = document?.querySelector('#score')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '150px Arial'
    ctx.fillStyle = 'green'

    if (difficulty === 3) {
        ctx.fillStyle = 'red'
        instruction.style.color = 'red'
        difficulte.style.color = 'red'
        textzone.style.color = 'red'
        Score.style.color = 'red'
    }

    ctx.fillText('START', (canvas.width - ctx.measureText('START').width) / 2, canvas.height / 2)
    instruction.innerHTML = '<em>Type "Start" and Press enter to start</em>'
    difficulte.innerHTML = '<em>Type "Difficulty" and Press enter to change difficulty <br>red = hard</em>'

    textzone.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && (textzone.value === 'START ' || textzone.value === 'start' || textzone.value === 'Start' || textzone.value === 's')) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            textzone.value = ''
            instruction.innerHTML = ""
            difficulte.innerHTML = ""
            startGame()
        } else if (event.key === 'Enter' && (textzone.value === 'Difficulté' ||
                textzone.value === 'difficulty' ||
                textzone.value === 'difficulte' ||
                textzone.value === 'Difficulty' ||
                textzone.value === 'd') && (!gameStarted)) {
            textzone.value = ''
            instruction.innerHTML = ""
            difficulte.innerHTML = ""
            changeDifficulty(ctx, canvas, textzone)
        }
    })
}

function changeDifficulty(ctx, canvas, textzone) {
    const instruction2 = document?.querySelector("#instruction2")
    ctx.font = '100px Arial'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText('EASY', (canvas.width - ctx.measureText('EASY').width) / 2, 200)
    ctx.fillText('NORMAL', (canvas.width - ctx.measureText('NORMAL').width) / 2, 500)
    ctx.fillStyle = 'red'
    ctx.fillText('HARD', (canvas.width - ctx.measureText('HARD').width) / 2, 800)
    instruction2.innerHTML = "<em>Choose difficulty and press enter</em>"
    instruction2.style.color = 'white'

    textzone.addEventListener('keydown', function handleDifficultyChange(event) {
        if (event.key === 'Enter' && (textzone.value === 'EASY' ||
                textzone.value === 'easy' ||
                textzone.value === 'e')) {
            difficulty = 1
            instruction2.innerHTML = ''
            textzone.value = ''
            Menu()
            textzone.removeEventListener('keydown', handleDifficultyChange)
        } else if (event.key === 'Enter' && (textzone.value === 'NORMAL' ||
                textzone.value === 'normal' ||
                textzone.value === 'n')) {
            difficulty = 2
            instruction2.innerHTML = ''
            textzone.value = ''
            Menu()
            textzone.removeEventListener('keydown', handleDifficultyChange)
        } else if (event.key === 'Enter' && (textzone.value === 'HARD' ||
                textzone.value === 'hard' ||
                textzone.value === 'h')) {
            difficulty = 3
            instruction2.innerHTML = ''
            textzone.value = ''
            Menu()
            textzone.removeEventListener('keydown', handleDifficultyChange)
        }
    })
}

document.addEventListener('DOMContentLoaded', Menu)

let startTime = null
let stopAnimation = false
let stop = false

function resizeCanvas() {
    const canvas = document?.querySelector("#game")
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight *0.7
}

window.addEventListener("resize", () => {
    resizeCanvas()

    if(!gameStarted){ // restart everything
        Menu()
    } else {
        main(wordList, difficulty)
    }
})






function randomWord(word_list) {
    const random = Math.floor(Math.random() * (word_list.length - 1))
    const word = word_list[random]
    return word
}

function randomPosition(canvas) {
    return Math.floor(Math.random() * canvas.height)
}



function animation(canvas, ctx, word, speed, x, y,Ximage, callback) {
    const startTime = performance.now()

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillText(word, x, y)

        x += speed

        if (x < Ximage && !stopAnimation) {
            requestAnimationFrame(animate)

        } else {
            const endTime = performance.now()
            const duration = endTime - startTime
            callback(duration)

            ctx.clearRect(0,0, x, y)
        }
    }

    animate()
}

function randomXimage(canvas, difficulty){
    const randomXimage = Math.floor(Math.random() * (canvas.width/2)) + canvas.width/2 
    return randomXimage
}


function lost(ctx, canvas, score){
    ctx.font = '2.5vw Arial'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText('TOO SLOW !', (canvas.width - ctx.measureText('TOO SLOW !').width)/2
        , canvas.height/2)
    
}

async function main(word_list, difficulty) {
    const canvas = document?.querySelector("#game")
        ,ctx = canvas.getContext('2d')
        ,textzone = document?.querySelector("#textzone")
        ,pacman = document?.querySelector("#pacman")
        ,Score = document?.querySelector('#score')

    ctx.font = '2.5vw Arial'
    ctx.fillStyle = 'green'
    if(difficulty === 3){
        ctx.fillStyle = 'red'
    }
    
    while(!stop){
        stopAnimation = false
        let word = randomWord(word_list)
            ,y = randomPosition(canvas)
            ,speed = 4 * difficulty
            ,x = 0
            ,text = ''
            ,textzone_value = ''
        let Ximage = randomXimage(canvas, difficulty)
        Score.innerHTML = ''
        Score.innerHTML = 'WORDS : ' + score
        while(y - 75 < 0){
            y = randomPosition(canvas)
        }
        while(Ximage + 75 > canvas.width){
            Ximage = randomXimage(canvas)
        }

        pacman.style.top = y - 90 +'px'
        pacman.style.left = Ximage + 'px'
        
        pacman.innerHTML = '<img src="image/pacman.gif" height="150px">' 
        


        const inputInterval = setInterval(() => {
            if(textzone.value !== ''){
                textzone_value += textzone.value
                
            }
            if (textzone_value !== '') {
                text = textzone_value
                textzone_value = ''
                if(text === word){
                    stopAnimation = true
                    score++
                    clearInterval(inputInterval)
                    textzone.value = ''
                }
            }
        }, 100)


        const DurationPromise = new Promise((resolve) => {
            animation(canvas, ctx, word, speed, x, y,Ximage, (duration) => {
                resolve(duration)
            })
        })
        let time = await DurationPromise

        clearInterval(inputInterval)

        if(text === word){
            continue
        }
        else{
            break
        }
    }
    if(stop === false){
        pacman.innerHTML = ''
        lost(ctx, canvas)
        gameStarted = false
        setTimeout(() => {
            Score.innerHTML = ''
            Menu(score)
        }, 3000)
    }
}


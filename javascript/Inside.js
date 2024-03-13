let startTime = null


function randomWord(word_list) {
    const random = Math.floor(Math.random() * (word_list.length - 1))
    const word = word_list[random]
    return word
}

function randomPosition(canvas) {
    return Math.floor(Math.random() * canvas.height)
}

let stopAnimation = false
let stop = false

function animation(canvas, ctx, word, speed, x, y,randomXimage, callback) {
    const startTime = performance.now()

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillText(word, x, y)

        x += speed

        if (x < randomXimage && !stopAnimation) {
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

function randomXimage(canvas){
    const randomXimage = Math.floor(Math.random() * canvas.width/2) + canvas.width/2
    console.log(randomXimage)
    return randomXimage
}
// function shakeText(textzone) {
//     let original_value = textzone.value
//     textzone.value = '  ' + original_value
//     setTimeout(() => {
//         textzone = original_value + '  '
//     }, 1000)
//     setTimeout(() => {
//         textzone = original_value
//     }, 1000)
// }


function lost(ctx, canvas){
    ctx.font = '150px Arial'
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillText('TOO SLOW !', (canvas.width - ctx.measureText('TOO SLOW !').width)/2
        , canvas.height/2)
    
}



async function main(word_list) {
    const canvas = document?.querySelector("#game")
        ,ctx = canvas.getContext('2d')
        ,textzone = document?.querySelector("#textzone")
        ,pacman = document?.querySelector("#pacman")

    ctx.font = '40px Arial'
    ctx.fillStyle = 'green'
    let difficulty = 0

    while(!stop){
        stopAnimation = false
        let word = randomWord(word_list)
            ,y = randomPosition(canvas)
            ,speed = 5
            ,x = 0
            ,text = ''
            ,textzone_value = ''
        let Ximage = randomXimage(canvas)
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
        time = time/1000

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
        setTimeout(() => {Menu()}, 5000)
    }
}


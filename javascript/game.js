const filePath = 'words/WordList.txt'

function startgame(){
    fetch(filePath)
        .then(Response => {
            if(!Response.ok){
                throw new Error("failed to fetch the file")
            }
            return Response.text()
        })
        .then(text => {
            const word_list =  text.split('.')
            main(word_list)
        })
        .catch(error => {
            console.error('Error:', error)
        })
}

function Menu(){
    const canvas = document?.querySelector("#game"),
        ctx = canvas.getContext('2d'),
        textzone = document?.querySelector("#textzone"),
        instruction = document?.querySelector('#instruction')
        
    

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.font = '150px Arial'
    ctx.fillStyle = 'green'

    ctx.fillText('START', (canvas.width - ctx.measureText('START').width)/2
        , canvas.height/2)
    instruction.innerHTML = '<em>Type "Start" and Press enter to start</em>'
    textzone.addEventListener('keydown', (event) => {
        if(event.key == 'Enter' && (textzone.value == 'START ' || textzone.value == 'start' || textzone.value == 'Start')){
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            textzone.value = ''
            instruction.innerHTML = ""
            startgame()
        }
    })


}

document.addEventListener('DOMContentLoaded', Menu)

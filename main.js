

let gameboard=function (){
    let cells=[]
    let container=document.querySelector(".container")
    let board=document.createElement("div")
    let scoreBoardArray=[]
    board.setAttribute("class","board")
    let createGameBoard=function(){
        for(let i=0;i<playerArray.length;i++){
            scoreBoardArray[i]=document.createElement("div")
            scoreBoardArray[i].setAttribute("class","scoreBoard")
            scoreBoardArray[i].textContent=playerArray[i].name+" :"
        }
        container.appendChild(scoreBoardArray[0])
        container.appendChild(board)
        container.appendChild(scoreBoardArray[1])
        for(let i=0;i<3;i++){
            cells[i]=[]
            for(let j=0;j<3;j++){
                cells[i][j]=document.createElement("div")
                cells[i][j].setAttribute("class","cell")
                cells[i][j].setAttribute("row",i)
                cells[i][j].setAttribute("column",j)
                board.appendChild(cells[i][j])
            }
        }
    }
    let reset=function(){
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                gameboard1.cells[i][j].textContent=""
            }
        }
    }
    let updateScore=function(){
        for(let i=0;i<playerArray.length;i++){
            if(playerArray[i].score==3){
                for(let j=0;j<2;j++){
                    playerArray[j].score=0
                    if(j==i){
                        startMenu.banner.textContent=playerArray[i].name+" WINS!!!"
                        startMenu.menu.setAttribute("class","menu")
                    }
                }
            }
            scoreBoardArray[i].textContent=playerArray[i].name+" :"+playerArray[i].score
        }
    }
    return {createGameBoard,cells,board,updateScore,reset}
}


let player=function(name,symbol){
    let score=0
    return {name,symbol,score}
}

let gameplay=((function(){
    play=function(currentPlayer,gameboard){
        let cells=gameboard.cells
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++){
                gameboard.cells[i][j].addEventListener("click",function(e){
                    if(e.target.textContent==""){
                        e.target.textContent=currentPlayer.symbol
                        let row=e.target.getAttribute("row")
                        let column=e.target.getAttribute("column")
                        let winFlag=0
                        let tieFlag=1
                        let k
                        let l
                        for(let k=0;k<3;k++){
                            if(cells[row][k].textContent!=currentPlayer.symbol){
                                winFlag=0
                                break;
                            }
                            winFlag=1
                        }
                        if(winFlag==1){
                            currentPlayer.score+=1
                            gameboard1.reset()
                            gameboard1.updateScore()
                            currentPlayer=playerArray[0]
                            return
                        }
                        for(let k=0;k<3;k++){
                            if(cells[k][column].textContent!=currentPlayer.symbol){
                                winFlag=0
                                break
                            }
                            winFlag=1
                        }
                        if(winFlag==1){
                            currentPlayer.score+=1
                            gameboard1.reset()
                            gameboard1.updateScore()
                            currentPlayer=playerArray[0]
                            return
                        }
                        k=parseInt(row)
                        l=parseInt(column)
                        let counter=0
                        while(k>-1 && l>-1){
                            if(cells[k][l].textContent!=currentPlayer.symbol){
                                winFlag=0
                                break
                            }
                            winFlag=1
                            counter+=1
                            k-=1
                            l-=1
                        }
                        k=parseInt(row)
                        l=parseInt(column)
                        while(k<3 && l<3){
                            if(cells[k][l].textContent!=currentPlayer.symbol){
                                winFlag=0
                                break
                            }
                            winFlag=1
                            counter+=1
                            k+=1
                            l+=1
                        }
                        if(winFlag==1 && counter==4){
                            currentPlayer.score+=1
                            gameboard1.reset()
                            gameboard1.updateScore()
                            currentPlayer=playerArray[0]
                            return
                        }
                        k=parseInt(row)
                        l=parseInt(column)
                        counter=0
                        while(k>-1 && l<3){
                            if(cells[k][l].textContent!=currentPlayer.symbol){
                                winFlag=0
                                break
                            }
                            winFlag=1
                            counter+=1
                            k-=1
                            l+=1
                        }
                        k=parseInt(row)
                        l=parseInt(column)
                        while(k<3 && l>-1){
                            if(cells[k][l].textContent!=currentPlayer.symbol){
                                winFlag=0
                                break
                            }
                            winFlag=1
                            counter+=1
                            k+=1
                            l-=1
                        }
                        if(winFlag==1 && counter==4){
                            currentPlayer.score+=1
                            gameboard1.reset()
                            gameboard1.updateScore()
                            currentPlayer=playerArray[0]
                            return
                        }
                        for(let k=0;k<3;k++){
                            for(let l=0;l<3;l++){
                                if(cells[k][l].textContent==""){
                                    tieFlag=0
                                    k=4
                                    break
                                }
                            }
                        }
                        if(tieFlag==1){
                            gameboard1.reset()
                            currentPlayer=playerArray[0]
                            return
                        }
                        currentPlayer=playerArray[(playerArray.indexOf(currentPlayer)+1)%2]
                        if(currentPlayer.name=="AI"){
                            let randomCell=cells[parseInt(Math.random()*3)][parseInt(Math.random()*3)]
                            while(randomCell.textContent!=""){
                                randomCell=cells[parseInt(Math.random()*3)][parseInt(Math.random()*3)]
                            }
                            randomCell.click()
                        }
                    }
                })
            }
        }
    }
    return {play}
})())

let startMenu=(function(){
    let banner=document.createElement("div")
    let container=document.querySelector(".container")
    let menu=document.createElement("div")
    let startButton=document.createElement("div")
    let name=document.createElement("div")
    let nameInput=document.createElement("input")
    banner.setAttribute("class","banner")
    menu.appendChild(banner)
    let createStartMenu=function(){
        nameInput.setAttribute("type","text")
        name.textContent="Name :"
        startButton.textContent="START"
        menu.setAttribute("class","startMenu")
        menu.setAttribute("class","menu")
        startButton.setAttribute("class","startButton")
        nameInput.setAttribute("class","nameInput")
        name.setAttribute("class","nameLabel")
        container.appendChild(menu)
        menu.appendChild(name)
        menu.appendChild(nameInput)
        menu.appendChild(startButton)
    }
    
    startButton.addEventListener("click",function(){
        menu.setAttribute("class","menu invisible")
        if(nameInput.value!=""){
            playerArray[0].name=nameInput.value
        }
        gameboard1.updateScore()
    })
    return{createStartMenu,menu,banner}
})()

startMenu.createStartMenu()
let playerArray=[player("player1","O"),player("AI","X")]
let gameboard1=gameboard()
let restartButton=document.createElement("div")
let container=document.querySelector(".container")
restartButton.textContent="RESTART"
restartButton.setAttribute("class","restartButton")
gameboard1.createGameBoard()
container.appendChild(restartButton)
restartButton.addEventListener("click",function(){
    for(let i=0;i<2;i++){
        playerArray[i].score=0
    }
    gameboard1.updateScore()
    gameboard1.reset()
})
gameplay.play(playerArray[0],gameboard1)
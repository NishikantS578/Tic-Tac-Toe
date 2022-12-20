

let gameboard=function (){
    let cells=[]
    let container=document.querySelector(".container")
    let board=document.createElement("div")
    board.setAttribute("class","board")
    container.appendChild(board)
    let createGameBoard=function(){
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
    return {createGameBoard,cells,board}
}


let player=function(name,symbol){
    return {name,symbol}
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
                            gameboard.board.textContent=currentPlayer.name+" WINS!!!"
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
                            gameboard.board.textContent=currentPlayer.name+" WINS!!!"
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
                            gameboard.board.textContent=currentPlayer.name+" WINS!!!"
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
                            gameboard.board.textContent=currentPlayer.name+" WINS!!!"
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
                            gameboard.board.textContent="Tie..."
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

let playerArray=[player("player1","O"),player("AI","X")]
let gameboard1=gameboard()
let resetButton=document.createElement("div")
resetButton.textContent="RESET"
resetButton.setAttribute("class","resetButton")
let container=document.querySelector(".container")
gameboard1.createGameBoard()
container.appendChild(resetButton)
resetButton.addEventListener("click",function(){
    for(let i=0;i<3;i++){
        for(let j=0;j<3;j++){
            gameboard1.cells[i][j].textContent=""
        }
    }
})
gameplay.play(playerArray[0],gameboard1)
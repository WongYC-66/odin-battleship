let beingDrag = undefined
let beingDragOver = undefined
let dropResult = undefined

function initialise(game) {
    /* 
        size 5 : 1 unit
        size 4 : 1 unit
        size 3 : 2 unit
        size 2 : 1 unit
    */

    let div = document.querySelector('.dragDiv')
    div.innerHTML = ''
    let img1 = createImgWithSrc('./img/size5.png', 'length5', 5, 'horizontal')
    let img2 = createImgWithSrc('./img/size4.png', 'length4', 4, 'horizontal')
    let img3 = createImgWithSrc('./img/size3.png', 'length3', 3, 'horizontal')
    let img3_2 = createImgWithSrc('./img/size3.png', 'length3', 3, 'horizontal')
    let img4 = createImgWithSrc('./img/size2.png', 'length2', 2, 'horizontal')
    div.append(img1, img2, img3, img3_2, img4)
    addImgEvent()
    addCellEvent(game)
}
function addImgEvent() {
    // img draggable
    document.querySelectorAll('.dragDiv img').forEach(el => {
        el.setAttribute('draggable', true)
        el.addEventListener('dragstart', function (e) {
            beingDrag = this
            e.dataTransfer.setData("size", this.getAttribute('length'))
            if (e.target.classList.contains('horizontal')) {
                e.dataTransfer.setData("horizontal", true)
            }
        })
        el.addEventListener('dragend', function (e) {
            if(dropResult){
                e.target.style.visibility = 'hidden'
            }
        })
        // rotate horizontal -> vertical
        el.addEventListener('dblclick', function(){
            console.log(this)
            this.classList.toggle('horizontal')
        })
    })
}

function addCellEvent(game) {
    // cell droppable
    document.querySelectorAll('.myCell.cell').forEach(el => {
        el.addEventListener('dragenter', function (e) {
            // remove shadow
            document.querySelectorAll('.myCell').forEach(cell => {
                cell.classList.remove('before-place')
            })
            // add drag shadow
            e.preventDefault()
            beingDragOver = this
            // console.log('drag enter')
            const size = Number(beingDrag.getAttribute('length'))
            const isHorizontal = beingDrag.classList.contains('horizontal')
            const rowIdx = Number(this.getAttribute('rowidx'))
            const colIdx = Number(this.getAttribute('colidx'))
            let elArr = []
            if(isHorizontal){
                for(let j = colIdx ; j < colIdx + size ; j++){
                    let el = document.querySelector(`.myCell[rowidx='${rowIdx}'][colidx='${j}']`)
                    if(el) elArr.push(el)
                }
                elArr.forEach(el => el.classList.toggle('before-place'))
            } else { // vertical
                for(let i = rowIdx ; i < rowIdx + size ; i++){
                    let el = document.querySelector(`.myCell[rowidx='${i}'][colidx='${colIdx}']`)
                    if(el) elArr.push(el)
                }
                elArr.forEach(el => el.classList.toggle('before-place'))
            }
        })
        el.addEventListener('dragleave', function(e){
            e.preventDefault()
        })
        el.addEventListener('dragover', function (e) {
            e.preventDefault() // important
        })
        el.addEventListener('drop', function (e) {
            // place event
            e.preventDefault()
            // console.log('drop trigger')
            const size = Number(e.dataTransfer.getData('size'))
            const isHorizontal = e.dataTransfer.getData('horizontal')
            const dir = isHorizontal ? 'horizontal' : 'vertical'
            const rowIdx = Number(beingDragOver.getAttribute('rowidx'))
            const colIdx = Number(beingDragOver.getAttribute('colidx'))
            dropResult = game.player1.gameboard.placeShip([colIdx, rowIdx], dir, size)
            game.render()
            game.addEvent()
            addCellEvent(game) // due do Cell re-render after each drop
        })
    })
}

function createImgWithSrc(text, className, length, className2) {
    let newNode = document.createElement('img')
    newNode.src = text
    newNode.classList.add(className, className2)
    newNode.setAttribute('length', length)
    return newNode
}


export { initialise }
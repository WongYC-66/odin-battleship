function initialise(){
    let div = document.querySelector('.dragDiv')
    let img1 = createImgWithSrc('./img/size5.png', 'length5', 5)
    let img2 = createImgWithSrc('./img/size4.png', 'length4', 4)
    let img3 = createImgWithSrc('./img/size3.png', 'length3', 3)
    let img3_2 = createImgWithSrc('./img/size3.png', 'length3', 3)
    let img4 = createImgWithSrc('./img/size2.png', 'length2', 2)
    div.append(img1, img2, img3, img3_2, img4)

    // img draggable
    document.querySelectorAll('.dragDiv img').forEach(el => {
        el.setAttribute('draggable', true)
        el.addEventListener('dragstart', function(e){
            e.dataTransfer.setData("size", this.getAttribute('length'))
        })
    })
    // cell droppable
    document.querySelectorAll('.myCell.cell').forEach(el => {
        el.addEventListener('dragover', function(e){
            e.preventDefault()
        })
        el.addEventListener('drop', function(e){
            e.preventDefault()
            const data = e.dataTransfer.getData('size')
            console.log(data)
            // continuehere
            // https://www.youtube.com/watch?v=7HUCAYMylCQ&ab_channel=CodingJourney
        })
    })

}

function createImgWithSrc(text, className, length){
    let newNode = document.createElement('img')
    newNode.src = text
    newNode.classList.add(className)
    newNode.setAttribute('length', length)
    return newNode
}


export { initialise }
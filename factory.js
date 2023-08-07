export function Ship(length = 0, hit = 0, sunk = false){
    this.length = length
    this.hitCount = hit
    this.sunk = sunk
    this.hit = () => {
        this.hitCount++
    }
    this.isSunk = () => {
        if(this.length && this.length === this.hitCount) this.sunk = true
        return this.sunk
    }
}
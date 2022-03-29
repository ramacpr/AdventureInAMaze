let maxRowCount = 5, maxColCount = 5
let stack = new Array()
let matrix = [
    [1, 1, 3, 2, 1],
    [3, 2, 2, 1, 2],
    [1, 3, 3, 1, 3],
    [1, 2, 3, 1, 2],
    [1, 1, 1, 3, 1]
]
let sumMatrix = [
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
]

console.log('Adventure in a maze')
console.log(FindPathCount())

function FindPathCount(){
    let numberOfPaths = 0
    stack.push([0,0])
    // the sum at first cell is its own value
    sumMatrix[0][0] = matrix[0][0]
    while(stack.length > 0){
        let cell = stack.pop()
        if(cell[0] == maxRowCount - 1 &&
            cell[1] == maxColCount - 1){
                numberOfPaths++;
        }
        let nextCells = GetNeighbourCell(cell[0], cell[1])
        for(let index in nextCells){
            let nextCell = nextCells[index]
            let cellSum = matrix[nextCell[0]][nextCell[1]]
            cellSum += sumMatrix[cell[0]][cell[1]]
            
            // we have reached our destination, 
            // only new sum value if and only if the 
            // value at sumMatrix[4][4] is lesser
            if(nextCell[0] == maxRowCount - 1 &&
                nextCell[1] == maxColCount - 1){
                    if(sumMatrix[nextCell[0]][nextCell[1]] < cellSum){
                        sumMatrix[nextCell[0]][nextCell[1]] = cellSum
                    }
                console.log('path sum: ' + cellSum)
            } else {
                sumMatrix[nextCell[0]][nextCell[1]] = cellSum
            }
            stack.push(nextCells[index])
        }
    }
    return [numberOfPaths, sumMatrix[maxRowCount - 1][maxColCount - 1]]
}

function IsValidIndex(row, col){
    if(row >= maxRowCount ||
        row < 0 || 
        col >= maxColCount ||
        col < 0){
        return false
    } else {
        return true
    }
}

// returns false in case of error 
// null in case of end of path 
// array of next cell row,col if path exists
function GetNeighbourCell(row, col){
    if(!IsValidIndex(row, col)){
        return false
    }

    let result = new Array()
    let cellValue = matrix[row][col]
    switch(cellValue){
        case 1: // right move only 
        if(IsValidIndex(row, col + 1)){
            result.push([row, col + 1])
        } else {
            result = null // reached the end of path
        }
        break
        case 2: // down move only 
        if(IsValidIndex(row + 1, col)){
            result.push([row + 1, col])
        } else {
            result = null // reached end of path
        }
        break 
        case 3: // right and down move
        if(IsValidIndex(row, col + 1)){
            result.push([row, col + 1])
        }
        if(IsValidIndex(row + 1, col)){
            result.push([row + 1, col])
        }
        if(result.length == 0){
            result = null // end of path reached
        }
        break
        default: // invalid data in matrix, error!
        return false
    }
    return result
}
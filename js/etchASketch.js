
function Grid (n) {
    createGridTemplateCol(n)
    const generateSquares = function(n) {
        let nSquares = n * n;
        let allSquares = '';
        while (nSquares > 0) {
            allSquares += `<div id="${nSquares}" class="square"></div>`
            nSquares--;
        }
        return allSquares;
    }
    const grid = generateSquares(n);
    return grid;
}


function createGridTemplateCol (n) {
    let className = '';
    while ( n > 0){
        className += 'auto '
        n--;
    }
    $('#grid').css({"display":"grid","grid-template-columns":className});
}
$('#grid').append(Grid(16));
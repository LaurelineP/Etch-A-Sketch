let initValue = 16;
/* Init grid creation */
function generateGrid (n) {
    /* Set value of css propriety grid-template-columns */
    function settupCSS (n) {
        var nCol = n;
        let classValue = '';
        while ( nCol > 0){
            classValue += '30px '
            nCol--;
        }
        $('#grid').css({"display":"grid","grid-template-columns":classValue});
    }

    /* Generate squares */
    function generateSquares (n) {
        let nSquares = n * n;
        let allSquares = '';
        while (nSquares > 0) {
            allSquares += `<div id="${nSquares}" class="square"></div>`
            nSquares--;
        }
        settupCSS(n)
        return allSquares;
    }
    $('#grid-size-input').attr('placeholder',`${n} (x ${n})`);
    return generateSquares( n )
}


/* Check the input's value for digits and not alphabetical caracters */
function check () {
    let inputValue = $('#grid-size-input')[0].value;
    let regexp = /^\d{1,}$/;
    if(inputValue && !inputValue.match(regexp)){
        $('#errorMessage').addClass('visible');
        return false;
    } else {
        $('#errorMessage').removeClass('visible');
        return true;
    }
}


/* Submitting the input or Make on action on Add or Remove buttons */
function changeGridSize ( action ) {
    let operation = action === 'more' ? +4 : action === 'less' ? -4 : getValue();
    console.log('operation', operation)

    function getValue(){
        let value = $('#grid-size-input')[0].value;
        if(check()){
            remove()
            console.log('operation', operation)
            $('#grid').append( Grid(value) )
        }
    }
}


function remove() {
    $('.square').remove();
}

Grid = (n) => {
    console.log(' hello')
    let initCols = n ? n : initValue;
    remove()
    $('#grid').append( generateGrid(initCols) );
}

$(document).ready( () => Grid());
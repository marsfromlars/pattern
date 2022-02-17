class Result {
    constructor( expression, message, result, details, assertionType ) {
        this.result = result
        this.assertionType = assertionType
        this.expression = expression
        this.message = message
        this.details = details
    }
}

class Results {
    results = []
    add( result ) {
        this.results.push( result )
    }
}

function getResults() {
    if( !document.results ) {
        document.results = new Results()
    }
    return document.results
}

function assert( expression, message ) {
    assertTrue( expression, message )
}

function assertTrue( expression, message ) {
    assertTrueOrFalse( expression, message, true )
}

function assertFalse( expression, message ) {
    assertTrueOrFalse( expression, message, false )
}

function assertTrueOrFalse( expression, message, trueOrFalse ) {

    let result = 'OK'
    let assertionType = trueOrFalse ? 'True' : 'False'

    try {

        let evalResult = eval( expression )
        let details = ''
        if( trueOrFalse != evalResult ) {
            details = 'Expected: ' + expression + ' is ' + trueOrFalse + ' but was ' + evalResult
            result = 'Failed'
        }
        getResults().add( new Result( expression, message, result, details, assertionType ) )
    
    }
    catch( ex ) {

        getResults().add( new Result( expression, message, 'Error', '' + ex, assertionType ) )

    }

}

function assertError( expression, message ) {
    assertErrorOrNot( expression, message, true )
}

function assertNoError( expression, message ) {
    assertErrorOrNot( expression, message, false )
}

function assertErrorOrNot( expression, message, errorOrNot ) {

    let result = 'OK'
    let assertionType = errorOrNot ? 'Error' : 'NoError'
    let details = ''

    try {

        let evalResult = eval( expression )
        if( errorOrNot ) {
            details = 'Expected: error but no error occurred while evaluating ' + expression
            result = 'Failed'
        }
        getResults().add( new Result( expression, message, result, details, assertionType ) )
    
    }
    catch( ex ) {

        if( !errorOrNot ) {
            details = 'Expected: no error but error occurred while evaluating ' + expression + ', error was: ' + ex
            result = 'Failed'
        }
        getResults().add( new Result( expression, message, result, details, assertionType ) )

    }

}

function assertEquals( expected, actual, message ) {
    assertEqualsOrNot( expected, actual, message, true )
}

function assertNotEquals( expected, actual, message ) {
    assertEqualsOrNot( expected, actual, message, false )
}

function assertEqualsOrNot( expected, actual, message, equalsOrNot ) {
        
    let expression = actual + ( equalsOrNot ? ' == ' : ' != ' ) + expected
    let result = 'OK'
    let assertionType = equalsOrNot ? 'Equals' : 'NotEquals'

    try {

        let expectedResult = eval( expected )
        let actualResult = eval( actual )
        let details = ''
        let evalResult = actualResult == expectedResult
        if( evalResult != equalsOrNot ) {
            if( equalsOrNot ) {
                details = 'Expected: ' + expectedResult + ' but was ' + actualResult
            }
            else {
                details = 'Expected: ' + expectedResult + ' to be different from ' + actual
            }
            result = 'Failed'
        }
        getResults().add( new Result( expression, message, result, details, assertionType ) )
    
    }
    catch( ex ) {

        getResults().add( new Result( expression, message, 'Error', '' + ex, assertionType ) )

    }
    
}

function printResults( targetEl ) {

    targetEl = targetEl ? targetEl : document.body

    let table = document.createElement( 'table'  )
    table.setAttribute( 'border', '1' )
    targetEl.appendChild( table )

    let tr = document.createElement( 'tr' )
    table.appendChild( tr )
    let td = document.createElement( 'th' )
    td.innerHTML = 'Result'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Assertion'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Expression'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Message'
    tr.appendChild( td )
    td = document.createElement( 'th' )
    td.innerHTML = 'Details'
    tr.appendChild( td )

    getResults().results.forEach( result => {
        let tr = document.createElement( 'tr' )
        tr.setAttribute( 'class', result.result )
        table.appendChild( tr )
        let td = document.createElement( 'td' )
        td.innerHTML = result.result
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = 'assert' + result.assertionType
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.expression ? result.expression : '-'
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.message ? result.message : '-'
        tr.appendChild( td )
        td = document.createElement( 'td' )
        td.innerHTML = result.details ? result.details : '-'
        tr.appendChild( td )
    })

} 

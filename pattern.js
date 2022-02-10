/** Size element to use the full body size */
function fullbody( el ) {
  el.width = window.innerWidth
  el.height = window.innerHeight
}

function fillBackground( context, color ) {
  context.save()
  context.fillStyle = color
  context.fillRect( 0, 0, context.canvas.width, context.canvas.height )
  context.restore()  
}

function fillBackgroundGradient( context, color ) {
  context.save()
  context.fillStyle = color
  context.fillRect( 0, 0, context.canvas.width, context.canvas.height )
  context.restore()  
}

function createPattern( context, config ) {

  context.save()
  let canvas = context.canvas
  let maxX = canvas.width + config.size.w, maxY = canvas.height + config.size.h

  let position = { x: 0, y: -config.size.h }
  let points = createShape( config.shape, config.size )
  let rowOffsetIndex = 0
  while( position.y < maxY ) {
    let rowOffset = config.rowOffsets[ rowOffsetIndex ]
    position.x = rowOffset.x - config.size.w
    while( position.x < maxX ) {
      let color = getRandomColor( config )
      color = colorShift( color, position, config )
      context.fillStyle = color
      drawShape( context, points, position )
      position.x += config.size.w
    }
    position.y += rowOffset.y
    rowOffsetIndex = ( rowOffsetIndex + 1 ) % config.rowOffsets.length
  } 

  context.restore()  

}

/**
 * Shift the color in HSV space depending on its position
 * 
 * @param {*} color 
 * @param {*} position 
 * @param {*} config 
 */
function colorShift( color, position, config ) {
  let rgb = convertColor( color )
  let hsv = rgbToHsv( rgb[ 0 ], rgb[ 1 ], rgb[ 2 ] )
  if( config.colorShift ) {
    if( config.colorShift.value ) {
      let v = hsv[ 2 ]
      v = colorComponentShift3( v, position, config.colorShift.value )
      hsv = [ hsv[ 0 ], hsv[ 1 ], v ]
    }
    if( config.colorShift.saturation ) {
      let s = hsv[ 1 ]
      s = colorComponentShift3( s, position, config.colorShift.saturation )
      hsv = [ hsv[ 0 ], s, hsv[ 2 ] ]
    }
  }
  rgb = hsvToRgb( hsv[ 0 ], hsv[ 1 ], hsv[ 2 ] )
  return convertToHexColor( rgb )
//  return color
}

function colorComponentShift( component, position, shift ) {
  return Math.max( 0, component * 1 - ( Math.max( 0, position.x ) * shift.x ) * 1 - ( Math.max( 0, position.y ) * shift.y ) )
}

function colorComponentShift2( component, position, shift ) {
  return Math.max( 0, component + Math.max( 0, position.x ) * shift.x * Math.max( 0, position.y ) * shift.y )
}

function colorComponentShift3( component, position, shift ) {
  return Math.max( 0, component - Math.min( 1, Math.max( 0, position.x ) * shift.x * Math.max( 0, position.y ) * shift.y ) )
}

function createShape( shape, size ) {
  let points = []
  if( shape == 'diamond' ) {
    points.push( { x: size.w / 2, y: 0 } )
    points.push( { x: size.w, y: size.h / 2 } )
    points.push( { x: size.w / 2, y: size.h } )
    points.push( { x: 0, y: size.h / 2 } )
    points.push( { x: size.w / 2, y: 0 } )
  }
  else if( shape == 'triangle' ) {
    points.push( { x: size.w / 2, y: 0 } )
    points.push( { x: size.w, y: size.h / 2 } )
//    points.push( { x: size.w / 2, y: size.h } )
    points.push( { x: 0, y: size.h / 2 } )
    points.push( { x: size.w / 2, y: 0 } )
  }
  else if( shape == 'tree' ) {
    points.push( { x: size.w / 2, y: 0 } )
    points.push( { x: size.w * .75, y: size.h } )
    points.push( { x: size.w * .25, y: size.h } )
    points.push( { x: size.w / 2, y: 0 } )
  }
  else if( shape == 'arrow' ) {
    points.push( { x: size.w / 2, y: 0 } )
    points.push( { x: size.w, y: size.h / 2 } )
    points.push( { x: size.w / 2, y: size.h } )
    //points.push( { x: 0, y: size.h / 2 } )
    points.push( { x: size.w / 2, y: 0 } )
  }
  else {
    throw 'Unknown shape: ' + shape
  }
  return points
}

function drawShape( context, points, offset ) {
  context.beginPath();
  context.moveTo( offset.x + points[ 0 ].x, offset.y + points[ 0 ].y );
  for( i = 1; i < points.length; i++ ) {
    context.lineTo( offset.x + points[ i ].x, offset.y + points[ i ].y );
  }
  context.fill();
}

function getRandomColor( config ) {
  return config.colorTheme[ Math.floor( Math.random() * config.colorTheme.length ) ]
}

function getRandomColor2( config ) {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

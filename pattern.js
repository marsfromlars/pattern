function createPattern( context, config ) {

  context.save()
  let canvas = context.canvas
  let maxX = canvas.width + config.size.w, maxY = canvas.height + config.size.h
  let shapeObject = config.shapeObject

  let position = { x: 0, y: -config.size.h }

  let points = []
  for( let i = 0; i < shapeObject.points.length; i++ ) {
    let pointTemplate = shapeObject.points[ i ]
    let point = {
      x: pointTemplate[ 0 ] * config.size.w,
      y: pointTemplate[ 1 ] * config.size.h
    }
    points.push( point )
  }

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

function drawShape( context, points, offset ) {
  context.beginPath();
  context.moveTo( offset.x + points[ 0 ].x, offset.y + points[ 0 ].y );
  for( i = 1; i < points.length; i++ ) {
    context.lineTo( offset.x + points[ i ].x, offset.y + points[ i ].y );
  }
  context.fill();
}


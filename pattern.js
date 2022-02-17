class PatternConfig {

  lights = []

  addLight( light ) {
    this.lights.push( light )
  }

}


function createPattern( context, config ) {

  context.save()
  let canvas = context.canvas
  let maxX = canvas.width + config.size.w, maxY = canvas.height + config.size.h
  let shape = config.shape

  let dimension = { 
    x: 0, 
    y: -config.size.h, 
    w: config.size.w, 
    h: config.size.h 
  }

  let rowOffsetIndex = 0

  while( dimension.y < maxY ) {
    let rowOffset = config.rowOffsets[ rowOffsetIndex ]
    dimension.x = rowOffset.x - config.size.w
    while( dimension.x < maxX ) {
      let color = getRandomColor( config )
      color = applyLighting( color, config, dimension )
      //color = colorShift( color, dimension, config )
      //context.fillStyle = color
      drawShape( context, config.shape, dimension, color, config.filled )
      dimension.x += config.size.w
    }
    dimension.y += rowOffset.y
    rowOffsetIndex = ( rowOffsetIndex + 1 ) % config.rowOffsets.length
  } 

  context.restore()  

}

function applyLighting( color, config, dimension ) {
  for( let i = 0; i < config.lights.length; i++ ) {
    let light = config.lights[ i ]
    color = applyLight( color, light, dimension )
  }
  return color
}

function applyLight( color, light, dimension ) {
  color = light.applyLighting( color, dimension.x, dimension.y )
  return color
}

function colorComponentShift( component, dimension, shift ) {
  return Math.max( 0, component * 1 - ( Math.max( 0, dimension.x ) * shift.x ) * 1 - ( Math.max( 0, dimension.y ) * shift.y ) )
}

function colorComponentShift2( component, dimension, shift ) {
  return Math.max( 0, component + Math.max( 0, dimension.x ) * shift.x * Math.max( 0, dimension.y ) * shift.y )
}

function colorComponentShift3( component, dimension, shift ) {
  return Math.max( 0, component - Math.min( 1, Math.max( 0, dimension.x ) * shift.x * Math.max( 0, dimension.y ) * shift.y ) )
}

/*
function drawShape1( context, points, offset ) {
  context.beginPath();
  context.moveTo( offset.x + points[ 0 ][ 0 ], offset.y + points[ 0 ][ 1 ] );
  for( i = 1; i < points.length; i++ ) {
    context.lineTo( offset.x + points[ i ][ 0 ], offset.y + points[ i ][ 1 ] );
  }
  context.fill();
}
*/


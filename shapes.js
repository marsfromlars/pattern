let shapes = {
  diamond: {
    type: 'filled_path',
    points: [
      [ 0.5, 0.0 ],
      [ 1.0, 0.5 ],
      [ 0.5, 1.0 ],
      [ 0.0, 0.5 ]
    ]
  }, triangle: {
    type: 'filled_path',
    points: [
      [ 0.5, 0.0 ],
      [ 1.0, 0.5 ],
      [ 0.0, 0.5 ]
    ]
  }, tree: {
    type: 'filled_path',
    points: [
      [ 0.5, 0.0 ],
      [ 0.8, 1.0 ],
      [ 0.2, 1.0 ]
    ]
  }
  , arrow: {
    type: 'filled_path',
    points: [
      [ 0.5, 0.0 ],
      [ 1.0, 0.5 ],
      [ 0.5, 1.0 ]
    ]
  }
  , sail: {
    type: 'filled_path',
    points: [
      [ 0.5, 0.0 ],
      [ 1.0, 0.5 ],
      [ 0.0, 0.8 ]
    ]
  }
  , tiles: {
    type: 'filled_path',
    points: [
      [ 0.0, 0.0 ],
      [ 1.0, 0.1 ],
      [ 1.0, 1.0 ],
      [ 0.0, 0.9 ]
    ]
  }
}

function drawShape( context, shape, posize, color, fill ) {
  context.beginPath()
  context.moveTo( posize.x + shape.points[ 0 ][ 0 ] * posize.w, posize.y + shape.points[ 0 ][ 1 ]  * posize.h );
  for( i = 1; i < shape.points.length; i++ ) {
    context.lineTo( posize.x + shape.points[ i ][ 0 ] * posize.w, posize.y + shape.points[ i ][ 1 ] * posize.h );
  }
  context.lineTo( posize.x + shape.points[ 0 ][ 0 ] * posize.w, posize.y + shape.points[ 0 ][ 1 ] * posize.h );
  if( fill ) {
    context.fillStyle = color
    context.fill()
  }
  else {
    context.strokeStyle = color
    context.lineWidth = 2
    context.stroke()
  }
}


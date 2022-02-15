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
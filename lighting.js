// code to manipulate colors in relation to their distance from a light source

/**
 * A light source is a point, area or other object which manipulates colors/light
 * around it - usually with decreasing effect in greater distance.
 * 
 */
class LightSource {

  BULB = 'bulb' // radial light source
  TUBE = 'tube' // linear light source

  // value to be affected by light source
  HUE = 'hue' // 0.0 - 1.0
  SATURATION = 'saturation' // 0.0 - 1.0
  LIGHTNESS = 'lightness' // 0.0 - 1.0
  RED = 'red' // 0 - 255
  GREEN = 'green' // 0 - 255
  BLUE = 'blue' // 0 - 255

  // default values
  type = this.BULB
  affected = this.LIGHTNESS // which value of RGB/HLS is affected
  x = 0 
  y = 0
  x2 = 100 // second point for TUBE shaped lights
  y2 = 100 // second point for TUBE shaped lights
  size = 100 // max distance affected
  start = 1 // value at distance 0
  end = 0 // value at max distance (=size) 

  constructor( x, y, x2, y2 ) {
    this.type = x2 ? this.TUBE : this.BULB
    this.x = x
    this.y = y
    this.x2 = x2
    this.y2 = y2
  }

  /**
   * Distance of given point from light source
   * 
   */
  calculateDistance( x, y ) {
    if( this.type == this.BULB ) {
      let xdiff = Math.abs( this.x - x )
      let ydiff = Math.abs( this.y - y )
      return Math.sqrt( xdiff * xdiff + ydiff * ydiff )
    }
    else if( this.type == this.TUBE ) {
      return pointToLine( x, y, this.x, this.y, this.x2, this.y2 )
    }
  }

  /**
   * Apply the lighting to the color
   * 
   * @param {*} color Original color
   * @param {*} x X Position of object
   * @param {*} y Y Position of object
   * @returns Modified color
   * 
   */
  applyLighting( color, x, y ) {
    let distance = this.calculateDistance( x, y )
    let normalized = Math.min( 1.0, distance / this.size )
    let rgb = hexToRgb( color )
    let hsv = rgbToHsv( rgb )
    hsv[ 1 ] = this.start + ( this.end - this.start ) * normalized
    rgb = hsvToRgb( hsv )
    let hex = rgbToHex( rgb )
    return hex
  }

}

/**
 * Shortes distance between point and line
 * 
 * https://stackoverflow.com/questions/849211/shortest-distance-between-a-point-and-a-line-segment/6853926#6853926
 * 
 */
function pointToLine(x, y, x1, y1, x2, y2) {

  var A = x - x1;
  var B = y - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) {
    param = dot / len_sq;
  }
  else {
    throw 'Line has no direction: the two points are the same.'
  }

  var xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = x - xx;
  var dy = y - yy;
  return Math.sqrt(dx * dx + dy * dy);

}

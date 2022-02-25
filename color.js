// Source: https://gist.github.com/mjackson/5311256

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   Number  r       The red color value
 * @param   Number  g       The green color value
 * @param   Number  b       The blue color value
 * @return  Array           The HSL representation
 */
 function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l ];
}

/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  return [ r * 255, g * 255, b * 255 ];
}

/**
 * Converts an RGB color value to HSV. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and v in the set [0, 1].
 *
 * @param Array rgb Array of R, G and B values
 * @return  Array           The HSV representation
 */
function rgbToHsv( rgb ) {

  let r = rgb[ 0 ] / 255
  let g = rgb[ 1 ] / 255
  let b = rgb[ 2 ] / 255

  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, v = max;

  var d = max - min;
  s = max == 0 ? 0 : d / max;

  if (max == min) {
    h = 0; // achromatic
  } else {
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, v ];
}

/**
 * Converts an HSV color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * Assumes h, s, and v are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Array  hsv      Array of H, S and V values
 * @return  Array           The RGB representation
 * 
 */
function hsvToRgb( hsv ) {

  let h = hsv[ 0 ]
  let s = hsv[ 1 ]
  let v = hsv[ 2 ]

  var r, g, b;

  var i = Math.floor(h * 6);
  var f = h * 6 - i;
  var p = v * (1 - s);
  var q = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0: r = v, g = t, b = p; break;
    case 1: r = q, g = v, b = p; break;
    case 2: r = p, g = v, b = t; break;
    case 3: r = p, g = q, b = v; break;
    case 4: r = t, g = p, b = v; break;
    case 5: r = v, g = p, b = q; break;
  }

  return [ r * 255, g * 255, b * 255 ];
}

/**
 * Convert color into array of rgb values.
 * Source: https://idiallo.com/javascript/hex-to-dec-colors
 * 
 * @param {*} hexa Input color in hex format
 * @returns Array of R, G and B colors
 * 
 */
function hexToRgb(hexa){
  // let rgb = w3color( hexa )
  // return [ rgb.red, rgb.green, rgb.blue ]
  var chunks = [];
  var tmp,i;
  hexa = hexa.substr(1); // remove the pound 
  if ( hexa.length === 3){
      tmp = hexa.split("");
      for(i=0;i<3;i++){
          chunks.push(parseInt(tmp[i]+""+tmp[i],16));
      }
  }else if (hexa.length === 6){
      tmp = hexa.match(/.{2}/g);
      for(i=0;i<3;i++){
          chunks.push(parseInt(tmp[i],16));
      }
  }else {
      throw new Error("'"+hexa+"' is not a valid hex format");
  }
  return chunks;
}

/**
 * Convert array of R, G and B values to hex string
 * 
 * @param {*} rgb Array of R, G and B values
 * @returns Hex string
 * 
 */
function rgbToHex(rgb){
  /*
  let colorObject = w3color( { r: rgb[ 0 ], g: rgb[ 1 ], b: rgb[ 2 ] } )
  let hexString = colorObject.rgbToHex()
  return hexString
  */
  var i,l = rgb.length,
  hexColor = "#";
  for (i=0;i<l;i++){
      let hex = Math.floor( rgb[i] ).toString(16);
      hexColor += ( hex.length < 2 ? '0' + hex : hex )
  }
  return hexColor;
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

function adjustBrightnessPercent( color, percent ) {
  let rgb = hexToRgb( color )
  let hsv = rgbToHsv( rgb )
  hsv[ 2 ] = Math.min( 0, Math.max( 1, hsv[ 2 ] * ( percent / 100 ) ) )
  rgb = hsvToRgb( hsv )
  let hex = rgbToHex( rgb )
  return hex
}


function sum_digits(n) {
    n += '';
    for (var s=0, i=0, e=n.length; i<e; i+=1) {
        s+=parseInt(n.charAt(i),36);
    }
    return s;
}

function point_is_unreachable(x, y) {
    coordinate_sum = sum_digits(x.toString() + y.toString());
    return coordinate_sum > 25;
}


function get_pixel(pixel_data, x, y) {
  if (x < 0 || y < 0 || x >= pixel_data.width || y >= pixel_data.height) {
    return -1;
  } else {
    return pixel_data.data[y * pixel_data.width + x];
  }
}

function flood_fill(ctx, x, y, fill_color) {
  const image_data = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  const pixel_data = {
    width: image_data.width,
    height: image_data.height,
    data: new Uint32Array(image_data.data.buffer),
  };
  
  const target_color = get_pixel(pixel_data, x, y);
  
  if (target_color !== fill_color) {
  
    const pixels_to_check = [x, y];
    while (pixels_to_check.length > 0) {
      const y = pixels_to_check.pop();
      const x = pixels_to_check.pop();
      
      const current_color = get_pixel(pixel_data, x, y);
      if (current_color === target_color) {
        pixel_data.data[y * pixel_data.width + x] = fill_color;
        pixels_to_check.push(x + 1, y);
        pixels_to_check.push(x - 1, y);
        pixels_to_check.push(x, y + 1);
        pixels_to_check.push(x, y - 1);
      }
    }
    
    ctx.putImageData(image_data, 0, 0);
  }
}

$(document).ready(function(){
    var ctx = document.getElementById('grid').getContext('2d');
    ctx.fillStyle = "rgb(224,216,192)";
    
    width = 1;
    height = 1;

    for (var i = 0; i < 2000; i++) {
        for (var j = 0; j < 2000; j++) {
            if (point_is_unreachable(i*width, j*height)) {
                ctx.fillStyle = "rgb(200,0,0)";
                ctx.fillRect (i*width, j*height, width, height);
                ctx.fillStyle = "rgb(224,216,192)";
                continue;
            }
            ctx.fillRect (i*width, j*height, width, height);
        }
    }

    flood_fill(ctx, 1000, 1000, 0xFF00FFFF);

    // mark current ant's position
    ctx.fillStyle = "rgb(0,200,0)";
    ctx.fillRect (1000, 1000, 10, 10);
});
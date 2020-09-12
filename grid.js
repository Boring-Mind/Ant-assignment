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

$(document).ready(function(){
    var ctx = document.getElementById('grid').getContext('2d');
    ctx.fillStyle = "rgb(200,0,0)";
    
    padding_x = 0;
    padding_y = 0;
    width = 1;
    height = 1;

    // ctx.beginPath();
    for (var i = 0; i < 2000; i++) {
        for (var j = 0; j < 2000; j++) {
            if (point_is_unreachable(i*width, j*width)) {
                ctx.fillStyle = "rgb(0,0,200)";
                ctx.fillRect (i*width, j*width, width - padding_x, height - padding_y);
                ctx.fillStyle = "rgb(200,0,0)";
                continue;
            }
            ctx.fillRect (i*width, j*width, width - padding_x, height - padding_y);
        }
    }
    ctx.fillStyle = "rgb(0,200,0)";
    ctx.fillRect (1000, 1000, 14, 14);
    // ctx.fill();
    // ctx.closePath();
});
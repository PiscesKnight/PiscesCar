/**
 * Created by JinBao on 2017/2/16.
 */
var array = new Array();//需要改变颜色的图片数组
var imgArray = new Array();//需要绘制的图片

// document.write('<script src="json/Car.js" type="text/javascript"></script>');
// $.ajax({
//     type: 'GET',
//     url: 'json/Car.js',
//     dataType: 'json',
//     success: function (data) {
//
//         for (var i = 0; i < data.data.models.length; i++) {
//             var img = new Image();
//             img.id="image"+i;
//             imgArray[i] = img;
//
//         }
//         for (var i = 0; i < data.data.models.length; i++) {
//
//             array[i] = imgArray[i];
//
//             array[i].src = data.data.models[i].url;
//
//         }
//     }
// });

var carData = Car;
for (var i = 0; i < carData.data.models.length; i++) {
    var img = new Image();
    img.id="image"+i;
    imgArray[i] = img;

}
for (var i = 0; i < carData.data.models.length; i++) {

    array[i] = imgArray[i];

    array[i].src = carData.data.models[i].url;

}


function displayImage(n, rgb ,isRecursion) {

    var canvas;

    if(n==0){
         canvas = $('.myCanvas')[0];
    }else {
         canvas = $('.myCanvas')[n];
    }

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");

            if (n < array.length) {
                if(n==0){

                }else {
                    imgArray[n].src = array[n].src;
                    imgArray[n].onload = function () {
                        ctx.drawImage(imgArray[n], 0, 0);

                        getColorData(ctx, rgb);

                    };
                }

                if(isRecursion){
                displayImage(n + 1, rgb,isRecursion);//递归
                }

            }

    }
}


function getColorData( ctx, rgb) {

   var imageData = ctx.getImageData(0, 0, 1000, 570);

    for (var i = 0; i < imageData.data.length; i += 4) {
        imageData.data[i] = rgb.r;
        imageData.data[i + 1] = rgb.g;
        imageData.data[i + 2] = rgb.b;
    }

    putColorData(imageData, ctx)
}

function putColorData(imageData, ctx) {
    ctx.putImageData(imageData, 0, 0);
}


//RGB和十六进制的转换和RGB切割

function RGBtoHex(R, G, B) {
    return toHex(R) + toHex(G) + toHex(B)
}
function toHex(N) {
    if (N == null)
        return "00";
    N = parseInt(N);
    if (N == 0 || isNaN(N))
        return "00";
    N = Math.max(0, N);
    N = Math.min(N, 255);
    N = Math.round(N);
    return "0123456789ABCDEF".charAt((N - N % 16) / 16) + "0123456789ABCDEF".charAt(N % 16);
}

//Hex-to-RGB Conversion
// <!--
R = HexToR("#FFFFFF");
G = HexToG("#FFFFFF");
B = HexToB("#FFFFFF");

function HexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16)
}
function HexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16)
}
function HexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16)
}
function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h
}

//-->
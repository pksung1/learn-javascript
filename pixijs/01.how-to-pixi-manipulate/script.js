const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')

canvas.width = 800;
canvas.height = 450;

const image1 = new Image()
image1.src = './image1.png'

image1.addEventListener('load', function () {
    ctx.drawImage(image1, 0, 0, canvas.width, canvas.height)
    /** 
     * 이미지의 rgb 비트값들을 가져옴 450 * 800 배열
     * 4개 단위로 R,G,B,A 값이 결정되어있음
     * */
    const scannedImage = ctx.getImageData(0, 0, canvas.width, canvas.height)
    console.log(scannedImage)

    const scannedData = scannedImage.data
    /**
     * GrayScale 하기
     * gray 컬러는 rgb(50, 50, 50), rgb(112,112,112) 같은 값임
     */
    for (let i = 0; i < scannedData.length; i+= 4) {
        const total = scannedData[i] + scannedData[i + 1] + scannedData[i + 2];
        const averageColorValue = total / 3
        scannedData[i] = averageColorValue;
        scannedData[i + 1] = averageColorValue;
        scannedData[i + 2] = averageColorValue;
    }

    scannedImage.data = scannedData
    ctx.putImageData(scannedImage, 0, 0)
})




//socket connection
var sock;

let w = 700;
let h = 500;
let cell_size = 20;

function setup() {
    createCanvas(w, h);
    background(170, 170, 170);

    strokeWeight(0.5);
    stroke(8, 8, 8);
    for (let i = cell_size; i < width; i += cell_size) {
        let j = 0;
        line(i, j, i, height);
    }
    for (let i = cell_size; i < height; i += cell_size) {
        let j = 0;
        line(j, i, width, i);
    }
    // Start a socket connection to the server
    // Some day we would run this server somewhere else
    sock = io.connect('http://localhost:3000');

    sock.on('mouse',
        // receiving data
        function (data) {
            console.log("Got: " + data.x + " " + data.y);

            fill(0, 255, 0);
            square(data.x, data.y, cell_size);
        }
    );
}

function draw() {
}

function mouseClicked() {

    fill(0, 0, 255);
    let sq_x = mouseX - (mouseX % cell_size);
    let sq_y = mouseY - (mouseY % cell_size);
    square(sq_x, sq_y, cell_size);

    // send  coordinates
    sendmouse(sq_x, sq_y);

}

// sending to socket
function sendmouse(xpos, ypos) {
    // console.log("sendmouse: " + xpos + " " + ypos);

    // data object
    var data = {
        x: xpos,
        y: ypos
    };

    // send object to socket
    sock.emit('mouse', data);
}
const johnny_five = require('johnny-five');
const arduino_board = new johnny_five.Board();

arduino_board.on('ready', function () {
  // ... the board is connected, and capabilities reported
  console.log('led blinking');
  let led = new johnny_five.Led(5);
  led.blink(100);
  arduino_board.wait(5000, () => {
    led.fadeOut();
  });
});

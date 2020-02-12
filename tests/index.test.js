var tm = require('../lib/index');

const TEST_TEXT = 'A comprehensive test! A great TEST indeed, with.punctuation.and.:other stuff';

const generateInputEvent = (style) => ({ body: 'text=' + style + ' ' + TEST_TEXT });

const generateExpectedResponse = (expectedText) => ({
  statusCode: 200,
  body: expectedText
});

test("lacey", async () => {
  const expectedText = 'a CoMpReHeNsIvE tEsT! a GrEaT tEsT iNdEeD, wItH.pUnCtUaTiOn.AnD.:oThEr StUfF';
  const event = generateInputEvent('lacey');
  const output = await tm.handler(event);
  const expected = generateExpectedResponse(expectedText);
  
  expect(output).toEqual(expected);
});

test("bum", async () => {
  const expectedText = 'A  C O M P R E H E N S I V E  T E S T !  A  G R E A T  T E S T  I N D E E D ,  W I T H . P U N C T U A T I O N . A N D . : O T H E R  S T U F F';
  const event = generateInputEvent('bum');
  const output = await tm.handler(event);
  const expected = generateExpectedResponse(expectedText);
  
  expect(output).toEqual(expected);
});

test("leet", async () => {
  const expectedText = '@ (0mpr343n$1v3 73$7! @ 6r3@7 73$7 1nd33d, w174.pun(7u@710n.@nd.:0743r $7uff';
  const event = generateInputEvent('leet');
  const output = await tm.handler(event);
  const expected = generateExpectedResponse(expectedText);

  expect(output).toEqual(expected);
});

test("quickmaths", async () => {
  const expectedText = '_A COMPREHENSIVE TEST! A GREAT TEST INDEED, WITH.PUNCTUATION.AND.:OTHER STUFF_';
  const event = generateInputEvent('quickmaths');
  const output = await tm.handler(event);
  const expected = generateExpectedResponse(expectedText);

  expect(output).toEqual(expected);
});

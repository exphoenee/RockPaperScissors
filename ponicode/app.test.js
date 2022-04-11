const rewire = require("rewire");
const app = rewire("../app");
const Game = app.__get__("Game");
// @ponicode
describe("Game.startGame", () => {
  let inst;

  beforeEach(() => {
    inst = new Game();
  });

  test("0", () => {
    let result = inst.startGame();
    expect(result).toMatchSnapshot();
  });
});

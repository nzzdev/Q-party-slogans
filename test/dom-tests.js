const Lab = require("lab");
const Code = require("code");
const Hapi = require("hapi");
const lab = (exports.lab = Lab.script());
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const expect = Code.expect;
const before = lab.before;
const after = lab.after;
const it = lab.it;

const routes = require("../routes/routes.js");
require("svelte/ssr/register");
const staticTpl = require("../views/HtmlStatic.html");

let server;

before(async () => {
  try {
    server = Hapi.server({
      port: process.env.PORT || 3000,
      routes: {
        cors: true
      }
    });
    server.route(routes);
  } catch (err) {
    expect(err).to.not.exist();
  }
});

after(async () => {
  await server.stop({ timeout: 2000 });
  server = null;
});

function element(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelector(selector));
  });
}

function elementCount(markup, selector) {
  return new Promise((resolve, reject) => {
    const dom = new JSDOM(markup);
    resolve(dom.window.document.querySelectorAll(selector).length);
  });
}

lab.experiment("Q party slogans markup check with only yes position", () => {
  it("should pass if one level-1 DOM element is found, i.e. only yes section", async () => {
    const renderingData = require("../resources/fixtures/data/only-yes.json");
    var markup = staticTpl.render(renderingData);

    return elementCount(markup, "div.q-party-slogans-label--level1").then(
      value => {
        expect(value).to.be.equal(1);
      }
    );
  });

  it("should pass if two level-2 DOM elements are found, i.e. parties and organisations in yes section", async () => {
    const renderingData = require("../resources/fixtures/data/only-yes.json");
    var markup = staticTpl.render(renderingData);

    return elementCount(markup, "div.q-party-slogans-label--level2").then(
      value => {
        expect(value).to.be.at.equal(2);
      }
    );
  });

  it("should pass if no level-3 DOM elements are found", async () => {
    const renderingData = require("../resources/fixtures/data/only-yes.json");
    var markup = staticTpl.render(renderingData);

    return elementCount(markup, "div.q-party-slogans-label--level3").then(
      value => {
        expect(value).to.be.equal(0);
      }
    );
  });
});

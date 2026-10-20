const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const http = require("node:http");
const { createStaticServer } = require("./dev-server");

test("serves rebuilt assets with CORS without serving stale or unsafe paths", async () => {
  const directory = fs.mkdtempSync(
    path.join(os.tmpdir(), "madie-auth-server-")
  );
  const filename = path.join(directory, "madie-madie-auth.js");
  let ready = false;
  const server = createStaticServer(directory, () => ready);
  await new Promise((resolve) => server.listen(0, "localhost", resolve));
  const request = (url, method = "GET") =>
    new Promise((resolve, reject) => {
      const req = http.request(
        {
          hostname: "localhost",
          port: server.address().port,
          path: url,
          method,
        },
        (res) => {
          let body = "";
          res.on("data", (chunk) => (body += chunk));
          res.on("end", () =>
            resolve({ status: res.statusCode, headers: res.headers, body })
          );
        }
      );
      req.on("error", reject);
      req.end();
    });
  try {
    fs.writeFileSync(filename, "System.register([]);");
    assert.equal((await request("/madie-madie-auth.js")).status, 503);
    ready = true;
    const response = await request("/madie-madie-auth.js?version=1");
    assert.equal(response.status, 200);
    assert.equal(response.body, "System.register([]);");
    assert.equal(response.headers["access-control-allow-origin"], "*");
    assert.match(response.headers["content-type"], /javascript/);
    fs.writeFileSync(filename, "System.register(['react']);");
    assert.equal(
      (await request("/madie-madie-auth.js")).body,
      "System.register(['react']);"
    );
    assert.equal((await request("/missing.js")).status, 404);
    assert.equal((await request("/%2e%2e/package.json")).status, 403);
    assert.equal((await request("/%00")).status, 400);
    assert.equal((await request("/%ZZ")).status, 400);
    assert.equal((await request("/madie-madie-auth.js", "POST")).status, 405);
    assert.equal(
      (await request("/madie-madie-auth.js", "OPTIONS")).status,
      204
    );
    assert.equal((await request("/madie-madie-auth.js", "HEAD")).body, "");
  } finally {
    await new Promise((resolve) => server.close(resolve));
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

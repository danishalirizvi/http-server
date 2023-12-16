const http = require("http");

const PORT = 3000;
const BASE_URL = `/localhost:${PORT}`;
const server = http.createServer();

const friends = [
  { id: 0, name: `Nikola Tesla` },
  { id: 1, name: `Albert Einstien` },
  { id: 2, name: `Isaac Newton` },
];

server.on("request", (req, res) => {
  const items = req.url.split("/");
  console.log(items);
  console.log(req.method);
  if (req.method.toString() === "POST" && items[2] === "friends") {
    req.on("data", (data) => {
      const friend = data.toString();
      console.log(`Request: ${friend}`);
      friends.push(JSON.parse(friend));
    });
  } else if (req.method.toString() === "GET" && items[2] === `friends`) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (items.length === 4) {
      res.end(JSON.stringify(friends[items[3]]));
    } else {
      res.end(JSON.stringify(friends));
    }
  } else if (req.method.toString() === "GET" && items[2] === `messages`) {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<ul>");
    res.write("<li>Hello Isaac</li>");
    res.write("<li>What are your thoughts on astronomy?</li>");
    res.write("</ul>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<body>");
    res.write("<h1>404! Not found!</h1>");
    res.write("</body>");
    res.write("</html>");
    res.end();
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

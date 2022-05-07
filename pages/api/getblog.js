import * as fs from "fs";

export default async function handler(req, res) {
  fs.readFile(`blogdata/${req.query.slug}.json`, "utf-8", (err, data) => {
    if (err) {
      res.status(400).json({ error: "That blog is not found" });
    }
    res.status(200).json(JSON.parse(data));
  });
}

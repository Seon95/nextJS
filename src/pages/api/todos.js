const todos = ["gras afrijden", "moeder afrijden"];

export default function handler(req, res) {
  if (req.method === "GET") {
    res.json(todos);
  }
  if (req.method === "POST") {
    todos.push(req.body.todo);
    res.json(todos);
  }
}

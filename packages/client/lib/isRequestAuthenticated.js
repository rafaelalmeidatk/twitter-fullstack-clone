// Checks if the request's header contains the connection
// cookie
export default req =>
  req.headers.cookie
    ? !!req.headers.cookie
        .split(';')
        .map(s => s.trim())
        .find(s => s.startsWith('connect.sid='))
    : false;

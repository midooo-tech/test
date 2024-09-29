import app from './api/subscribe.js';

// This is a tiny wrapper so that Vercel can configure and run api/index.js
// however it wants and we can run it locally on a specified port.
app.listen(process.env.PORT);

const express = require('express');
const app = express();
const dbConnect = require('./db/mongodb');
const PORT = process.env.PORT || 3000;
const userRoute = require('./routes/user.route');
const postRoute = require('./routes/post.route');
const cors = require('cors');

// We can use this to allow cross-origin requests in future
app.use(cors());
// This is for all requests to author related routes
app.use('/api/user', userRoute);
// This is for all requests to post related routes
app.use('/api/post', postRoute);

app.listen(PORT, () => {
	// Connect to the database
	dbConnect();
	console.log(`Server is listening on port ${PORT}`);
});

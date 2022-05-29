# Syngenta-assignment

## How to install locally

- Clone the repository
- Create new .env file in root directory and add the following lines: (remember to install mongodb locally)

```
MONGODB_URI='mongodb://localhost:27017/test'

```

## How to test with postman with api url

- You can also use hosted url which is using MongoDB Atlas. click here to access hosted url on heroku: [API URL](https://blogging-api-syngenta.herokuapp.com/)

## Steps to use the API

1. First create a new user with the following information with endpoint:
   
   _POST_

   <code> /api/user/create </code>

Send JSON

```json
{
	"name": "Sarvesh Mishra"
}
```

Response JSON

```json
{
	"name": "Sarvesh Mishra",
	"posts": [],
	"createdAt": "2022-05-29T08:01:52.041Z",
	"updatedAt": "2022-05-29T08:01:52.041Z",
	"_id": "62932870c526c01f80da4939",
	"__v": 0
}
```

Name must be in range minimum 3 and maximum 50 character long. It will return you USER ID which can be use for further operation. This user can be used to create new post, like post etc.

2. Create a new post with the following information with endpoint:
   
   _POST_

   <code> /api/post/create?author_id=62932870c526c01f80da4939 </code>
   It take author_id as query parameter for user by which you want to create post.

Send JSON

```json
{
	"title": "Testing new post",
	"description": "hey there this is a test meassage",
	"labels": ["test"]
}
```

Response JSON

```json
{
	"title": "Testing new post",
	"description": "hey there this is a test meassage",
	"labels": ["JS"],
	"authorName": "Sarvesh Mishra",
	"authorDetail": "62932870c526c01f80da4939",
	"likes": [],
	"likesCount": 0,
	"published": false,
	"draft": true,
	"_id": "629329febbf237bae662d814",
	"createdAt": "2022-05-29T08:08:30.986Z",
	"updatedAt": "2022-05-29T08:08:30.986Z",
	"__v": 0
}
```

3. To like a post, you have to pass post id and user id. If user has already liked the post it will be dislike otherwise it will be like.
   
   _POST_

   <code>/api/post/like?user_id=62932870c526c01f80da4939&post_id=629329febbf237bae662d814 </code>

Response JSON

```json
{
	"message": "Post liked successfully",
	"post": {
		"_id": "629329febbf237bae662d814",
		"title": "Testing new post",
		"description": "hey there this is a test meassage",
		"labels": ["JS"],
		"authorName": "Sarvesh Mishra",
		"authorDetail": "62932870c526c01f80da4939",
		"likes": ["62932870c526c01f80da4939"],
		"likesCount": 1,
		"published": false,
		"draft": true,
		"createdAt": "2022-05-29T08:08:30.986Z",
		"updatedAt": "2022-05-29T08:08:30.986Z",
		"__v": 1
	}
}
```

Likes Count is incremented by 1. and user id is added to likes array.

4. Now all post by default will be in draft mode to publish you have to send post id and body in json to update post details.
   
   _PATCH_

   <code>/api/post/update?id=629329febbf237bae662d814</code>

Send JSON:

```json
{
	"published": true,
	"draft": false
}
```

Response JSON

```json
Post updated successfully.
```

This will update post published status to true. Now you can get all published post by using endpoint:

_GET_

<code>/api/post/all</code>

Response JSON

```json
[
	{
		"_id": "629329febbf237bae662d814",
		"title": "Testing new post",
		"description": "hey there this is a test meassage",
		"labels": ["JS"],
		"authorName": "Sarvesh Mishra",
		"authorDetail": {
			"_id": "62932870c526c01f80da4939",
			"name": "Sarvesh Mishra",
			"posts": ["629329febbf237bae662d814"],
			"createdAt": "2022-05-29T08:01:52.041Z",
			"updatedAt": "2022-05-29T08:01:52.041Z",
			"__v": 0
		},
		"likes": ["62932870c526c01f80da4939"],
		"likesCount": 1,
		"published": true,
		"draft": false,
		"createdAt": "2022-05-29T08:08:30.986Z",
		"updatedAt": "2022-05-29T08:08:30.986Z",
		"__v": 1
	}
]
```

5. To get post in like sorting pass _likes_ as query parameter. It will return all post in like sorting. -1 for descending order and 1 for ascending order.
   
   _GET_

   <code>/api/post/all?likes=-1</code>

6. To search blog by title or author or by both.
   
   _GET_

   <code>/api/post/search?title=Testing new post</code>
   <code>/api/post/search?author=Sarvesh Mishra</code>
   It will return matching post.

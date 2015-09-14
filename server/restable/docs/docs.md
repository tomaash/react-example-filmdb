# TOC
   - [REST API](#rest-api)
     - [Routes](#rest-api-routes)
       - [GET](#rest-api-routes-get)
         - [GET /:model](#rest-api-routes-get-get-model)
         - [GET /:model/:id](#rest-api-routes-get-get-modelid)
       - [POST](#rest-api-routes-post)
         - [POST /:model](#rest-api-routes-post-post-model)
         - [POST /:model/:id](#rest-api-routes-post-post-modelid)
       - [DELETE](#rest-api-routes-delete)
         - [DELETE /:model/:id](#rest-api-routes-delete-delete-modelid)
       - [PUT](#rest-api-routes-put)
         - [PUT /:model](#rest-api-routes-put-put-model)
         - [PUT /:model/:id](#rest-api-routes-put-put-modelid)
       - [PATCH](#rest-api-routes-patch)
         - [PATCH /:model/:id](#rest-api-routes-patch-patch-modelid)
<a name=""></a>
 
<a name="rest-api"></a>
# REST API
<a name="rest-api-routes"></a>
## Routes
<a name="rest-api-routes-get"></a>
### GET
<a name="rest-api-routes-get-get-model"></a>
#### GET /:model
should respond with JSON for all records.

```js
return request.get('/user').expect(200).expect('Content-Type', /json/).expect(users).end(done);
```

<a name="rest-api-routes-get-get-modelid"></a>
#### GET /:model/:id
should respond with JSON for the record with the specified id.

```js
return request.get('/user/2').expect(200).expect('Content-Type', /json/).expect({
  name: 'Joff',
  age: 27,
  _id: 2
}).end(done);
```

<a name="rest-api-routes-post"></a>
### POST
<a name="rest-api-routes-post-post-model"></a>
#### POST /:model
should respond with JSON for the created record.

```js
return request.post('/user').send({
  name: 'James',
  age: 40,
  _id: 4
}).expect(201).expect({
  name: 'James',
  age: 40,
  _id: 4
}).end(done);
```

<a name="rest-api-routes-post-post-modelid"></a>
#### POST /:model/:id
should respond with JSON for the updated record.

```js
return request.post('/user/2').send({
  age: 28
}).expect(200).expect({
  name: 'Joff',
  age: 28,
  _id: 2
}).end(done);
```

<a name="rest-api-routes-delete"></a>
### DELETE
<a name="rest-api-routes-delete-delete-modelid"></a>
#### DELETE /:model/:id
should respond with JSON for the destroyed record.

```js
return request.del('/user/2').expect(200).expect({
  name: 'Joff',
  age: 27,
  _id: 2
}).end(done);
```

<a name="rest-api-routes-put"></a>
### PUT
<a name="rest-api-routes-put-put-model"></a>
#### PUT /:model
should respond with JSON for the created record.

```js
return request.put('/user').send({
  name: 'John',
  age: 26,
  _id: 5
}).expect(201).expect({
  name: 'John',
  age: 26,
  _id: 5
}).end(done);
```

<a name="rest-api-routes-put-put-modelid"></a>
#### PUT /:model/:id
should return JSON for the replaced record.

```js
return request.put('/user/2').send({
  name: 'Joseph',
  age: 37
}).expect(200).expect({
  name: 'Joseph',
  age: 37,
  _id: 2
}).end(done);
```

<a name="rest-api-routes-patch"></a>
### PATCH
<a name="rest-api-routes-patch-patch-modelid"></a>
#### PATCH /:model/:id
should respond with JSON for the updated record.

```js
return request.patch('/user/2').send({
  age: 28
}).expect(200).expect({
  name: 'Joff',
  age: 28,
  _id: 2
}).end(done);
```


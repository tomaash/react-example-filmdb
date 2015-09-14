server = require './server'
model = server.model
request = require('supertest').agent server.listen()

users = [
  name: 'Fronk'
  age : 28
  _id : 1
,
  name: 'Joff'
  age : 27
  _id : 2
,
  name: 'Scoobert'
  age : 54
  _id : 3
]

describe 'REST API', ->

  describe 'Routes', ->

    beforeEach -->
      for user in users
        yield model.create user

    afterEach (done) ->
      model.remove {}, -> done()

    describe 'GET', ->

      describe 'GET /:model', ->
        it 'should respond with JSON for all records', (done) ->
          request
            .get '/users'
            .expect 200
            .expect 'Content-Type', /json/
            .expect users
            .end done

      describe 'GET /:model/:id', ->
        it 'should respond with JSON for the record with the specified id', (done) ->
          request
            .get '/users/2'
            .expect 200
            .expect 'Content-Type', /json/
            .expect
              name : 'Joff'
              age  :  27
              _id  :  2
            .end done

    describe 'POST', ->

      describe 'POST /:model', ->
        it 'should respond with JSON for the created record', (done) ->
          request
            .post '/users'
            .send
              name : 'James'
              age  :  40
              _id  :  4
            .expect 201
            .expect
              name : 'James'
              age  : 40
              _id  : 4
            .end done

      describe 'POST /:model/:id', ->
        it 'should respond with JSON for the updated record', (done) ->
          request
            .post '/users/2'
            .send
              age : 28
            .expect 200
            .expect
              name : 'Joff'
              age  : 28
              _id  : 2
            .end done


    describe 'DELETE', ->

      describe 'DELETE /:model/:id', ->
        it 'should respond with JSON for the destroyed record', (done) ->
          request
            .del '/users/2'
            .expect 200
            .expect
              name : 'Joff'
              age  : 27
              _id  : 2
            .end done

    describe 'PUT', ->

      describe 'PUT /:model', ->
        it 'should respond with JSON for the created record', (done) ->
          request
            .put '/users'
            .send
              name : 'John'
              age  : 26
              _id  : 5
            .expect 201
            .expect
              name : 'John'
              age  : 26
              _id  : 5
            .end done


      describe 'PUT /:model/:id', ->
        it 'should return JSON for the replaced record', (done) ->
          request
            .put '/users/2'
            .send
              name : 'Joseph'
              age  : 37
            .expect 200
            .expect
              name : 'Joseph'
              age  : 37
              _id  : 2
            .end done

    describe 'PATCH', ->

      describe 'PATCH /:model/:id', ->
        it 'should respond with JSON for the updated record', (done) ->
          request
            .patch '/users/2'
            .send
              age : 28
            .expect 200
            .expect
              name : 'Joff'
              age  : 28
              _id  : 2
            .end done

  after (done) ->
    model.db.close(done)

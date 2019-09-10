# Backend NodeJS Server
- If developing, ensure you set your AWS access key credentials :)

## API Documentation
All endpoints start with /api

### /api/models
Model endpoints for getting models

#### /
#####Get
Gets all of the models in the database
##### Post
Adds a new model to the databse
##### 

#### /:id

##### Get
Gets model by ID

##### Put
Edits model by ID

##### Delete
Deletes model by ID

#### /usermodels/:id
Gets models of user ID

#### /upload
##### Post
Upload new model (tar.gz) to S3 Bucket

##### Put
Edits model by ID
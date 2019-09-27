# ARCC League Backend
- If developing, ensure you set your AWS access key credentials :)

## Development Setup
- Download AWS CLI
- Download Elastic Beanstalk CLI
- Setup AWS Account Credentials (IAM User) and set as env variables as shown in `default.js` config

*Note* - You must commit before deploying to beanstalk

`npm run dev` - Run server locally
`npm run deploy` - Push lastest commit  to beanstalk
`npm run deploy full` - Commit all code as "Deploy" and deploy to eb

## API Documentation
All endpoints start with /api

### /api/models
Model endpoints for getting models

#### /
#####Get
Gets all of the models in the database
##### Post
Adds a new model to the databse

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

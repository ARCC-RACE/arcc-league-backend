# Backend NodeJS Server
- If developing, ensure you set your AWS access key credentials :)
- This is deployed on heroku via continuous deployment on master branch through heroku

URL - https://arcc-league.herokuapp.com/

Model Object: 
```
    id - Object ID
    ownerId - Owner ID
    trackName - Track model was tested on)
    modelName - Name of the model) Can be changed by User
    modelDescription - (User description) Can be changed by User
    dateUploaded - (Date the model was uploaded)
    isEvaluated - if evaluated (boolean)
    time - Speed car completed the track
    speedTested - (Speed the model was tested at (percentage))
    videoLink - (Link to video upload)
    modelLink - (Link to the file)
    modelId: dto.modelId - modelID
    invoiceNumber - Paypal Order ID
    isPaid: dto.isPaid - If users payed for it yet
```
     

## API Documentation
All endpoints start with /

### /models
Model endpoints for getting models

#### /

#####Get
Gets all of the models in the database as an array of objects

##### Post
Adds a new model to the database without the model file (just inormation)

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

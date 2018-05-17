# Step 2
Save payload to the persitent storage using serverless

1. Add dynamo db tamplate to resources in serverless template.
```
resources:
  Resources:
    TodosDynamoDbTable:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: ${opt:stage, 'development'}-HelloWorlds
```
2. Add policy variable to template
```
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:BatchGetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
```        
3. Add environment variable to template
```
  environment:
    DYNAMODB_TABLE: ${opt:stage, 'development'}-HelloWorlds
```
4. Change get to post in template
5. Create package.json
6. Update handler
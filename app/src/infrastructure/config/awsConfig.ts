import AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

const configureAWS = (): void => {
    const region = process.env.AWS_REGION || 'us-east-1';
    const endpoint = process.env.DYNAMODB_ENDPOINT;
    
    const config: AWS.ConfigurationOptions = {
        region: region,
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    };

    if (endpoint) {
        config.endpoint = endpoint;
    }

    AWS.config.update(config);
};

configureAWS();

export const getDynamoDBDocumentClient = (): AWS.DynamoDB.DocumentClient => {
    return new AWS.DynamoDB.DocumentClient();
};

export const getDynamoDBClient = (): AWS.DynamoDB => {
    return new AWS.DynamoDB();
};

export const getTableName = (): string => {
    return process.env.DYNAMODB_TABLE_NAME || 'orders';
};

export const getAWSRegion = (): string => {
    return process.env.AWS_REGION || 'us-east-1';
};
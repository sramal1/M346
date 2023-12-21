#!/bin/bash

# Cloud Projekt Arbeit
# Gruppe: Livio, Manuel, Raphael, Leotrim

# Initialiseriungs-Script

bucketName1='original-image-bucket-m346'
bucketName2='resize-image-bucket-m346'
functionName='image-resizer-lambda'
ARN=$(aws sts get-caller-identity --query "Account" --output text)

echo $ARN

# 2 Buckets werden erstellt
aws s3 rb s3://resize-image-bucket-m346 --force
aws s3 rb s3://original-image-bucket-m346 --force

aws s3 mb s3://$bucketName1
aws s3 mb s3://$bucketName2

aws s3api put-public-access-block \
--bucket $bucketName1 \
--public-access-block-configuration "BlockPublicPolicy=false"

aws s3api put-bucket-ownership-controls \
--bucket $bucketName1 \
--ownership-controls="Rules=[{ObjectOwnership=BucketOwnerPreferred}]"

cd ../image-resizer-lambda

dotnet lambda delete-function $functionName

dotnet lambda deploy-function --function-role LabRole $functionName

aws lambda add-permission --function-name $functionName --profile default \
 --statement-id AllowToBeInvoked \
 --action "lambda:InvokeFunction" \
 --principal s3.amazonaws.com \
 --source-arn "arn:aws:s3:::$bucketName1" \
 --source-account $ARN

aws s3api put-bucket-notification-configuration --bucket $bucketName1 --notification-configuration '{"LambdaFunctionConfigurations": [{"LambdaFunctionArn": "arn:aws:lambda:us-east-1:'$ARN':function:'$functionName'","Events": ["s3:ObjectCreated:Put"]}]}'

#cd ../NodeWebsite

#node app.js

#url="http://localhost:3000"

#if [[ "$OSTYPE" == "darwin"* ]]; then
#    open "$url"
#elif [[ "$OSTYPE" == "linux-gnu" ]]; then
#    xdg-open "$url"
#else
#    echo "Das Betriebssystem wird nicht unterstützt."
#fi
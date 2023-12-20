# Lambda Setup:
Wichtig: Die untenstehenden Commands sollten alle im selben ORdner ausgeführt werden, indem die Solution liegt.

dotnet lambda delete-function image-resize-lambda

dotnet lambda deploy-function --function-role LabRole image-resize-lambda

aws lambda add-permission --function-name <function-name-lambda> --action "lambda:InvokeFunction" --principal s3.amazonaws.com --source-arn arn:aws:s3:::<orginal-bucket-name> --statement-id <orginal-bucket-name>


aws s3api put-bucket-notification-configuration --bucket <orginal-bucket-name> --notification-configuration '{
    "LambdaFunctionConfigurations": [
        {
            "LambdaFunctionArn": "arn:aws:lambda:us-east-1:<AWSAccountId>:function:<function-name-lambda>",
            "Events": [
                "s3:ObjectCreated:Put"
            ]
        }
    ]
}'

# Quellen:
- Lambda Fuktion mit Visual Studio erstellen:
https://youtu.be/unt2-B0QQFQ?si=dzt_TfyAuG-yj7Oy

- GetObject anhand von den Beispielen auf AWS Dokumentation umgesetzt:
https://docs.aws.amazon.com/sdkfornet/v3/apidocs/items/S3/TGetObjectRequest.html

- Funktion 'ResizeImage' mit Hilfe der Sixlabors Dokumentation umgesetzt:
https://docs.sixlabors.com/articles/imagesharp/resize.html

- PutObject anhand von den Beispielen auf AWS Dokumentation umgesetzt:
https://docs.aws.amazon.com/sdkfornet1/latest/apidocs/html/T_Amazon_S3_Model_PutObjectRequest.htm

- DeleteObject anhand von den Beispielen auf AWS Dokumentation umgesetzt:
https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_DeleteObject_section.html

- ListObjects anhand von den Beispielen auf AWS Dokumentation umgesetzt:
https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_ListObjects_section.html

-put-bucket-notification-configuration
https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-notification-configuration.html


# Verwendete Tools:
- AWSToolkitPackage.v17
https://marketplace.visualstudio.com/items?itemName=AmazonWebServices.AWSToolkitforVisualStudio2022#:~:text=The%20AWS%20Toolkit%20for%20Visual,applications%20using%20Amazon%20Web%20Services.
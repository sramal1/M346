using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.S3.Model;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace file_download_lambda;

public class Function
{
    private readonly IAmazonS3 _s3Client;
    private const string BucketNameResized = "resize-image-bucket-m346";

    public Function()
    {
        _s3Client = new AmazonS3Client();
    }

    public async Task FunctionHandler(ILambdaContext context)
    {
        var listObjectResponse = await ListObjects();

        var homeDirectory = Environment.GetEnvironmentVariable("HOME");

        foreach (var s3Object in listObjectResponse.S3Objects)
        {
            context.Logger.Log($"START: Download {s3Object.Key}");
            await DownloadObject(s3Object.Key, homeDirectory);
            await DeleteObject(s3Object.Key);
            context.Logger.Log($"FINISHED: Download {s3Object.Key}");
        }
    }

    /// <summary>
    /// Lists all objects in an Amazon S3 bucket.
    /// </summary>
    /// <returns>A Task with the asynchronous operation, returning the ListObjectsResponse.</returns>
    async Task<ListObjectsResponse> ListObjects()
    {
        var listObjectsRequest = new ListObjectsRequest
        {
            BucketName = BucketNameResized
        };

        return await _s3Client.ListObjectsAsync(listObjectsRequest);
    }

    /// <summary>
    /// Deletes an object from an S3 bucket.
    /// </summary>
    /// <param name="key">The key of the object to be deleted.</param>
    /// <returns>>A Task with the asynchronous operation.</returns>
    async Task DeleteObject(string key)
    {
        var deleteObjectRequest = new DeleteObjectRequest
        {
            BucketName = BucketNameResized,
            Key = key,
        };

        await _s3Client.DeleteObjectAsync(deleteObjectRequest);
    }

    /// <summary>
    /// Download an object from an Amazon S3 bucket.
    /// </summary>
    /// <param name="objectKey">The key of the object to downlaod.</param>
    async Task DownloadObject(string objectKey, string homeDirectory)
    {
        var getObjectRequest = new GetObjectRequest
        {
            BucketName = BucketNameResized,
            Key = objectKey
        };


        var downloadPath = Path.Combine(homeDirectory, "Downloads", objectKey);
        // For tesing on Windows use this:
        //var downloadPath = @"C:\temp";

        using (var response = await _s3Client.GetObjectAsync(getObjectRequest))
        using (var fileStream = File.Create(downloadPath))
        {
            response.ResponseStream.CopyTo(fileStream);
            fileStream.Close();
        }
    }
}

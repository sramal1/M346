// Cloud Projekt Arbeit
// Gruppe: Livio, Manuel, Raphael, Leotrim
// Author: Manuel Bühler

// Lambda-Funktion

using Amazon.Lambda.Core;
using Amazon.S3;
using Amazon.S3.Model;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace image_resizer_lambda
{
    public class Function
    {
        private readonly IAmazonS3 _s3Client;
        private const string BucketName = "original-image-bucket-m346";
        private const string BucketNameResized = "resize-image-bucket-m346";

        public Function()
        {
            _s3Client = new AmazonS3Client();
        }

        public async Task FunctionHandler(ILambdaContext context)
        {
            var listObjectsResponse = await ListObjects();

            foreach (var s3Object in listObjectsResponse.S3Objects)
            {
                var keySplit = s3Object.Key.Split('_');
                var resizePercentage = int.Parse(keySplit[0]);
                var filename = keySplit[1];

                context.Logger.Log($"START: Resize {s3Object.Key}");
                var getObjectResponse = await GetObject(s3Object.Key);
                var resizedStream = ResizeImage(getObjectResponse.ResponseStream, resizePercentage);
                await UploadObject(resizedStream, filename);
                await DeleteObject(s3Object.Key);
                context.Logger.Log($"FINISHED: Resize {s3Object.Key}");
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
                BucketName = BucketName
            };

            return await _s3Client.ListObjectsAsync(listObjectsRequest);
        }

        /// <summary>
        /// Gets an object from an Amazon S3 bucket.
        /// </summary>
        /// <param name="objectKey">The key of the object to retrieve.</param>
        /// <returns>A Task with the asynchronous operation, returning the GetObjectResponse.</returns>
        async Task<GetObjectResponse> GetObject(string objectKey)
        {
            var getObjectRequest = new GetObjectRequest
            {
                BucketName = BucketName,
                Key = objectKey
            };

            return await _s3Client.GetObjectAsync(getObjectRequest);
        }

        /// <summary>
        /// Uploads an object to an Amazon S3 bucket using an image stream.
        /// </summary>
        /// <param name="imgStream">The MemoryStream containing the image to be uploaded.</param>
        /// <param name="objectKey">The key for the resized object in the destination bucket.</param>
        /// <returns>A Task with the asynchronous operation.</returns>
        async Task UploadObject(MemoryStream imgStream, string objectKey)
        {
            var putObjectRequest = new PutObjectRequest
            {
                BucketName = BucketNameResized,
                Key = objectKey,
                InputStream = imgStream
            };

            await _s3Client.PutObjectAsync(putObjectRequest);
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
                BucketName = BucketName,
                Key = key,
            };

            await _s3Client.DeleteObjectAsync(deleteObjectRequest);
        }

        /// <summary>
        /// Resizes an image stream using Lanczos3 resampling.
        /// </summary>
        /// <param name="imgStream">The input image stream to be resized.</param>
        /// <param name="resizePercentage">The percentage by which the image will be reduced in size</param>
        /// <returns>The resized MemoryStream with the image.</returns>
        static MemoryStream ResizeImage(Stream imgStream, int resizePercentage)
        {
            using (var img = Image.Load(imgStream))
            {
                var width = img.Width / 100 * resizePercentage;
                var height = img.Height / 100 * resizePercentage;

                img.Mutate(x => x.Resize(width, height, KnownResamplers.Lanczos3)); // Resampler can be changed

                var resizedStream = new MemoryStream();
                img.Save(resizedStream, new PngEncoder());

                return resizedStream;
            }
        }
    }
}

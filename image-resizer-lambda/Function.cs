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
        private const string BucketName = "mabu-bucket-original";
        private const string BucketNameResized = "mabu-bucket-resized";
        private const string ObjectKey = "xu-haiwei-S3LL_LPcrcw-unsplash.png";

        public Function()
        {
            _s3Client = new AmazonS3Client();
        }

        public async Task<string> FunctionHandler(ILambdaContext context)
        {
            var getObjectResponse = await GetObject();
            var resizedStream = ResizeImage(getObjectResponse.ResponseStream);

            await UploadObject(resizedStream);
            return $"https://s3.amazonaws.com/{BucketName}/resized";
        }

        /// <summary>
        /// Gets an object from an Amazon S3 bucket.
        /// </summary>
        /// <returns>A Task with the asynchronous operation, returning the GetObjectResponse.</returns>
        async Task<GetObjectResponse> GetObject()
        {
            var getObjectRequest = new GetObjectRequest
            {
                BucketName = BucketName,
                Key = ObjectKey
            };

            return await _s3Client.GetObjectAsync(getObjectRequest);
        }

        /// <summary>
        /// Uploads an object to an Amazon S3 bucket using an image stream.
        /// </summary>
        /// <param name="imgStream">The MemoryStream containing the image to be uploaded.</param>
        /// <returns>A Task with the asynchronous operation.</returns>
        async Task UploadObject(MemoryStream imgStream)
        {
            var putObjectRequest = new PutObjectRequest
            {
                BucketName = BucketNameResized,
                Key = "resized",
                InputStream = imgStream
            };
            await _s3Client.PutObjectAsync(putObjectRequest);
        }

        /// <summary>
        /// Resizes an image stream using Lanczos3 resampling.
        /// </summary>
        /// <param name="imgStream">The input image stream to be resized.</param>
        /// <returns>The resized MemoryStream with the image.</returns>
        static MemoryStream ResizeImage(Stream imgStream)
        {
            using (var img = Image.Load(imgStream))
            {
                var width = img.Width / 2;
                var height = img.Height / 2;

                img.Mutate(x => x.Resize(width, height, KnownResamplers.Lanczos3)); // Resampler can be changed

                var resizedStream = new MemoryStream();
                img.Save(resizedStream, new PngEncoder());

                return resizedStream;
            }
        }
    }
}

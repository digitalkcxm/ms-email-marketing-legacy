const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3")

const region = process.env.BUCKETREGION || 'sa-east-1'
const s3 = new S3Client({ region })
const bucketName = process.env.BUCKETNAME

class StorageService {
  async upload(dirBucket, dirFile, fileName, publicAccess = false, bucket = bucketName) {
    try {
      await s3.send(new PutObjectCommand({
        Bucket: bucket,
        Key: `${dirBucket}/${fileName}`,
        Body: dirFile,
        ACL: (publicAccess) ? 'public-read' : 'private'
      }))

      if (region == 'us-east-1') {
        return {
          fileName,
          url: `https://${bucketName}.s3.amazonaws.com/${dirBucket}/${fileName}`
        }
      }

      return {
        fileName,
        url: `https://${bucketName}.s3-${region}.amazonaws.com/${dirBucket}/${fileName}`
      }
    } catch (err) {
      console.log("Error", err)
      return err
    }
  }
}

module.exports = StorageService

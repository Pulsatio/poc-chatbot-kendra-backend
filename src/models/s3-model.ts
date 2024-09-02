import { HeadObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { CreateBucketCommand, ListObjectsCommand } from '@aws-sdk/client-s3';

export const s3 = new S3Client({
  region: process.env.AWS_REGION ?? 'us-east-1',
  credentials:{
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  }
})

export async function createBucket(user_id: string){
  const prefix = process.env.PREFIX_BUCKET_NAME ?? '';
  const command = new CreateBucketCommand({Bucket: prefix + user_id});
  await s3.send(command);
}

export async function createSignedPost(bucket: string, filename: string, filetype:string) {
  const ans = await createPresignedPost(s3, {
      Bucket:bucket, 
      Key: filename,
    },
  )
  return ans;
}

export async function listFiles(bucket: string) {  
  const ans = await s3.send(new ListObjectsCommand({
      Bucket: bucket
    })
  )
  if(!ans.Contents){
    return []
  }
  return ans;
}

export async function checkObjectExists(key: string): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key
    }));
    return true;
  } catch (error) {
    return false;
  }
}

import path from 'path';
import dotenv from 'dotenv';
import { s3Client } from './setupAWS';
import { InternalServerError } from 'routing-controllers';
import { PutObjectCommand } from '@aws-sdk/client-s3';
dotenv.config();

const { AWS_BUCKET_NAME, AWS_REGION } = process.env;

export const uploadToS3 = async (
  file: Express.Multer.File,
): Promise<string> => {
  const command = new PutObjectCommand({
    Bucket: AWS_BUCKET_NAME as string,
    Key: `${Date.now()}_${path.basename(file.originalname)}`,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  });

  try {
    await s3Client.send(command);
    return `https://${AWS_BUCKET_NAME}.s3.${AWS_REGION}.amazonaws.com/${Date.now()}_${file.originalname}`;
  } catch (err) {
    console.error('Error uploading file:', err);
    throw new InternalServerError('Error uploading file.');
  }
};

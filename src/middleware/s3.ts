import { S3Client, DeleteObjectCommand, GetObjectCommand, PutObjectCommand, ObjectCannedACL } from "@aws-sdk/client-s3";
import dotenv from 'dotenv';
import multer from "multer";
import IMedia from "../interfaces/IMedia";

dotenv.config();

const bucket: string = process.env.AWS_BUCKET_NAME!;
const region: string = process.env.AWS_BUCKET_REGION!;
const accessKeyId: string = process.env.AWS_ACCESS_KEY!;
const secretAccessKey: string = process.env.AWS_SECRET_ACCESS_KEY!;

const s3 = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey
    }
});

const multerUpload = multer({
    storage: multer.memoryStorage(), 
    limits: {
        fileSize: 1024 * 1024 * 1024 // 1GB
    }
});

export function uploadFileToAWS(fileBuffer: Buffer, fileName: string, mimetype: string) {
    const uploadParams = {
        Bucket: bucket,
        Body: fileBuffer,
        Key: fileName,
        ContentType: mimetype,

    };

    return s3.send(new PutObjectCommand(uploadParams));
}

const getFileUrl = (Key: string): string => {
    if (Key) {
        return `https://${bucket}.s3.${region}.amazonaws.com/${Key}`;
    }
    return '';
};

export function validateAndDeleteMedia(request: any): string | Promise<any> {
    if (!request) return "file not found";
    const { userId, userPermission, fileUrl } = request;
    const fileName = fileUrl.split('/').pop()?.split('?')[0];
    if (!fileName) return "file not found";
    const fileOwnerId = fileName.split('_')[0];
    if (userId !== fileOwnerId && userPermission !== 'admin') {
        return "You do not have permission to delete this file.";
    }
    return deleteFile(fileName);
}

function deleteFile(fileName: string): Promise<any> {
    const deleteParams = {
        Bucket: bucket,
        Key: fileName,
    };
    return s3.send(new DeleteObjectCommand(deleteParams));
}

export const tempImgUpload = multerUpload.single('img');

export const tempMediaUpload = multerUpload.single('media');

export async function validateAndUploadImg(imageData: Express.Multer.File, userId: string): Promise<void | string> {
    if (!imageData) return;
    const { buffer, mimetype } = imageData;
    if (mimetype.split('/')[0] !== 'image') throw new Error('Invalid image type');
    const imageName = `${userId}_${Date.now().toString()}_${imageData.originalname}`;
    await uploadFileToAWS(buffer, imageName, mimetype);
    return getFileUrl(imageName);
}

export async function validateAndUploadMedia(mediaData: Express.Multer.File | undefined, userId: string): Promise<void | IMedia> {
    if (!mediaData) return;
    const { buffer, mimetype, size } = mediaData;
    const fileName = `${userId}_${Date.now().toString()}_${mediaData.originalname}`;
    await uploadFileToAWS(buffer, fileName, mimetype);
    const path = getFileUrl(fileName);
    let media: IMedia = {
        type: mimetype.split('/')[0], // "image", "video", "audio", "document", 
        fileName: fileName,
        path,
        size,
    };
    return media;
}

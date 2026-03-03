import {
    S3Client,PutObjectCommand,GetObjectCommand, DeleteObjectCommand
} from '@aws-sdk/client-s3'
import {getSignedUrl} from '@aws-sdk/s3-request-presigner'

export const r2 = new S3Client({
    region:"auto",
    endpoint:"https://t3.storage.dev",
    credentials:{
        accessKeyId:process.env.R2_ACCESS_KEY!,
        secretAccessKey:process.env.R2_SECRET_KEY!
    },

})

type UploadAudioOptions ={
    buffer:Buffer,
    key:string ,
    contentType?:string
}

export const uploadAudio = async({contentType="audio/wav",buffer,key}:UploadAudioOptions)=>{
    await r2.send(new PutObjectCommand({
        Bucket:process.env.R2_BUCKET_NAME!,
        Key:key,
        Body:buffer,
        ContentType:contentType
    }))
}

export const deleteAudio = async(key:string)=>{
    await r2.send(new DeleteObjectCommand({
           Bucket:process.env.R2_BUCKET_NAME!,
        Key:key,
    }))
}

export const getSignedAudioUrl = async(key:string)=>{
    const cmd = new GetObjectCommand({
             Bucket:process.env.R2_BUCKET_NAME!,
        Key:key,
    });
    return getSignedUrl(r2,cmd,{expiresIn:36000})
}
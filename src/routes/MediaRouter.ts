import { Request, Response, Router } from 'express';
import { validateAndDeleteMedia, tempImgUpload, tempMediaUpload, validateAndUploadImg, validateAndUploadMedia } from '../middleware/s3';
import { verifyToken } from '../middleware/auth';

const router: Router = Router();

router.post("/img", tempImgUpload, verifyToken, async (req: Request, res: Response) => {
    console.log("req.body: ", req.body);

    try {
        let userId: string = req.body.userId;
        if (req.file) {
            let url = await validateAndUploadImg(req.file, userId)
            console.log(url)
            if (url) {
                const fileName = url.split('/').pop()?.split('?')[0];
                console.log({ fileName });

            }
        }

        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(666).send("error not found");
    }
});

router.post("/media", tempMediaUpload, async (req: Request, res: Response) => {
    try {
        let userId: string = req.body.userId;
        if (req.file) {
            let media = await validateAndUploadMedia(req.file, userId)
            console.log(media)
        }
        res.send("Files uploaded successfully.");
    } catch (error) {
        console.log('Error:', error);
        res.status(666).send("error not found");
    }
});

router.delete("/img", async (req: Request, res: Response) => {
    console.log("req.body: ", req.body);
    const fileUrl  = req.body.fileUrl;
    console.log("fileUrl: ", fileUrl);
    try {
        await validateAndDeleteMedia(req.body);
        res.send(`File ${fileUrl} deleted successfully.`);
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send("Error deleting file.");
    }
});

// router.delete("/:fileName", async (req: Request, res: Response) => {

//     const { fileName } = req.params;
//     const userId = req.body.userId;
//     const userPermission = req.body.userPermission;
//     const fileOwnerId = fileName.split('_')[0];
//     console.log("fileName: ", fileName);
//     console.log("userId: ", userId);
//     console.log("userPermission: ", userPermission);
//     console.log("fileOwnerId: ", fileOwnerId);

//     if (userId !== fileOwnerId && userPermission !== 'admin') {
//         return res.status(403).send('You do not have permission to delete this file.');
//     }

//     try {
//         await deleteFile(fileName);
//         res.send(`File ${fileName} deleted successfully.`);
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("Error deleting file.");
//     }
// });


// router.post("/", uploadAnyFileFS.any(), (req: Request, res: Response) => {
//     try {
//         let files = req.files as Express.Multer.File[];
//         console.log(files[0].mimetype);
//         res.send("Files uploaded successfully.");
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("An error occurred during file upload.");
//     }
// });


// router.post("/img", uploadImageFS.any(), (req: Request, res: Response) => {
//     try {
//         let files = req.files as Express.Multer.File[];
//         console.log(files[0].mimetype);
//         res.send("Files uploaded successfully.");
//     } catch (error) {
//         console.log('Error:', error);
//         res.status(500).send("An error occurred during file upload.");
//     }
// });



// router.get("/", (req: Request, res: Response) => {
//     try {
//         res.send("yep");
//     } catch (error) {
//         console.log(error);
//     }
// });



export default router;

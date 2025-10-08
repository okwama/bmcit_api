import { ConfigService } from '@nestjs/config';
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadImage(file: any, folder?: string): Promise<{
        url: string;
        public_id: string;
    }>;
    deleteImage(publicId: string): Promise<void>;
    getImageUrl(publicId: string, transformations?: any): Promise<string>;
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const cloudinary_1 = require("cloudinary");
let CloudinaryService = class CloudinaryService {
    configService;
    constructor(configService) {
        this.configService = configService;
        cloudinary_1.v2.config({
            cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
        });
    }
    async uploadImage(file, folder = 'bm_security') {
        try {
            const base64String = file.buffer.toString('base64');
            const dataUri = `data:${file.mimetype};base64,${base64String}`;
            const result = await cloudinary_1.v2.uploader.upload(dataUri, {
                folder: folder,
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 800, crop: 'fill', gravity: 'face' },
                    { quality: 'auto', fetch_format: 'auto' }
                ],
                public_id: `staff_${Date.now()}_${Math.random().toString(36).substring(7)}`,
            });
            return {
                url: result.secure_url,
                public_id: result.public_id,
            };
        }
        catch (error) {
            console.error('Cloudinary upload error:', error);
            throw new Error(`Failed to upload image: ${error.message}`);
        }
    }
    async deleteImage(publicId) {
        try {
            await cloudinary_1.v2.uploader.destroy(publicId);
        }
        catch (error) {
            console.error('Cloudinary delete error:', error);
            throw new Error(`Failed to delete image: ${error.message}`);
        }
    }
    async getImageUrl(publicId, transformations) {
        try {
            return cloudinary_1.v2.url(publicId, transformations);
        }
        catch (error) {
            console.error('Cloudinary URL generation error:', error);
            throw new Error(`Failed to generate image URL: ${error.message}`);
        }
    }
};
exports.CloudinaryService = CloudinaryService;
exports.CloudinaryService = CloudinaryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], CloudinaryService);
//# sourceMappingURL=cloudinary.service.js.map
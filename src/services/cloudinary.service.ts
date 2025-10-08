import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    // Configure Cloudinary
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadImage(
    file: any,
    folder: string = 'bm_security',
  ): Promise<{ url: string; public_id: string }> {
    try {
      // Convert buffer to base64 for Cloudinary
      const base64String = file.buffer.toString('base64');
      const dataUri = `data:${file.mimetype};base64,${base64String}`;

      const result = await cloudinary.uploader.upload(dataUri, {
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
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw new Error(`Failed to upload image: ${error.message}`);
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.error('Cloudinary delete error:', error);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  }

  async getImageUrl(publicId: string, transformations?: any): Promise<string> {
    try {
      return cloudinary.url(publicId, transformations);
    } catch (error) {
      console.error('Cloudinary URL generation error:', error);
      throw new Error(`Failed to generate image URL: ${error.message}`);
    }
  }
}

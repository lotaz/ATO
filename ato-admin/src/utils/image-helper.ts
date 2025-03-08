/**
 * Helper functions for handling image uploads and management
 */

import { API_BASE_URL } from '../helpers/axios-helper';

// Constants for image validation
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const API_UPLOAD_URL = API_BASE_URL + '/file/upload'; // Replace with your actual API endpoint
interface ImageValidationResult {
  isValid: boolean;
  error?: string;
}

interface ImageUploadResult {
  success: boolean;
  linkImg?: string;
  error?: string;
}

export const validateImage = (file: File): ImageValidationResult => {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return {
      isValid: false,
      error: 'Invalid file type. Allowed types: JPG, PNG, GIF, WEBP'
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size too large. Maximum size: 5MB'
    };
  }

  return { isValid: true };
};

export const uploadImage = async (file: File): Promise<ImageUploadResult> => {
  try {
    // Validate image first
    const validation = validateImage(file);
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.error
      };
    }

    // Create FormData
    const formData = new FormData();
    formData.append('file', file);

    // Upload to API
    const response = await fetch(API_UPLOAD_URL, {
      method: 'POST',
      body: formData
    });

    console.log('res', response);

    if (!response.ok) {
      throw new Error('Upload failed');
    }

    const data = await response.json();

    console.log('data', data);
    // Assuming the API returns { success: true, linkImg: "url_to_image" }
    return {
      success: true,
      linkImg: data.fileUrl
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    return {
      success: false,
      error: 'Failed to upload image. Please try again.'
    };
  }
};
export const createImagePreview = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error('Failed to create image preview'));
    reader.readAsDataURL(file);
  });
};

export const handleImageUpload = async (
  file: File,
  onSuccess: (imageUrl: string) => void,
  onError: (error: string) => void,
  onPreview?: (previewUrl: string) => void
) => {
  try {
    // Create preview first if needed
    if (onPreview) {
      const previewUrl = await createImagePreview(file);
      onPreview(previewUrl);
    }

    // Upload image
    const result = await uploadImage(file);

    if (result.success && result.linkImg) {
      onSuccess(result.linkImg);
    } else {
      onError(result.error || 'Upload failed');
    }
  } catch (error) {
    onError('Failed to process image');
    console.error('Image upload error:', error);
  }
};

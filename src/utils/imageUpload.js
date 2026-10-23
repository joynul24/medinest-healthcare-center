/**
 * @file imageUpload.js
 * @description Centralized utility to upload images to ImgBB cloud hosting.
 * Handles FormData construction, API key authentication, and returns the direct CDN image URL.
 */

import axios from 'axios';

// ImgBB API Key provided by user
const IMGBB_API_KEY =
  import.meta.env.VITE_IMGBB_API_KEY || 'ab77c5a5b849e4768fc5848334118cac';
const IMGBB_UPLOAD_URL = 'https://api.imgbb.com/1/upload';

/**
 * Uploads an image file (from <input type="file">) to ImgBB.
 * @param {File|Blob} imageFile - The raw image file object.
 * @returns {Promise<string>} The permanent CDN hosted display URL of the uploaded image.
 */
export const uploadImageToImgBB = async (imageFile) => {
  if (!imageFile) {
    throw new Error('No image file provided for upload');
  }

  const formData = new FormData();
  formData.append('image', imageFile);

  try {
    const response = await axios.post(
      `${IMGBB_UPLOAD_URL}?key=${IMGBB_API_KEY}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    if (response.data && response.data.data) {
      // Return direct hosted image URL
      return (
        response.data.data.display_url ||
        response.data.data.url ||
        response.data.data.thumb?.url
      );
    }

    throw new Error('Unexpected response format from ImgBB');
  } catch (error) {
    console.error('[ImgBB Upload Error]:', error.response?.data || error.message);
    throw new Error(
      error.response?.data?.error?.message || 'Failed to upload image to ImgBB'
    );
  }
};

export default uploadImageToImgBB;

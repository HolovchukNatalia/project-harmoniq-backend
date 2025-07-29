import { getEnvVar } from './getEvnVar.js';
import { saveFileToCloudinary } from './saveFileToCloudinary.js';
import { saveFileToUploadDir } from './saveFileToUploadDir.js';

export const uploadImageFile = async (file) => {
  if (!file) return null;

  const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
  return useCloudinary
    ? await saveFileToCloudinary(file)
    : await saveFileToUploadDir(file);
};

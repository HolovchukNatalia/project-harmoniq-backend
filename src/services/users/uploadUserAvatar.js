import { getEnvVar } from '../../utils/getEvnVar.js';
import { saveFileToCloudinary } from '../../utils/saveFileToCloudinary.js';
import { saveFileToUploadDir } from '../../utils/saveFileToUploadDir.js';

export const uploadUserAvatar = async (file) => {
  if (!file) return null;

  const useCloudinary = getEnvVar('ENABLE_CLOUDINARY') === 'true';
  return useCloudinary
    ? await saveFileToCloudinary(file)
    : await saveFileToUploadDir(file);
};

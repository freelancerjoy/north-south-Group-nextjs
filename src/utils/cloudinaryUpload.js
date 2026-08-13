import axios from "axios";
import apiInstance from "../config/axios";

const IMAGE_MAX_WIDTH = 1600;
const IMAGE_MAX_HEIGHT = 1600;
const IMAGE_TARGET_BYTES = 500 * 1024;
const IMAGE_QUALITIES = [0.82, 0.72, 0.62, 0.52];

// Fetch a signed upload config from the backend (one call per batch)
const getSignature = async (folder) => {
  const { data } = await apiInstance.get(`/project/upload-signature?folder=${folder}`);
  return data;
};

const getCloudinaryResourceType = (file) => {
  if (!file) return "auto";
  if (file.type === "application/pdf" || file.name?.toLowerCase().endsWith(".pdf")) return "raw";
  if (file.type?.startsWith("video/")) return "video";
  return "auto";
};

const shouldCompressImage = (file) => {
  if (!file?.type?.startsWith("image/")) return false;
  return !["image/gif", "image/svg+xml"].includes(file.type);
};

const getImageElement = (file) =>
  new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Could not read image for compression"));
    };

    image.src = url;
  });

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve) => {
    canvas.toBlob(resolve, type, quality);
  });

export const getCompressedImage = async (file) => {
  if (!shouldCompressImage(file)) return file;
  if (file.type === "image/webp" && file.size <= IMAGE_TARGET_BYTES) return file;

  let image;
  try {
    image = await getImageElement(file);
  } catch {
    return file;
  }

  const scale = Math.min(
    1,
    IMAGE_MAX_WIDTH / image.naturalWidth,
    IMAGE_MAX_HEIGHT / image.naturalHeight
  );
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return file;
  context.drawImage(image, 0, 0, width, height);

  let bestBlob = null;
  const outputType = "image/webp";

  for (const quality of IMAGE_QUALITIES) {
    const blob = await canvasToBlob(canvas, outputType, quality);
    if (!blob) continue;
    bestBlob = blob;
    if (blob.size <= IMAGE_TARGET_BYTES) break;
  }

  if (!bestBlob) return file;
  if (file.type === outputType && bestBlob.size >= file.size) return file;

  const originalName = file.name?.replace(/\.[^.]+$/, "") || "image";
  return new File([bestBlob], `${originalName}.webp`, {
    type: outputType,
    lastModified: Date.now(),
  });
};

export const appendOptimizedFile = async (formData, fieldName, file) => {
  if (!file) return;
  const optimizedFile = await getCompressedImage(file);
  formData.append(fieldName, optimizedFile);
};

export const appendOptimizedFiles = async (formData, fieldName, files = []) => {
  for (const file of Array.from(files || [])) {
    await appendOptimizedFile(formData, fieldName, file);
  }
};

// Upload a single File object directly to Cloudinary.
const uploadOneAsset = async (file, sig) => {
  const fileToUpload = await getCompressedImage(file);
  const fd = new FormData();
  fd.append("file", fileToUpload);
  fd.append("api_key", sig.apiKey);
  fd.append("timestamp", String(sig.timestamp));
  fd.append("signature", sig.signature);
  fd.append("folder", sig.folder);
  const resourceType = getCloudinaryResourceType(fileToUpload);

  try {
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${sig.cloudName}/${resourceType}/upload`,
      fd
    );
    return {
      public_id: res.data.public_id,
      url: res.data.secure_url,
      resource_type: res.data.resource_type || resourceType,
    };
  } catch (error) {
    const cloudinaryMessage = error?.response?.data?.error?.message;
    throw new Error(cloudinaryMessage || "Cloudinary upload failed");
  }
};

const uploadOne = async (file, sig) => {
  const asset = await uploadOneAsset(file, sig);
  return asset.url;
};

// Upload multiple files — returns array of URLs
export const uploadFiles = async (files, folder = "projects") => {
  const arr = Array.from(files || []);
  if (arr.length === 0) return [];
  const sig = await getSignature(folder);
  return Promise.all(arr.map((f) => uploadOne(f, sig)));
};

// Upload a single file — returns URL string or null
export const uploadSingle = async (file, folder = "projects") => {
  if (!file) return null;
  const sig = await getSignature(folder);
  return uploadOne(file, sig);
};

export const uploadSingleAsset = async (file, folder = "projects") => {
  if (!file) return null;
  const sig = await getSignature(folder);
  return uploadOneAsset(file, sig);
};

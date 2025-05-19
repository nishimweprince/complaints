export const environment = {
  apiUrl: import.meta.env.VITE_API_URL || "https://api.complaints.basis.rw/api",
  storageEncryptionKey:
    import.meta.env.VITE_STORAGE_ENCRYPTION_KEY || "complaints",
};

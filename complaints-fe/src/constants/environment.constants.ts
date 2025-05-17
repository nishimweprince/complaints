export const environment = {
  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  storageEncryptionKey:
    import.meta.env.VITE_STORAGE_ENCRYPTION_KEY || "complaints",
};

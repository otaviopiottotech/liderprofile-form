import { getDerivedKey } from "./encript";
import Pako from "pako";

export const decryptWithCTR = async (value: string) => {
  const deriveKey = await getDerivedKey();

  const uintArray = new Uint8Array(
    [...atob(value)].map((char) => char.charCodeAt(0))
  );

  const iv = uintArray.slice(0, 16);

  const encryptedData = uintArray.slice(16);

  const decryptedChunk = await window.crypto.subtle.decrypt(
    { name: "AES-CTR", counter: iv, length: 128 },
    deriveKey,
    encryptedData
  );

  // Decompress the data
  const decompressedData = Pako.inflate(decryptedChunk, { to: "string" });

  return decompressedData;
};

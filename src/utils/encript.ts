import Pako from "pako";

const publicKey = import.meta.env.VITE_ENCRYPT_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_ENCRYPT_PRIVATE_KEY;

export const generateDeriveKey = async (
  publicKeyJwk: JsonWebKey,
  privateKeyJwk: JsonWebKey
) => {
  const publicKey = await window.crypto.subtle.importKey(
    "jwk",
    publicKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );

  const privateKey = await window.crypto.subtle.importKey(
    "jwk",
    privateKeyJwk,
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  return await window.crypto.subtle.deriveKey(
    { name: "ECDH", public: publicKey },
    privateKey,
    { name: "AES-CTR", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encryptWithCTR = async (data: string) => {
  const deriveKey = await getDerivedKey();

  // Compress the data
  const compressedData = Pako.deflate(data);

  const iv = window.crypto.getRandomValues(new Uint8Array(16));

  const encryptedChunk = await window.crypto.subtle.encrypt(
    { name: "AES-CTR", counter: iv, length: 128 },
    deriveKey,
    compressedData
  );

  const uintArray = new Uint8Array(encryptedChunk);

  const combinedData = new Uint8Array(iv.length + uintArray.length);
  combinedData.set(iv);
  combinedData.set(uintArray, iv.length);

  return btoa(String.fromCharCode.apply(null, combinedData as any));
};

export const importKeys = async () => {
  const publicK = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(publicKey),
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    []
  );

  const privateK = await window.crypto.subtle.importKey(
    "jwk",
    JSON.parse(privateKey),
    {
      name: "ECDH",
      namedCurve: "P-256",
    },
    true,
    ["deriveKey", "deriveBits"]
  );

  return { publicK, privateK };
};

export const getDerivedKey = async () => {
  const keys = await importKeys();

  const exPrivate = await window.crypto.subtle.exportKey("jwk", keys.privateK);
  const exPublic = await window.crypto.subtle.exportKey("jwk", keys.publicK);

  const derivedKey = await generateDeriveKey(exPublic, exPrivate);

  return derivedKey;
};

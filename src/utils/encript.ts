const publicKey = import.meta.env.VITE_ENCRYPT_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_ENCRYPT_PRIVATE_KEY;
const encodedMessage = import.meta.env.VITE_ENCODE_MESSAGES;

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
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
};

export const encrypt = async (data: string, deriveKey: CryptoKey) => {
  const encodedData = new TextEncoder().encode(data);

  const encryptData = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv: new TextEncoder().encode(encodedMessage) },
    deriveKey,
    encodedData
  );

  const uintArray = new Uint8Array(encryptData);

  const string = String.fromCharCode.apply(null, uintArray as any);

  return btoa(string);
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

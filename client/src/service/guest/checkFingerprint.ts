import request from "../request";

export const sendFingerprint = async (body: { fingerprint: string }) => {
  return request.post("/auth/save-fingerprint", body);
};

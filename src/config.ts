import { createHash } from "crypto";


function generateMd5Hash(input: string): string {
  const hash = createHash('md5');
  hash.update(input);
  return hash.digest('hex');
}


function generateSecret() {
//   generate a secret from LAMBDA name if in aws environment ese return s3cr3t
  if (!process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return 's3cr3t';
  }
  return generateMd5Hash(process.env.AWS_LAMBDA_FUNCTION_NAME);
}

export const JWT_SECRET: string = generateSecret();
export const JWT_REFRESH_SECRET: string = generateMd5Hash(JWT_SECRET);

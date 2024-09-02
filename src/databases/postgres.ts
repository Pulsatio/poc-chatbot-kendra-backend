import { PrismaClient } from '@prisma/client'
import { SecretsManagerClient, GetSecretValueCommand } from "@aws-sdk/client-secrets-manager";

const client = new SecretsManagerClient({ region: "us-east-1" });


export async function retrieveSecret(secretName: string): Promise<string> {
  try {
    const command = new GetSecretValueCommand({ SecretId: secretName });
    const data = await client.send(command);

    if (data.SecretString) {
      return data.SecretString;
    } else {
      // En caso de que el secreto sea un valor binario
      let buff = Buffer.from(data.SecretBinary as Uint8Array);
      return buff.toString('utf-8');
    }
  } catch (error) {
    console.error(error);
    throw new Error(`Error al recuperar el secreto: ${secretName}`);
  }
}

let memo: PrismaClient | null = null;

export default async function getConnection(): Promise<PrismaClient> {
  if (memo) {
    return memo;
  }

  let databaseUrl = "";
  if (process.env.DATABASE_URL) {
    databaseUrl = process.env.DATABASE_URL;
  } else {
    let secret = await retrieveSecret(process.env.DATABASE_SECRET as string);
    let secretJSON = JSON.parse(secret);
    databaseUrl = `postgresql://${secretJSON.username}:${secretJSON.password}@${secretJSON.host}:${secretJSON.port}/${secretJSON.database}?schema=public`;
  }
  const prisma = new PrismaClient({
    datasourceUrl: databaseUrl,
  })
  memo = prisma;
  return prisma;
};

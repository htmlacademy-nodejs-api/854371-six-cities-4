export function getUri(
  dbHost: string,
  dbUser: string,
  dbPassword: string,
  dbPort: number,
  dbName: string,
) {
  return `mongodb://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}?authSource=admin`
}

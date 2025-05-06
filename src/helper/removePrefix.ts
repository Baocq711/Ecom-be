export function removeApiPrefix(path: string): string {
  return path.replace(/^\/?api\/v\d+\//, '/');
}

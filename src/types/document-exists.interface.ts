export interface DocumentExistsInterface {
  exist(documentId: string): Promise<boolean>;
}

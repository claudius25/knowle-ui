import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class OpfsStorageService {
  /**
   * Checks if Origin Private File System (OPFS) is supported in the current environment.
   */
  isSupported(): boolean {
    return (
      typeof navigator !== 'undefined' &&
      'storage' in navigator &&
      typeof navigator.storage.getDirectory === 'function'
    );
  }

  /**
   * Gets the root directory handle of OPFS.
   */
  private async getRoot(): Promise<FileSystemDirectoryHandle> {
    if (!this.isSupported()) {
      throw new Error('OPFS is not supported in this environment.');
    }
    return await navigator.storage.getDirectory();
  }

  /**
   * Resolves parent directory handle and filename from a relative path.
   */
  private async resolvePath(
    path: string,
    createDirs = false,
  ): Promise<{ dirHandle: FileSystemDirectoryHandle; fileName: string }> {
    const root = await this.getRoot();
    const cleanPath = path.replace(/^[/\\]+/, '').replace(/[/\\]+$/, '');
    const parts = cleanPath.split(/[/\\]+/);

    if (parts.length === 0 || (parts.length === 1 && !parts[0])) {
      throw new Error(`Invalid file path: "${path}"`);
    }

    const fileName = parts.pop()!;
    let currentDir = root;

    for (const part of parts) {
      currentDir = await currentDir.getDirectoryHandle(part, { create: createDirs });
    }

    return { dirHandle: currentDir, fileName };
  }

  /**
   * Resolves a directory handle from a relative path.
   */
  private async resolveDirectory(path: string, create = false): Promise<FileSystemDirectoryHandle> {
    const root = await this.getRoot();
    const cleanPath = path.replace(/^[/\\]+/, '').replace(/[/\\]+$/, '');
    if (!cleanPath) return root;

    const parts = cleanPath.split(/[/\\]+/);
    let currentDir = root;

    for (const part of parts) {
      currentDir = await currentDir.getDirectoryHandle(part, { create });
    }

    return currentDir;
  }

  /**
   * Checks if a file exists in OPFS and has non-zero size.
   */
  async fileExists(path: string): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const { dirHandle, fileName } = await this.resolvePath(path, false);
      const fileHandle = await dirHandle.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      return file.size > 0;
    } catch {
      return false;
    }
  }

  /**
   * Gets the size in bytes of a file in OPFS.
   */
  async getFileSize(path: string): Promise<number> {
    if (!this.isSupported()) return 0;
    try {
      const { dirHandle, fileName } = await this.resolvePath(path, false);
      const fileHandle = await dirHandle.getFileHandle(fileName);
      const file = await fileHandle.getFile();
      return file.size;
    } catch {
      return 0;
    }
  }

  /**
   * Reads a file from OPFS as an ArrayBuffer.
   */
  async readFile(path: string): Promise<ArrayBuffer> {
    const { dirHandle, fileName } = await this.resolvePath(path, false);
    const fileHandle = await dirHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return await file.arrayBuffer();
  }

  /**
   * Reads a file from OPFS as UTF-8 text.
   */
  async readText(path: string): Promise<string> {
    const { dirHandle, fileName } = await this.resolvePath(path, false);
    const fileHandle = await dirHandle.getFileHandle(fileName);
    const file = await fileHandle.getFile();
    return await file.text();
  }

  /**
   * Writes data (Blob, ArrayBuffer, Uint8Array, or string) to a file in OPFS.
   */
  async writeFile(path: string, data: Blob | ArrayBuffer | Uint8Array | string): Promise<void> {
    const { dirHandle, fileName } = await this.resolvePath(path, true);
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true });
    const writable = await fileHandle.createWritable();
    try {
      if (typeof data === 'string' || data instanceof Blob) {
        await writable.write(data);
      } else if (data instanceof Uint8Array) {
        await writable.write(data as unknown as BufferSource);
      } else if (data instanceof ArrayBuffer) {
        await writable.write(data as unknown as BufferSource);
      } else {
        await writable.write(data as unknown as FileSystemWriteChunkType);
      }
    } finally {
      await writable.close();
    }
  }

  /**
   * Deletes a file from OPFS.
   */
  async deleteFile(path: string): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const { dirHandle, fileName } = await this.resolvePath(path, false);
      await dirHandle.removeEntry(fileName);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Creates a directory path recursively in OPFS.
   */
  async createDirectory(path: string): Promise<void> {
    await this.resolveDirectory(path, true);
  }

  /**
   * Recursively clears all entries in a directory in OPFS.
   */
  async clearDirectory(path: string): Promise<void> {
    if (!this.isSupported()) return;
    try {
      const dirHandle = await this.resolveDirectory(path, false);
      // Remove all entries within dirHandle
      const entriesToRemove: string[] = [];
      // Use async iterator over dirHandle
      // @ts-ignore: AsyncIterable on FileSystemDirectoryHandle
      for await (const [name] of dirHandle.entries()) {
        entriesToRemove.push(name);
      }
      for (const name of entriesToRemove) {
        await dirHandle.removeEntry(name, { recursive: true });
      }
    } catch (err) {
      // Directory may not exist, which is fine
    }
  }
}

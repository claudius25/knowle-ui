import { TestBed } from '@angular/core/testing';
import { OpfsStorageService } from './opfs-storage.service';

describe('OpfsStorageService', () => {
  let service: OpfsStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpfsStorageService],
    });
    service = TestBed.inject(OpfsStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should detect if OPFS is supported', () => {
    const isSupported = service.isSupported();
    expect(typeof isSupported).toBe('boolean');
  });

  describe('OPFS File operations when supported', () => {
    beforeEach(async () => {
      if (!service.isSupported()) return;
      await service.clearDirectory('test-unit');
    });

    afterEach(async () => {
      if (!service.isSupported()) return;
      await service.clearDirectory('test-unit');
    });

    it('should write, check existence, read and delete a text file', async () => {
      if (!service.isSupported()) {
        pending('OPFS is not supported in this environment');
        return;
      }

      const testPath = 'test-unit/hello.txt';
      const testContent = 'Hello OPFS TTS Cache';

      expect(await service.fileExists(testPath)).toBeFalse();

      await service.writeFile(testPath, testContent);
      expect(await service.fileExists(testPath)).toBeTrue();

      const readBack = await service.readText(testPath);
      expect(readBack).toBe(testContent);

      const size = await service.getFileSize(testPath);
      expect(size).toBeGreaterThan(0);

      const deleted = await service.deleteFile(testPath);
      expect(deleted).toBeTrue();
      expect(await service.fileExists(testPath)).toBeFalse();
    });

    it('should write and read binary ArrayBuffer data', async () => {
      if (!service.isSupported()) {
        pending('OPFS is not supported in this environment');
        return;
      }

      const testPath = 'test-unit/binary/data.bin';
      const sampleData = new Uint8Array([1, 2, 3, 4, 5, 42, 255]);

      await service.writeFile(testPath, sampleData.buffer);
      expect(await service.fileExists(testPath)).toBeTrue();

      const buffer = await service.readFile(testPath);
      const readArray = new Uint8Array(buffer);
      expect(readArray.length).toBe(sampleData.length);
      expect(readArray[5]).toBe(42);
      expect(readArray[6]).toBe(255);
    });
  });
});

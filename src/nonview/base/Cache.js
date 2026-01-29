export default class Cache {
  static memory = new Map();

  static getFromMemory(cacheKey) {
    if (this.memory.has(cacheKey)) {
      console.debug(`[Cache] Memory hit: ${cacheKey}`);
      return this.memory.get(cacheKey);
    }
    return null;
  }

  static getFromLocalStorage(cacheKey) {
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored !== null) {
        const data = JSON.parse(stored);
        console.debug(`[Cache] localStorage hit: ${cacheKey}`);
        return data;
      }
    } catch (error) {
      console.error(
        `[Cache] Error reading from localStorage for key ${cacheKey}:`,
        error,
      );
    }
    return null;
  }

  static storeData(cacheKey, data) {
    // Store in memory
    this.memory.set(cacheKey, data);

    // Store in localStorage
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
      console.debug(`[Cache] Stored: ${cacheKey}`);
    } catch (error) {
      console.error(
        `[Cache] Error writing to localStorage for key ${cacheKey}:`,
        error,
      );
    }
  }

  static async get(cacheKey, callback) {
    // Check memory cache first
    const memoryData = this.getFromMemory(cacheKey);
    if (memoryData !== null) {
      return memoryData;
    }

    // Check localStorage
    const localStorageData = this.getFromLocalStorage(cacheKey);
    if (localStorageData !== null) {
      // Restore to memory cache
      this.memory.set(cacheKey, localStorageData);
      return localStorageData;
    }

    // Generate data using callback
    console.debug(`[Cache] Cache miss: ${cacheKey}, generating...`);
    const data = await callback();

    // Store in both caches
    this.storeData(cacheKey, data);

    return data;
  }
}

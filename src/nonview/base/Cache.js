export default class Cache {
  static memory = new Map();

  static getFromMemory(cacheKey) {
    if (this.memory.has(cacheKey)) {
      return this.memory.get(cacheKey);
    }
    return null;
  }

  static getFromLocalStorage(cacheKey) {
    try {
      const stored = localStorage.getItem(cacheKey);
      if (stored !== null) {
        const data = JSON.parse(stored);
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
    } catch (error) {
      console.error(`[Cache] ${cacheKey}: ${error}`);
      localStorage.clear();
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
    const data = await callback();

    // Store in both caches
    this.storeData(cacheKey, data);

    return data;
  }
}

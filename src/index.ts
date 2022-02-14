const defaults: Record<string, string> | null = null
  
type FeatureKey = keyof typeof defaults;
class FeatureFlagService {
    _current: Map<string, boolean>;


    
  
    constructor(defaults: any) {
      Object.defineProperty(this, "_current", {
        enumerable: false,
        value: new Map(),
      });
      for (const key of Object.keys(defaults)) {
        this._current.set(key, defaults[key]);
        Object.defineProperty(this, key, {
          enumerable: true,
          get: () => this._current.get(key),
          set: (value: boolean) => this.set(key as FeatureKey, value),
        });
      }
      this.load();
    }
  
    /** Load values from storage */
    load() {
      for (const key of this._current.keys()) {
        const stored = localStorage.getItem(`featureFlags.${key}`);
  
        if (stored !== null) {
          this._current.set(key, stored === "true");
        }
      }
    }
  
    /** Set stored value, does *not* take effect immediately */
    set(key: FeatureKey, value: boolean = true) {
      if (!this._current.has(key)) throw new RangeError("Invalid key");
  
      if (value !== true && value !== false) throw new TypeError("Value must be boolean");
  
      localStorage.setItem(`featureFlags.${key}`, JSON.stringify(value));
      console.log("Set for future runs, restart/reload the app to see the effects.");
    }
  
    /** Remove from storage, revert to the default; does *not* take effect immediately */
    unset(key: FeatureKey) {
      if (!this._current.has(key)) throw new RangeError("Invalid key");
  
      localStorage.removeItem(`featureFlags.${key}`);
      console.log("Set for future runs, restart/reload the app to see the effects.");
    }
  
    /** Check if flag is set */
    // (just for happier TS)
    enabled(key: FeatureKey): boolean {
      if (!this._current.has(key)) throw new RangeError("Invalid key");
  
      return this._current.get(`${key}`)!;
    }
  
    /** Dump to json, for debugging */
    toJSON() {
      const o: any = {};
  
      for (const key of this._current.keys()) o[key] = this._current.get(key);
      return o;
    }
  
    /** Dump to string, for debugging */
    toString() {
      return JSON.stringify(this);
    }
  }
  
  export const features = new FeatureFlagService(defaults);
  export default features;
  // expose to devtools
  Object.assign(window, { features });
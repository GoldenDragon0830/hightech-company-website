import '@testing-library/jest-dom/vitest';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
afterEach(() => { cleanup(); vi.restoreAllMocks(); });
Object.defineProperty(window, 'matchMedia', { writable: true, value: vi.fn().mockImplementation((query: string) => ({
  matches: false, media: query, onchange: null, addListener: vi.fn(), removeListener: vi.fn(),
  addEventListener: vi.fn(), removeEventListener: vi.fn(), dispatchEvent: vi.fn(),
})) });
Object.defineProperty(window, 'scrollTo', { writable: true, value: vi.fn() });
class TestObserver {
  observe = vi.fn(); unobserve = vi.fn(); disconnect = vi.fn();
}
vi.stubGlobal('IntersectionObserver', TestObserver);
vi.stubGlobal('ResizeObserver', TestObserver);
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', { writable: true, value: vi.fn(() => null) });

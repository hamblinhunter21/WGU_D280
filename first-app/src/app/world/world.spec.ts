import { describe, it, expect, beforeEach, vi } from 'vitest';
import { World } from './world';
import { WorldBankService } from '../services/world-bank';
import { of, throwError } from 'rxjs';

describe('World Component', () => {
  let component: World;
  let worldBankService: WorldBankService;

  beforeEach(() => {
    worldBankService = {
      getCountryData: vi.fn()
    } as unknown as WorldBankService;
    
    component = new World(worldBankService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle errors gracefully', async () => {
    const error = new Error('Network error');
    (worldBankService.getCountryData as any).mockReturnValue(throwError(() => error));

    component.loadCountry('INVALID');

    await new Promise(resolve => setTimeout(resolve, 20));
    
    expect(component.countryData).toBeNull();
    expect(component.error).toBe('Network error');
    expect(component.isLoading).toBe(false);
  });

  it('should clean up event listeners on destroy', () => {
    const mockElement1 = document.createElement('div');
    const mockElement2 = document.createElement('div');
    const listener1 = () => {};
    const listener2 = () => {};
    
    (component as any).eventListeners = [
      { element: mockElement1, event: 'click', listener: listener1 },
      { element: mockElement2, event: 'mouseover', listener: listener2 }
    ];

    const spy1 = vi.spyOn(mockElement1, 'removeEventListener');
    const spy2 = vi.spyOn(mockElement2, 'removeEventListener');

    component.ngOnDestroy();

    expect(spy1).toHaveBeenCalledWith('click', listener1);
    expect(spy2).toHaveBeenCalledWith('mouseover', listener2);
    expect((component as any).eventListeners.length).toBe(0);
  });
});


  it('should handle errors gracefully', (done) => {
    const error = new Error('Network error');
    worldBankService.getCountryData.and.returnValue(throwError(() => error));

    component.loadCountry('INVALID');

    setTimeout(() => {
      expect(component.countryData).toBeNull();
      expect(component.error).toBe('Network error');
      expect(component.isLoading).toBe(false);
      done();
    }, 10);
  });

  it('should clean up event listeners on destroy', () => {
    component.eventListeners = [
      { element: document.createElement('div'), event: 'click', listener: () => {} },
      { element: document.createElement('div'), event: 'mouseover', listener: () => {} }
    ];

    spyOn(component.eventListeners[0].element, 'removeEventListener');
    spyOn(component.eventListeners[1].element, 'removeEventListener');

    component.ngOnDestroy();

    expect(component.eventListeners[0].element.removeEventListener).toHaveBeenCalled();
    expect(component.eventListeners[1].element.removeEventListener).toHaveBeenCalled();
    expect(component.eventListeners.length).toBe(0);
  });
});

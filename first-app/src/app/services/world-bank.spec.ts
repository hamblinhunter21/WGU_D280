import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorldBankService } from './world-bank';
import { CountryResponse } from '../models/country';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('WorldBankService', () => {
  let service: WorldBankService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WorldBankService]
    });
    service = TestBed.inject(WorldBankService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch country data and extract correct response', async () => {
    const mockCountryData: CountryResponse = {
      id: 'US',
      name: 'United States',
      capitalCity: 'Washington',
      region: { value: 'North America' },
      incomeLevel: { value: 'High income' },
      latitude: '37.0902',
      longitude: '-95.7129'
    };

    const mockResponse = [{ page: 1 }, [mockCountryData]];

   let resultData: CountryResponse | undefined;
    
    service.getCountryData('US').subscribe({
      next: (data) => {
        resultData = data;
      }
    });

    const req = httpMock.expectOne(req => req.url.includes('/country/US'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    
    expect(resultData?.name).toBe('United States');
    expect(resultData?.capitalCity).toBe('Washington');
  });

  it('should handle error response gracefully', async () => {
    let errorMessage: string | undefined;
    
    service.getCountryData('INVALID').subscribe({
      next: () => {
        expect.fail('should have failed');
      },
      error: (error) => {
        errorMessage = error.message;
      }
    });

    const req = httpMock.expectOne(req => req.url.includes('/country/INVALID'));
    req.flush(null);
    
    expect(errorMessage).toContain('Failed to load country data');
  });
});
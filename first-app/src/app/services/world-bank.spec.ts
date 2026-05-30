import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorldBankService } from './world-bank';
import { CountryResponse } from '../models/country';

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

  it('should fetch country data and extract correct response', (done) => {
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

    service.getCountryData('US').subscribe({
      next: (data) => {
        expect(data.name).toBe('United States');
        expect(data.capitalCity).toBe('Washington');
        done();
      }
    });

    const req = httpMock.expectOne(req => req.url.includes('/country/US'));
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error response gracefully', (done) => {
    service.getCountryData('INVALID').subscribe({
      next: () => fail('should have failed'),
      error: (error) => {
        expect(error.message).toContain('Failed to load country data');
        done();
      }
    });

    const req = httpMock.expectOne(req => req.url.includes('/country/INVALID'));
    req.flush(null);
  });
});
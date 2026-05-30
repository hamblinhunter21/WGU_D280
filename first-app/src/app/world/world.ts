import {
  Component,
  AfterViewInit,
  OnDestroy
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { WorldBankService } from '../services/world-bank';
import { CountryResponse } from '../models/country';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.html',
  styleUrls: ['./world.css']
})
export class World implements AfterViewInit, OnDestroy {

  countryData: CountryResponse | null = null;
  isLoading = false;
  error: string | null = null;
  private eventListeners: Array<{ element: Element; event: string; listener: EventListener }> = [];

  constructor(
    private worldBankService: WorldBankService
  ) {}

  ngAfterViewInit(): void {
    const svgObject = document.getElementById('svgMap') as HTMLObjectElement;

    if (!svgObject) return;

    const handleSvgLoad = () => {
      const svgDoc = svgObject.contentDocument;

      if (!svgDoc) return;

      const countries = svgDoc.querySelectorAll('path');

      countries.forEach((country: Element) => {
        const handleMouseOver = () => {
          (country as HTMLElement).classList.add('hovered');
        };

        const handleMouseOut = () => {
          (country as HTMLElement).classList.remove('hovered');
        };

        const handleClick = () => {
          const countryCode = country.id;
          if (countryCode) {
            this.loadCountry(countryCode);
          }
        };

        country.addEventListener('mouseover', handleMouseOver);
        country.addEventListener('mouseout', handleMouseOut);
        country.addEventListener('click', handleClick);
        (country as HTMLElement).setAttribute('tabindex', '0');
        (country as HTMLElement).setAttribute('role', 'button');
        (country as HTMLElement).setAttribute('aria-label', `Click to view ${country.id} data`);

        this.eventListeners.push(
          { element: country, event: 'mouseover', listener: handleMouseOver },
          { element: country, event: 'mouseout', listener: handleMouseOut },
          { element: country, event: 'click', listener: handleClick }
        );
      });
    };

    svgObject.addEventListener('load', handleSvgLoad);
    this.eventListeners.push({ element: svgObject, event: 'load', listener: handleSvgLoad });
  }

  loadCountry(code: string): void {
    this.isLoading = true;
    this.error = null;

    this.worldBankService.getCountryData(code).subscribe({
      next: (data: CountryResponse) => {
        this.countryData = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = err.message || 'Failed to load country data';
        this.countryData = null;
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(): void {
    this.eventListeners.forEach(({ element, event, listener }) => {
      element.removeEventListener(event, listener);
    });
    this.eventListeners = [];
  }

}
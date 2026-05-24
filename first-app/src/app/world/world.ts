import {
  Component,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { WorldBankService } from '../services/world-bank';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements AfterViewInit {

  countryData: any;

  constructor(
    private worldBankService: WorldBankService
  ) {}

  ngAfterViewInit(): void {

    const svgObject =
      document.getElementById('svgMap') as HTMLObjectElement;

    svgObject.addEventListener('load', () => {

      const svgDoc = svgObject.contentDocument;

      if (!svgDoc) return;

      const countries = svgDoc.querySelectorAll('path');

      countries.forEach((country: Element) => {

        country.addEventListener('mouseover', () => {
          (country as HTMLElement).style.fill = 'orange';
        });

        country.addEventListener('mouseout', () => {
          (country as HTMLElement).style.fill = '';
        });

        country.addEventListener('click', () => {

          const countryCode = country.id;

          if (countryCode) {
            this.loadCountry(countryCode);
          }

        });

      });

    });

  }

  loadCountry(code: string): void {

    this.worldBankService
      .getCountryData(code)
      .subscribe((response: any) => {

        this.countryData = response[1][0];

      });

  }

}
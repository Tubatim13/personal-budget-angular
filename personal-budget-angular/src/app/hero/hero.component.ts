import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'pb-hero',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent { }


import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SkillsCarousel } from '../../shared/components/skills-carousel/skills-carousel';

@Component({
  selector: 'app-home',
  imports: [RouterLink, SkillsCarousel],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

import { Component } from '@angular/core';
import { RouterModule, ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pb-breadcrumbs',
  standalone: true,
  imports: [RouterModule, CommonModule], // ✅ Ensure RouterModule is imported
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  breadcrumbs: { label: string, url: string }[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateBreadcrumbs();
      }
    });
  }

  updateBreadcrumbs() {
    const breadcrumbs: { label: string, url: string }[] = [];
    let currentRoute = this.route.root;
    let url = '';

    while (currentRoute.children.length > 0) {
      const child = currentRoute.children[0];
      const routeConfig = child.routeConfig;

      if (routeConfig?.path) {
        url += `/${routeConfig.path}`;
        breadcrumbs.push({ label: this.formatLabel(routeConfig.path), url });
      }

      currentRoute = child;
    }

    this.breadcrumbs = breadcrumbs;
  }

  formatLabel(path: string): string {
    return path.charAt(0).toUpperCase() + path.slice(1); // Capitalize first letter
  }
}


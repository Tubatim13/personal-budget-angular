import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { DataService } from '../services/data.service';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { ArticleComponent } from '../article/article.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'pb-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  imports: [CommonModule, ArticleComponent, BreadcrumbsComponent],
})
export class HomepageComponent implements OnInit, AfterViewInit {
  public dataSource: {
    datasets: { data: number[]; backgroundColor: string[] }[];
    labels: string[];
  } = {
    datasets: [
      {
        data: [],
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
      }
    ],
    labels: [] // ✅ Explicitly set type as `string[]`
  };


  @ViewChild('myChartCanvas', { static: false }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private dataService: DataService,
    @Inject(PLATFORM_ID) private platformId: object,
    private cdr: ChangeDetectorRef
  ) {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    console.log("📡 HomepageComponent Initialized!");

    this.dataService.budgetData$.subscribe(budgetItems => {
      console.log("🔥 Received Budget Data in Component:", budgetItems);

      if (!budgetItems || budgetItems.length === 0) {
        console.warn("⚠️ No budget data available. Please check your API connection.");
        return;
      }

      this.dataSource.datasets[0].data = budgetItems.map(item => item.budget);
      this.dataSource.labels = budgetItems.map(item => item.title as string);

      console.log("✅ DataSource Updated:", JSON.stringify(this.dataSource, null, 2));

      this.cdr.detectChanges(); // Ensure UI updates

      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          console.log("📊 Calling createChart() AFTER delay...");
          this.createChart();
        }
      }, 500);
    });

    this.dataService.fetchBudgetData().subscribe();
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      console.log("🔍 ngAfterViewInit - Checking if canvas exists:", this.chartCanvas);
    }
  }

  createChart() {
    if (isPlatformBrowser(this.platformId)) {
      console.log("📊 Initializing Chart.js...");

      if (!this.chartCanvas) {
        console.error("❌ Chart canvas NOT FOUND in ViewChild! Ensure #myChartCanvas exists.");
        return;
      } else {
        console.log("✅ Found Canvas Element in ViewChild:", this.chartCanvas);
      }

      const ctx = this.chartCanvas.nativeElement.getContext('2d');
      console.log("🎨 Checking canvas context:", ctx);

      if (!ctx) {
        console.error('❌ Unable to get canvas context! The canvas may be hidden or not loaded.');
        return;
      }

      console.log("📈 Creating new Chart.js instance...");
      try {
        new Chart(ctx, {
          type: 'pie',
          data: this.dataSource,
          options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1000 }
          }
        });

        console.log("✅ Chart successfully created!");
      } catch (error) {
        console.error("❌ Chart creation failed:", error);
      }
    }
  }

}

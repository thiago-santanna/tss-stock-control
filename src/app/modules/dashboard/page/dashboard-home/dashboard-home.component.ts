import { MessageService } from 'primeng/api';
import { ProductsService } from './../../../../services/products/products.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IGetAllProductsResponse } from 'src/app/models/interfaces/products/respponse/IGetAllProductsResponse';
import { ProducDataTrnasferService } from 'src/app/shared/services/products/produc-data-trnasfer.service';
import { Subject, takeUntil } from 'rxjs';
import { ChartData, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: [],
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  constructor(
    private productsService: ProductsService,
    private messaService: MessageService,
    private productsDataTrnasferService: ProducDataTrnasferService
  ) {}

  ngOnInit(): void {
    this.getProductsDatas();
  }

  public productsList: Array<IGetAllProductsResponse> = [];
  public productsChartDatas!: ChartData;
  public productsChartOptions!: ChartOptions;
  private destroy$ = new Subject<void>();

  getProductsDatas() {
    this.productsService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.productsList = response;
          this.productsDataTrnasferService.setProductsDatas(this.productsList);
          this.setProductsChartConfig();
        },
        error: (error) => {
          this.messaService.add({
            severity: 'error',
            summary: 'Erro ao carregar produtos',
            detail: error.message,
            life: 2000,
          });
        },
      });
  }

  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue(
        '--text-color-secondary'
      );
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.productsChartDatas = {
        labels: this.productsList.map((element) => element?.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor:
              documentStyle.getPropertyValue('--indigo-500'),
            data: this.productsList.map((element) => element?.amount),
          },
        ],
      };

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },

        scales: {
          x: {
            ticks: {
              color: textColorSecondary,
              font: {
                weight: '500',
              },
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textColorSecondary,
            },
            grid: {
              color: surfaceBorder,
            },
          },
        },
      };
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

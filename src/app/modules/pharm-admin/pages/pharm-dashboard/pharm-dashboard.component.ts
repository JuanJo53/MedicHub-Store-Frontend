import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label, MultiDataSet } from "ng2-charts";
import { TokenService } from "src/app/core/authentication/token.service";
import { SaleService } from "src/app/core/http/pharm-admin/sale.service";
@Component({
  selector: "app-pharm-dashboard",
  templateUrl: "./pharm-dashboard.component.html",
  styleUrls: ["./pharm-dashboard.component.scss"],
})
export class PharmDashboardComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: "top",
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
  };
  public pieChartLabels: Label[] = [
    ["Download", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    ["In", "Store", "Sales"],
    "Mail Sales",
  ];
  public pieChartData: number[] = [
    300, 500, 100, 500, 500, 200, 600, 10, 80, 60, 30,
  ];
  public pieChartType: ChartType = "pie";
  public pieChartLegend = true;

  //line|bar
  public salesChartData: ChartDataSets[];
  public salesChartLabels: Label[];
  public lineChartOptions: ChartOptions & { annotation: any } = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: "y-axis-0",
          position: "left",
        },
      ],
    },
    annotation: {
      annotations: [
        {
          type: "line",
          mode: "vertical",
          scaleID: "x-axis-0",
          value: "March",
          borderColor: "orange",
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: "orange",
            content: "LineAnno",
          },
        },
      ],
    },
  };

  public lineChartLegend = true;

  subsiId: number;

  dateRange: FormGroup;
  startDate: string;
  endDate: string;

  salesData: number[];
  salesDataResponse: any[];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;

  constructor(
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    try {
      this.subsiId = parseInt(this.tokenService.getSubsidiaryId());
      if (this.subsiId) {
        this.fetchSalesData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  fetchSalesData() {
    this.salesDataResponse = [];
    this.salesData = [];
    this.salesChartLabels = [];
    this.saleService.getSaleGraph(this.subsiId).subscribe((data) => {
      this.salesDataResponse = data;
      console.log(this.salesDataResponse);
      this.salesDataResponse.forEach((element) => {
        this.salesData.push(element.count);
        this.salesChartLabels.push(
          this.datePipe.transform(element.date, "dd-MM-yyyy")
        );
      });
      this.salesChartData = [
        { data: this.salesData, label: "Ventas" },
        { data: this.salesData, label: "Pedidos" },
      ];
    });
  }

  public chartClicked({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: MouseEvent;
    active: {}[];
  }): void {
    console.log(event, active);
  }

  public hideOne(): void {
    const isHidden = this.chart.isDatasetHidden(1);
    this.chart.hideDataset(1, !isHidden);
  }
}

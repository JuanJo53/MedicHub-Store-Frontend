import { Product } from "src/app/shared/models/product";
import { DatePipe } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { SaleService } from "src/app/core/http/pharm-admin/sale.service";
import {
  MatDialog,
  MatPaginator,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import { Color, BaseChartDirective, Label, MultiDataSet } from "ng2-charts";
import { TokenService } from "src/app/core/authentication/token.service";
import { PharmOrderService } from "src/app/core/http/pharm-admin/pharmOrder.service";
import { OrderProductsComponent } from "src/app/modules/client/components/dialogs/order-products/order-products.component";
import { Order } from "src/app/shared/models/order";
import { FileService } from "src/app/core/services/file.service";
import { DomSanitizer } from "@angular/platform-browser";

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
  ordersData: number[];
  salesDataResponse: any[];

  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;
  //Table
  products: Product[] = [];

  isLoadingResults = true;
  isRateLimitReached = false;

  length = 1;
  size = 18;
  order = "id";
  asc = true;
  actualPage = 0;

  dataSource = new MatTableDataSource();
  displayedColumns: string[] = [
    "id_sale",
    "Product",
    "Gain",
    "Stock",
    "Quantity",
    "More",
  ];

  salesDataSource = new MatTableDataSource();
  salesColumns: string[] = ["Date", "Quantity", "Gains"];

  stats: any;

  typeOrder: any;
  filter: any;
  filterType: any;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(
    private datePipe: DatePipe,
    private tokenService: TokenService,
    private saleService: SaleService,
    private fileService: FileService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private orderService: PharmOrderService
  ) {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();

    this.dateRange = new FormGroup({
      start: new FormControl(new Date(2020, 5, 1)),
      end: new FormControl(new Date(year, month, 30)),
    });
  }

  ngOnInit(): void {
    try {
      this.subsiId = parseInt(this.tokenService.getSubsidiaryId());
      if (this.subsiId) {
        this.getDateRange();
        this.fetchStats();
        this.fetchSalesData();
        this.typeOrder = "2";
        this.fecthOrders(this.length);
      }
    } catch (error) {
      console.error(error);
    }
  }
  getDateRange() {
    const startDate = this.dateRange.get("start").value;
    const endDate = this.dateRange.get("end").value;
    const date = new Date(endDate);
    date.setDate(date.getDate() + 1);
    this.startDate = this.datePipe.transform(startDate, "yyyy-MM-dd");
    this.endDate = this.datePipe.transform(date, "yyyy-MM-dd");
  }
  fetchStats() {
    this.saleService.getStats(this.subsiId).subscribe((data) => {
      this.stats = data;
      console.log(this.stats);
    });
  }
  fetchSalesData() {
    this.salesDataResponse = [];
    this.salesData = [];
    this.ordersData = [];
    this.salesChartLabels = [];
    this.saleService.getSaleGraph(this.subsiId).subscribe((data) => {
      this.salesDataResponse = data;
      this.salesDataSource = new MatTableDataSource(this.salesDataResponse);
      this.dataSource.sort = this.sort;
      this.saleService.getOrderGraph(this.subsiId).subscribe((data) => {
        data.forEach((element) => {
          this.ordersData.push(element.count);
        });
      });
      this.salesDataResponse.forEach((element) => {
        this.salesData.push(element.count);
        this.salesChartLabels.push(
          this.datePipe.transform(element.date, "dd-MM-yyyy")
        );
      });
      this.salesChartData = [
        { data: this.salesData, label: "Ventas" },
        { data: this.ordersData, label: "Pedidos" },
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

  //MatTableDataSource
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fecthOrders(page: number): void {
    this.orderService
      .getSubsidiaryOrdersBI(
        this.subsiId,
        page,
        this.size,
        parseInt(this.typeOrder),
        this.filter,
        this.filterType
      )
      .subscribe((products) => {
        this.products = products;
        console.log(products);
        this.products.forEach((item) => {
          if (item.picture != "null") {
            this.fileService.getProductPic(item.picture).subscribe((result) => {
              let objectURL = URL.createObjectURL(result);
              item.picture = this.sanitizer.bypassSecurityTrustUrl(objectURL);
            });
          }
        });
        this.length = products[0].size;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        this.isLoadingResults = false;
      });

    console.log(
      this.subsiId,
      page,
      this.size,
      parseInt(this.typeOrder),
      this.filter,
      this.filterType
    );
  }

  refreshOrders(event) {
    this.actualPage = event.pageIndex;
    this.fecthOrders(event.pageIndex + 1);
  }
  productsView(products: any) {
    this.dialog.open(OrderProductsComponent, {
      width: "2050px",
      data: {
        products: products,
      },
    });
  }
}

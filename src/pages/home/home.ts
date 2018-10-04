import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {ExportDataProvider} from '../../providers/export-data/export-data';
import {ExportFormat} from '../../model/export-format';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  data: [object];
  exportFormat: ExportFormat = ExportFormat.comma;
  exportFormatType = ExportFormat;

  constructor(public navCtrl: NavController, public exportDataProvider: ExportDataProvider) {
    this.data = [{
      Tower: "A",
      Flat: "101",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "A",
      Flat: "201",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "B",
      Flat: "301",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "C",
      Flat: "101",
      Month: "November",
      Year: "2017"
    }, {
      Tower: "D",
      Flat: "401",
      Month: "November",
      Year: "2017"
    }];
  }

  OnExport() {
    this.exportDataProvider.export2CSV(this.data, this.exportFormat, 'exportData.csv');
  }

}

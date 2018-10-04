import { Injectable } from '@angular/core';

/*
  Generated class for the ExportDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ExportDataProvider {

  constructor() {
    console.log('Hello ExportDataProvider Provider');
  }

  public export2CSV(data: any[], columnDelimiter: string, filename: string): void {
    const result = this.convertDataToCSV(data, columnDelimiter);
    this.downloadCSV(result, filename);
  }

  private convertDataToCSV(data: any[], columnDelimiter: string = ','): string {

    const lineDelimiter = '\n';
    let fields: string[] = [];
    for (const key in data[0]) {
      if ('object' === typeof data[0][key]) {
        const subFields: string[] = Object.keys(data[0][key]).map((k) => key + '.' + k);
        fields = fields.concat(subFields);
      } else {
        fields.push(key);
      }
    }
    let result = '';
    result += fields.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      let ctr = 0;
      fields.forEach(function (key) {
        if (ctr > 0) {
          result += columnDelimiter;
        }
        if (item[key]) {
          result += item[key];
        } else {
          const subKeys: string[] = key.split('.');
          result += item[subKeys[0]][subKeys[1]];
        }
        ctr++;
      });
      result += lineDelimiter;
    });
    return result;
  }

  private downloadCSV(result: string, filename: string = 'export.csv'): void {

    if (!result.match(/^data:text\/csv/i)) {
      result = 'data:text/csv;charset=utf-8,' + result;
    }
    const data: string = encodeURI(result);

    const link: HTMLElement = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    link.click();
  }

}

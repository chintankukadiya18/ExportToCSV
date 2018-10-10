import {Injectable} from '@angular/core';
import {File} from '@ionic-native/file';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {normalizeURL} from "ionic-angular";

@Injectable()
export class ExportDataProvider {
    
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
        let blob = new Blob([result], {type: 'application/pdf'});

        let options: any = {
            location: 'yes',//Or 'no'
            hidden: 'no', //Or  'yes'
            clearcache: 'yes',
            clearsessioncache: 'yes',
            zoom: 'yes',//Android only ,shows browser zoom controls
            hardwareback: 'yes',
            mediaPlaybackRequiresUserAction: 'no',
            shouldPauseOnSuspend: 'no', //Android only
            closebuttoncaption: 'Close', //iOS only
            disallowoverscroll: 'no', //iOS only
            toolbar: 'yes', //iOS only
            enableViewportScale: 'no', //iOS only
            allowInlineMediaPlayback: 'no',//iOS only
            presentationstyle: 'pagesheet',//iOS only
            fullscreen: 'yes',//Windows only
        };
        this.file.writeFile(this.file.externalRootDirectory + "Download", filename, blob, {
            replace: true
        }).then((entity) => {
            alert("file created at: " + JSON.stringify(entity));
            alert(entity.nativeURL);
           // window.open(encodeURI(entity.nativeURL), '_blank', 'location=yes');
            const browser = this.iab.create(encodeURI(entity.nativeURL), '_blank', options);
             browser.show();
        }).catch((error) => {
            alert("error creating file at :" + JSON.stringify(error));
        });
        /*const data: string = encodeURI(result);
        const link: HTMLElement = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();*/
    }

}

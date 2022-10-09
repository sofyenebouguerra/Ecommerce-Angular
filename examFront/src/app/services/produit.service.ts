import { ParametreService } from './parametre.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators, NgForm }
  from '@angular/forms';;
import { Product } from '../models/product.model';


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private baseUrl = 'http://localhost:8086/product';
  parametre: any = {};
  host: string = 'http://localhost:8086/product';
  choixmenu: string = 'A';
  list: Product[];
  public dataForm: FormGroup;
  constructor(private http: HttpClient,private parametreService:ParametreService) { }
  getData(productId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/GetOne/${productId}`);
  }


  getNumero(code: string) {
    return this.http.get(`${this.baseUrl}/7/${code}`);
  }
 /* getListArtf(code: number) {
    return this.http.get(`${this.baseUrl}/f/${code}`);
  }*/
  createData(formData: FormData): Observable<any> {

    return this.http.post(`${this.baseUrl}/prodIma`, formData);
  }

  createDataToCateg(formData: FormData, idCategory: number): Observable<any> {

    return this.http.post(`${this.baseUrl}/addProductToCategory/${idCategory}`, formData);
  }


  updatedata( value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/UpdatePro`, value);
  }
  editProduct(product: Product, productId: number): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8086/product/editProduct/${productId}`, product);
  }

  deleteData(productId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/DelPro/${productId}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}/GetAll`);
  }


  uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);
    const req = new HttpRequest('POST', '<Server URL of the file upload>', formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  exportToPdf(){
    alert("ok pdf service");
  return this.http.get(`${this.baseUrl}/Jasper/report`,{responseType: 'text'});
  }

  getExcelData(){
    return this.http.get<any>(`${this.baseUrl}/products/export/excel`, { responseType: 'arraybuffer' as 'json' });
  }
 


  onselectParametre(id: number) {
    this.parametreService.getData(id).subscribe(
      response => {
        this.parametre = response;
        console.log(response);
      }
    )
  }
  getDocument() {

    this.onselectParametre(2);
    this.getAll().subscribe(
      response => {
        
        this.list = response;
      }
    );
    
    return {
      pageSize : 'A4',
      pageOrientation : 'landscape',
      footer: function (currentPage, pageCount) {
        return {
            table: {
                body: [
                    [
                      //  { image: 'sampleImage.jpg', alignment: 'center', fit: [400, 400] },
                        { text: "Page " + currentPage.toString() + ' of ' + pageCount, alignment: 'center', style: 'normalText', margin: [400, 20, 50, 0] }
                    ],
                ]
            },
            layout: 'noBorders'
        };
    },
      content: [
        {
          columns: [
            [{
              text: this.parametre.libelle,
              style: 'name'
            },
            {
              text: this.parametre.adresse,
              style: 'line'
            },
            {
              text: 'Email : ' + this.parametre.email,
              style: 'line'
            },
            {
              text: 'Tel  : ' + this.parametre.tel,
              style: 'line',
            },
            ],
          ]
        },
        {
          text: 'Liste Des Produits',
          bold: true,
          fontSize: 20,
          alignment: 'center',
          margin: [0, 0, 0, 20]
        },

             this.getList(this.list),
             {
     
             },


        {
          text: 'Signature',
          style: 'sign',
          alignment: 'right'

        },

       

      ],

      styles: {
        header: {
          fontSize: 18,
          bold: true,

          decoration: 'underline'
        },
        name: {
          fontSize: 16,
          bold: true
        },

        ligne: {
          fontSize: 12,
          bold: true,
          italics: true
        },
        sign: {
          margin: [0, 50, 0, 10],
          alignment: 'right',
          italics: true
        },
        tableHeader: {
          bold: true,
          fontSize: 15,
          alignment: 'center'
        }
      }
    };
  }


  getList(items: Product[]) {
    return {
      table: {
        widths: [100, 200, 70, 70, 60, 200],
        body: [
          [{
            text: 'Id',
            style: 'tableHeader'
          },
          {
            text: 'Product Name',
            style: 'tableHeader'
          },
          {
            text: 'Product Description',
            style: 'tableHeader'
          },
          {
            text: 'Product DiscountPrice',
            style: 'tableHeader'
          },
          {
            text: 'Product ActualPrice',
            style: 'tableHeader'
          }
          ],
         ...items.map(ed => {
            return [ed.productId, ed.productName, ed.productDescription, ed.productDiscountPrice, ed.productActualPrice];
          })
        ]
      }
    };
  }
}






import { FormGroup } from '@angular/forms';
import { Product } from 'src/app/models/product.model';

import { Injectable } from '@angular/core';
import baseUrl from './helper';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParametreService } from './parametre.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8086/product';
  parametre: any = {};
  host: string = 'http://localhost:8086/product';
  choixmenu: string = 'A';
  list: Product[];
  public dataForm: FormGroup;
 

  constructor(private http: HttpClient,private parametreService:ParametreService) { }
  public addProduct(product:FormData){
    return this.http.post<Product>(`${baseUrl}/product/`,product);
  }
  public getAllProducts(){
    return this.http.get<Product[]>(`${baseUrl}/product/GetAll`)
  }
  public getProductDetailsById (productId:any){
    return this.http.get<Product>(`${baseUrl}/product/GetOne/`+productId);
  }

  public deleteProductM(productId:number){
    return this.http.delete(`${baseUrl}/product/DelPro/`+productId);
  }


  addProductToCategory(product: Product, idCategory: number): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8086/product/addProductToCategory/${idCategory}`, product);
  }

  editProduct(product: Product, id: number): Observable<Product> {
    return this.http.put<Product>(`http://localhost:8086/product/editProduct/${id}`, product);
  }

  deleteProduct(productId: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8086/product/deleteProduct/${productId}`);
  }

  findProductById(productId: number): Observable<Product> {
    return this.http.get<Product>(`http://localhost:8086/product/findProductById/${productId}`);
  }

  findAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8086/product/findAllProducts`);
  }

  findProductsForCategory(idCategory: number): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8086/product/findProductsForCategory/${idCategory}`);
  }
  deleteProductFromTag(idProduct: number, idTag: number): Observable<Product> {
    return this.http.delete<Product>(`http://localhost:8086/product/deleteProductFromTag/${idProduct}/${idTag}`);
  }
  findByName(name: string): Observable<Product[]> {
    return this.http.get<Product[]>(`http://localhost:8086/product/findByName/${name}`);
  }


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

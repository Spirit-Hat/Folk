import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertTips} from "../../../../service/alertTips";
import {ProductDTO, STATUS} from "../../../../interface/product";
import {ActivatedRoute} from "@angular/router";
import {API} from "../../../../service/api/API";

export enum EProductStatus {
  AVAILABLE = 'В наявності',
  IN_STORAGE = 'На складі',
  EXPECTED = 'Очікується',
  NOT_AVAILABLE = 'Немає',
}

export interface CatalogDTO {
  name: string;
  id: number;
}

@Component({
  selector: 'fc-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  public alertErrors = new AlertTips();
  public item!: ProductDTO;
  public window = window;
  public mainForm: FormGroup | any
  public files: string[] = [];

  public selectedStatus = EProductStatus;
  public categoryList!: CatalogDTO | any;

  constructor(
    private route: ActivatedRoute,
    private api: API
  ) {
  }

  getProductStatus(): { key: string; value: string }[] {
    return Object.keys(EProductStatus).map((key) => ({
      key: key,
      // @ts-ignore
      value: this.selectedStatus[key]
    }))
  }

  ngOnInit(): void {

    this.api.getAllCategories().subscribe(categories => {
      this.categoryList = categories;
      console.log(categories);
    });

    this.mainForm = new FormGroup({
      'product-name': new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      'amount': new FormControl(null, [
        Validators.required,
        Validators.pattern('^([1-9][0-9]{0,2})$')
      ]),
      'description': new FormControl(null),
      'price': new FormControl(null, [
        Validators.required,
        Validators.pattern('^\\d+(.\\d{1,2})?$'),
        Validators.maxLength(10)
      ]),

      'file': new FormControl(null, [Validators.required]),
      'status': new FormControl(null, [Validators.required]),
      'category': new FormControl(null, [Validators.required]),
    })

    this.mainForm.get('file').value = new Array<string>(10);

    // localStorage.getItem('add-product')?  this.mainForm.setValue(JSON.parse(<string>localStorage.getItem('add-product'))):''

    this.route.params.subscribe(params => {
      localStorage.setItem('add-product', JSON.stringify(this.mainForm.getRawValue()))
    });
  }

  uploadImg(files: string[]) {
    this.file.value = files;
    console.log(this.file.value)
  }

  get name() {
    return this.mainForm.get('product-name');
  }
  get price() {
    return this.mainForm.get('price');
  }
  get amount() {
    return this.mainForm.get('amount');
  }
  get description() {
    return this.mainForm.get('description');
  }
  get status() {
    return this.mainForm.get('status');
  }
  get category() {
    return this.mainForm.get('category');
  }
  get file() {
    return this.mainForm.get('file')
  }

  addNewProduct() {
    if (this.mainForm.invalid) return
    const productJSON = {
      file: this.file.value.filter((item: string | null) => item != null),
      product: {
        name: this.name.value,
        description: this.description.value,
        amount: this.amount.value,
        price: this.price.value,
      },
      category: this.category.value ? this.category.value : 1,
      status: this.status.value ? this.status.value : 'AVAILABLE',
    }
    this.api.sendProduct(productJSON).subscribe({
      error: error => console.log(error),
      next: () => {console.log('success');}
    })
    this.clearData();
  }

  buildTestItemProduct(): ProductDTO {
    const isFilledWithNull = this.file.value.every((value: string) => value === null);

    return {
      id: 0,
      name: this.name.value ? this.name.value : "Product Name",
      previewImage: !isFilledWithNull ? this.file.value[0] : 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png',
      price: this.price.value ? this.price.value : 0,
      image: [],
      status: this.status.value ? this.status.value : STATUS.AVAILABLE
    }
  }

  saveData() {
    localStorage.setItem('add-product', JSON.stringify(this.mainForm.getRawValue()))
  }

  clearData() {
    localStorage.removeItem('add-product')
    this.mainForm.reset()
    this.file.value = new Array<string>(10);
  }

  getImgFiles(): Array<string> {
    return this.file.value ? this.file.value : new Array<string>(10);
  }
}

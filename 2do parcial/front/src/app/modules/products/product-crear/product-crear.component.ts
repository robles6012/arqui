import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators,FormBuilder} from "@angular/forms";
import {MessageErrorsDirective} from "@app/shared/directives/field-errors/directive/message-errors.directive";
import {RouterLink} from "@angular/router";
import {NgSelectModule} from "@ng-select/ng-select";
import {AlertService} from "@app/core/services/alert.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductsService} from "@app/modules/products/services/products.service";
import {TrimDirective} from "@app/shared/directives/trim.directive";
import {InputMaskDirective} from "@app/shared/directives/input-mask/input-mask.directive";
import {LoadingService} from "@app/core/services/loading.service";
import {Observable} from "rxjs";
import {IMAGE_lOGO_EXTENSIONS} from "@app/core/utils/consts";

@Component({
  selector: 'app-product-edit',
  standalone: true,
  imports: [
    FormsModule,
    MessageErrorsDirective,
    ReactiveFormsModule,
    RouterLink,
    NgSelectModule,
    TrimDirective,
    InputMaskDirective
  ],
  templateUrl: './product-crear.component.html',
  styleUrl: './product-crear.component.scss'
})
export class ProductCrearComponent implements OnInit {

  productForm: FormGroup = new FormGroup({});
  screen: number = 1;
  data: any;

  constructor(
    private _alert: AlertService,
    private _product: ProductsService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private _dialog: MatDialogRef<ProductCrearComponent>,
    private _loading: LoadingService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.dialogData) {
      this.data = this.dialogData;
      this.setDataProduct(this.data);
    }
  }

  initForm(): void {
    this.productForm = this.fb.group({
      Id: [{ value: this.data ? this.data.id_producto : '', disabled: true }],
      nombre: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      detalle: ['', [Validators.required, Validators.maxLength(500), Validators.minLength(3)]],
      valor: ['', [Validators.required]],
    });
  }

  setDataProduct(productData: any): void {
    this.productForm.patchValue({
      Id: productData.id_producto,
      nombre: productData.nombre,
      detalle: productData.detalle,
      valor: productData.valor
    });
  }

  sendDataRegisterProduct(): void {
    if (this.productForm.valid) {
      // this._loading.show();
      const dataProduct = this.productForm.value;
      this._product.saveProduct(dataProduct).subscribe({
        next: () => {
          this.productForm.reset();
          this._alert.success('Producto registrado exitosamente');
          this._dialog.close(true);
          // this._loading.hide();
        },
        error: (error) => {
          this._alert.error(error.error.message || "Hubo un problema al registrar el producto.");
          this._loading.hide();
        }
      });
    }
  }


  changeScreen(screen: number) {
    if (this.productForm.valid) {
      // Lógica para cambiar la pantalla si es necesario
    } else {
      this.productForm.markAllAsTouched();
      this._alert.warning('Debes completar todos los campos');
    }
  }
}

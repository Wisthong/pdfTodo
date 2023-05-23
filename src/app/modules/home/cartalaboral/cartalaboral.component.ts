import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { Vendedor } from 'src/app/model/vendedores.interface';

@Component({
  selector: 'app-cartalaboral',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cartalaboral.component.html',
  styleUrls: ['./cartalaboral.component.css'],
})
export class CartalaboralComponent {
  $vendedor!: Vendedor;
  id?: string;

  date: any;

  private readonly vendedoresSvc = inject(VendedoresService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    let fecha = new Date();
    this.date = fecha;
    // console.log(this.date);

    this.id = this.route.snapshot.paramMap.get('id')!;

    if (this.id !== null) {
      this.vendedoresSvc.getOne(this.id!).subscribe(
        (resOk) => {
          this.$vendedor = resOk;
          console.log(resOk);
        },
        (resFail) => {
          console.log(resFail);
        }
      );
    }
  }

  onDownloadPDF() {
    // Extraemos el
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3,
    };
    html2canvas(document.querySelector('#asDiv')!, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        // Add image Canvas to PDF
        const bufferX = 15;
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );
        return doc;
      })
      .then((docResult) => {
        docResult.save(`${new Date().toISOString()}_cartalaboral.pdf`);
      });
  }
}

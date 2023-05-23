import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Vendedores } from 'src/app/model/vendedores.interface';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { VendedoresService } from 'src/app/services/vendedores.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-vendedores',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.css'],
})
export class VendedoresComponent {
  $listVendedores: Vendedores[] = [];
  private readonly vendedoresSvc = inject(VendedoresService);

  ngOnInit(): void {
    this.vendedoresSvc.getAll().subscribe((resOk) => {
      this.$listVendedores = resOk;
    });
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
        docResult.save(`${new Date().toISOString()}_tutorial.pdf`);
      });
  }
}

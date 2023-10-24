"use client"
import React from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ReportGenerator = () => {
  const generatePDF = () => {
    const documentDefinition = {
      content: [
        {
          text: 'Informe de Cotización',
          style: 'header',
        },
        {
          text: 'Proveedor: Proveedor de Prueba',
          style: 'subheader',
        },
        {
          text: 'Fecha: 5 de septiembre de 2023',
          style: 'subheader',
        },
        {
          text: 'Detalles de Cotización',
          style: 'subheader',
          margin: [0, 20, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto'],
            body: [
              ['Producto', 'Precio Unitario', 'Cantidad'],
              ['Producto 1', '$100', '2'],
              ['Producto 2', '$75', '3'],
              ['Producto 3', '$50', '1'],
            ],
          },
        },
        {
          text: 'Resumen de Cotización',
          style: 'subheader',
          margin: [0, 20, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ['*', 'auto'],
            body: [
              ['Subtotal', '$325'],
              ['Descuento', '-$25'],
              ['Total', '$300'],
            ],
          },
        },
        {
          text: 'Información Adicional',
          style: 'subheader',
          margin: [0, 20, 0, 10],
        },
        {
          ul: [
            'Valor total del inventario: $1000',
            'Valor promedio del inventario: $333.33',
            'Ganancia bruta: $100',
            'Inventario inicial: $1000',
            'Inventario final: $900',
            'Ventas totales durante el período: $200',
          ],
        },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
          alignment: 'center',
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
      },
    };

    const pdfDoc = pdfMake.createPdf(documentDefinition);

    pdfDoc.download('informe_cotizacion.pdf');
  };

  return (
    <div className='justify-items-center'>
      <button className='flex p-1 right-4' onClick={generatePDF}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
          />
        </svg>
        
      <h2  className='flex-grow '>Generar Informe </h2>
      </button>
    </div>
  );
};

export default ReportGenerator;
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const generateInvoicePDF = async (order: any) => {
  const doc = new jsPDF();

  // Helper to load image
  const loadImage = (url: string): Promise<HTMLImageElement | null> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = url;
    });
  };

  // --- Header Section ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.setTextColor(228, 31, 102); // #E41F66
  doc.text('VivahStore', 14, 22);

  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  doc.text('TAX INVOICE', 196, 22, { align: 'right' });
  
  // Header line
  doc.setDrawColor(230, 230, 230);
  doc.line(14, 28, 196, 28);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Order ID: #${order._id}`, 14, 36);
  
  const orderDateFormatted = order.createdAt ? new Date(order.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';
  doc.text(`Date: ${orderDateFormatted}`, 196, 36, { align: 'right' });

  // --- Billing / Shipping Section ---
  // Draw soft background box for shipping
  doc.setFillColor(249, 250, 251); // tailwind stone-50
  doc.setDrawColor(229, 231, 235); // tailwind stone-200
  doc.roundedRect(14, 42, 182, 38, 3, 3, 'FD');

  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(40, 40, 40);
  doc.text('Billed To / Shipped To:', 20, 50);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(70, 70, 70);
  let currentY = 56;

  if (order.shippingAddress) {
    const addr = order.shippingAddress;
    doc.setFont("helvetica", "bold");
    doc.text(`${addr.firstName} ${addr.lastName}`, 20, currentY);
    doc.setFont("helvetica", "normal");
    
    currentY += 5;
    if (addr.company) {
      doc.text(addr.company, 20, currentY);
      currentY += 5;
    }
    doc.text(addr.address, 20, currentY);
    currentY += 5;
    if (addr.apartment) {
      doc.text(addr.apartment, 20, currentY);
      currentY += 5;
    }
    doc.text(`${addr.city}, ${addr.country} - ${addr.postalCode}`, 20, currentY);
    currentY += 5;
    doc.text(`Phone: ${addr.phone}`, 20, currentY);
  } else {
    doc.text('No shipping address recorded.', 20, currentY);
  }

  // --- Items Table ---
  currentY = 88;

  const tableColumn = ["Item Description", "Qty", "Unit Price", "Total"];
  const tableRows: any[] = [];
  const preloadedImages: { [key: number]: HTMLImageElement | null } = {};

  if (order.items) {
    await Promise.all(
      order.items.map(async (item: any, index: number) => {
        if (item.uploadedImage) {
          const img = await loadImage(item.uploadedImage);
          preloadedImages[index] = img;
        }
      })
    );
  }

  order.items?.forEach((item: any, index: number) => {
    let description = `${item.name}`;
    
    if (item.selectedVariant) {
      const variantName = typeof item.selectedVariant === 'string' 
        ? item.selectedVariant 
        : (item.selectedVariant.name || item.selectedVariant.title || 'Default');
      description += `\nVariant: ${variantName}`;
    }

    if (item.customizations) {
      Object.entries(item.customizations).forEach(([k, v]) => {
        const keyFormatted = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        description += `\n${keyFormatted}: ${v}`;
      });
    }

    if (item.uploadedImage && preloadedImages[index]) {
      description += `\nUploaded Image:\n\n\n\n\n\n\n`; 
    } else if (item.uploadedImage) {
      description += `\n(Custom Image Uploaded - Failed to load)`;
    }

    const price = `Rs ${item.price?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`;
    const total = `Rs ${(item.price * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

    tableRows.push([description, item.quantity, price, total]);
  });

  autoTable(doc, {
    startY: currentY,
    head: [tableColumn],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [228, 31, 102], textColor: 255, fontStyle: 'bold' },
    bodyStyles: { textColor: 50 },
    alternateRowStyles: { fillColor: [252, 252, 252] },
    styles: { fontSize: 9.5, cellPadding: 6, lineColor: [230, 230, 230], lineWidth: 0.1 },
    columnStyles: {
      0: { cellWidth: 100 },
      1: { cellWidth: 20, halign: 'center' },
      2: { cellWidth: 32, halign: 'right' },
      3: { cellWidth: 32, halign: 'right' }
    },
    didDrawCell: (data) => {
      if (data.column.index === 0 && data.cell.section === 'body') {
        const rowIndex = data.row.index;
        const img = preloadedImages[rowIndex];
        if (img) {
          const imgWidth = 26;
          const imgHeight = 26;
          const imgX = data.cell.x + 6;
          const imgY = data.cell.y + data.cell.height - imgHeight - 6;
          
          doc.addImage(img, 'JPEG', imgX, imgY, imgWidth, imgHeight);
          
          // Draw subtle border around image
          doc.setDrawColor(200, 200, 200);
          doc.setLineWidth(0.2);
          doc.rect(imgX, imgY, imgWidth, imgHeight);
        }
      }
    }
  });

  // --- Summary Section ---
  const finalY = (doc as any).lastAutoTable.finalY + 12;
  
  doc.setFontSize(10);
  doc.setTextColor(80, 80, 80);
  
  doc.text('Subtotal:', 140, finalY);
  doc.text(`Rs ${order.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 196, finalY, { align: 'right' });

  doc.text('Shipping:', 140, finalY + 7);
  doc.text('Free', 196, finalY + 7, { align: 'right' });

  doc.text('Tax (GST):', 140, finalY + 14);
  doc.text('Included', 196, finalY + 14, { align: 'right' });

  // Thick line before total
  doc.setDrawColor(228, 31, 102); // Theme color
  doc.setLineWidth(0.5);
  doc.line(140, finalY + 20, 196, finalY + 20);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(40, 40, 40);
  doc.text('Total:', 140, finalY + 28);
  doc.setTextColor(228, 31, 102);
  doc.text(`Rs ${order.totalAmount?.toLocaleString(undefined, { minimumFractionDigits: 2 })}`, 196, finalY + 28, { align: 'right' });

  // --- Footer Section ---
  const footerY = finalY + 50 > 270 ? 270 : finalY + 50; 
  
  // Footer separator
  doc.setDrawColor(230, 230, 230);
  doc.setLineWidth(0.2);
  doc.line(14, footerY - 6, 196, footerY - 6);

  doc.setFontSize(9);
  doc.setTextColor(120, 120, 120);
  doc.setFont("helvetica", "normal");
  
  const paymentMethodStr = order.paymentMethod === 'cod' ? 'Cash On Delivery' : 'Online Payment';
  doc.text(`Payment Method: ${paymentMethodStr}  |  Status: ${order.paymentStatus || 'Pending'}`, 14, footerY);
  
  doc.setFont("helvetica", "italic");
  doc.text('Thank you for shopping with VivahStore!', 196, footerY, { align: 'right' });

  doc.save(`Invoice_${order._id}.pdf`);
};

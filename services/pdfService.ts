
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePdf = async (element: HTMLElement, filename: string): Promise<void> => {
  // Temporarily increase scale for better resolution, then revert.
  const originalTransform = element.style.transform;
  const originalWidth = element.style.width;
  const originalHeight = element.style.height;

  // html2canvas capture
  const canvas = await html2canvas(element, {
    scale: 2, // Increase scale for better quality
    useCORS: true, // If you have external images
    logging: false, // Disable logging for cleaner console
    width: element.scrollWidth, // Use scrollWidth for full content width
    height: element.scrollHeight, // Use scrollHeight for full content height
    windowWidth: element.scrollWidth, // Ensure window context matches content
    windowHeight: element.scrollHeight, // Ensure window context matches content
  });
  
  // Revert styles
  element.style.transform = originalTransform;
  element.style.width = originalWidth;
  element.style.height = originalHeight;

  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'pt', // points
    format: 'a4', // A4 paper size
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  
  const imgProps = pdf.getImageProperties(imgData);
  const imgWidth = imgProps.width;
  const imgHeight = imgProps.height;

  // Calculate the aspect ratio
  const ratio = imgWidth / imgHeight;
  
  // Define page margins (in points)
  const pageMargin = 20; // 20pt margin on all sides

  // Calculate available content area
  const contentAreaWidth = pdfWidth - (2 * pageMargin);
  const contentAreaHeight = pdfHeight - (2 * pageMargin);

  let newImgWidth, newImgHeight;

  // Scale image to fit within contentAreaWidth while maintaining aspect ratio
  newImgWidth = contentAreaWidth;
  newImgHeight = newImgWidth / ratio;

  // If scaled height exceeds contentAreaHeight, then scale by height instead
  if (newImgHeight > contentAreaHeight) {
    newImgHeight = contentAreaHeight;
    newImgWidth = newImgHeight * ratio;
  }
  
  // Calculate x and y coordinates to center the image on the page
  const x = (pdfWidth - newImgWidth) / 2;
  const y = (pdfHeight - newImgHeight) / 2;

  pdf.addImage(imgData, 'PNG', x, y, newImgWidth, newImgHeight);
  pdf.save(filename);
};

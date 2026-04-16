const PDFDocument = require('pdfkit');
const fs = require('fs');

const doc = new PDFDocument({ margin: 50, size: 'A4' });

// Output stream directly to public folder
const writeStream = fs.createWriteStream('./public/Sony_WH-1000XM6_Specs.pdf');
doc.pipe(writeStream);

// Define colors to match brand
const bgBlack = '#050505';
const textLight = '#FFFFFF';
const textMuted = '#999999';
const accentPrimary = '#0050FF';
const accentSecondary = '#00D6FF';

// Add solid dark background
doc.rect(0, 0, doc.page.width, doc.page.height).fill(bgBlack);

// Header section
doc.fillColor(accentPrimary)
   .fontSize(10)
   .text('TECHNICAL DETAILS', { tracking: 4, oblique: true, align: 'center' });

doc.moveDown(0.5);

doc.fillColor(textLight)
   .fontSize(24)
   .font('Helvetica-Bold')
   .text('WH-1000XM6 SPECIFICATIONS', { align: 'center' });

doc.moveDown(1);
doc.strokeColor(accentSecondary).lineWidth(1)
   .moveTo(100, doc.y)
   .lineTo(doc.page.width - 100, doc.y)
   .stroke();

doc.moveDown(2);

// Function to draw glassmorphism-style card (dark grey with accent border)
function drawSpecCategory(title, items) {
  // Check if we need to add a page (prevent splitting a category)
  if (doc.y > doc.page.height - 150) {
    doc.addPage();
    doc.rect(0, 0, doc.page.width, doc.page.height).fill(bgBlack);
    doc.y = 50;
  }

  const startY = doc.y;
  
  // Title
  doc.fillColor(accentSecondary)
     .fontSize(16)
     .font('Helvetica-Bold')
     .text(title.toUpperCase(), 70, startY);

  doc.moveDown(0.5);

  const rectStartY = doc.y;
  const rectHeight = (items.length * 25) + 30; // approx height

  // Background box for category (mimicking glass card)
  doc.rect(60, rectStartY, doc.page.width - 120, rectHeight)
     .fillOpacity(0.05)
     .fill(textLight);
     
  doc.rect(60, rectStartY, doc.page.width - 120, rectHeight)
     .fillOpacity(1)
     .lineWidth(0.5)
     .strokeColor('#222222')
     .stroke();

  // Draw items
  let itemY = rectStartY + 15;
  
  items.forEach((item, index) => {
    // Label
    doc.fillColor(textMuted)
       .fontSize(11)
       .font('Helvetica')
       .text(item.label, 80, itemY);
       
    // Value
    doc.fillColor(textLight)
       .fontSize(11)
       .font('Helvetica-Bold')
       .text(item.value, 250, itemY, { width: doc.page.width - 350 });

    if (index < items.length - 1) {
      doc.lineWidth(0.5)
         .strokeColor('#222222')
         .moveTo(80, itemY + 20)
         .lineTo(doc.page.width - 80, itemY + 20)
         .stroke();
    }
    itemY += 25;
  });

  doc.y = rectStartY + rectHeight + 25;
}

// Data
const specs = [
  {
    title: "Sound Architecture",
    items: [
      { label: "Driver Unit", value: "30mm (Specially designed Carbon Fiber)" },
      { label: "Frequency Response", value: "4Hz - 40,000Hz (LDAC 96kHz 990kbps)" },
      { label: "Impedance", value: "48 ohms (1kHz) via cable" }
    ]
  },
  {
    title: "Noise Cancelling",
    items: [
      { label: "Processor", value: "QN3 Noise Cancelling Processor" },
      { label: "Sensors", value: "8 Microphones (Spatial Array System)" },
      { label: "Adaptive Sound", value: "Real-time AI Environment Detection" }
    ]
  },
  {
    title: "Wireless & Bluetooth",
    items: [
      { label: "Bluetooth Version", value: "Version 5.3" },
      { label: "Frequency Range", value: "2.4GHz band (2.4000GHz-2.4835GHz)" },
      { label: "Supported Formats", value: "SBC, AAC, LDAC, Hi-Res Wireless" }
    ]
  },
  {
    title: "Power & Battery",
    items: [
      { label: "Continuous Playback", value: "Max. 30 hrs (NC ON) / 40 hrs (NC OFF)" },
      { label: "Rapid Charging", value: "3 minutes = 3 hours playback" },
      { label: "Charge Terminal", value: "USB Type-C" }
    ]
  },
  {
    title: "Physical Design",
    items: [
      { label: "Weight", value: "Approx. 250g (8.82 oz)" },
      { label: "Structure", value: "Swivel mechanism / Stepless slider" },
      { label: "Contact Pad Data", value: "Soft-fit synthetic leather" }
    ]
  }
];

specs.forEach(cat => drawSpecCategory(cat.title, cat.items));

// Footer
doc.moveDown(2);
doc.fillColor(textMuted)
   .fontSize(9)
   .font('Helvetica')
   .text('© Sony Corporation. Proprietary & Confidential Specifications.', { align: 'center' });

doc.end();

writeStream.on('finish', () => {
    console.log('PDF Generation Complete!');
});

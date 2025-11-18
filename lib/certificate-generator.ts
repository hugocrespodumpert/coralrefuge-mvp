import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';

export interface CertificateData {
  certificateId: string;
  sponsorName: string;
  mpaName: string;
  mpaLocation: string;
  hectares: number;
  amount: number;
  date: string;
  validUntil: string;
  // Optional gift fields
  isGift?: boolean;
  giftRecipientName?: string;
  purchaserName?: string;
  giftMessage?: string;
}

/**
 * Generates a beautiful PDF certificate for coral reef sponsorship
 */
export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4 size in points
  const { width, height } = page.getSize();

  // Embed fonts
  const timesRomanBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman);
  const timesRomanItalic = await pdfDoc.embedFont(StandardFonts.TimesRomanItalic);
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Color scheme - Ocean blues
  const darkBlue = rgb(0, 0.122, 0.247); // #001F3F
  const oceanBlue = rgb(0, 0.455, 0.851); // #0074D9
  const lightBlue = rgb(0.235, 0.765, 0.675); // #3BCEAC
  const darkGray = rgb(0.2, 0.2, 0.2);
  const lightGray = rgb(0.4, 0.4, 0.4);

  // ----- HEADER SECTION -----

  // Draw decorative border
  const margin = 30;
  const borderWidth = 3;

  // Outer border (dark blue)
  page.drawRectangle({
    x: margin,
    y: margin,
    width: width - 2 * margin,
    height: height - 2 * margin,
    borderColor: darkBlue,
    borderWidth: borderWidth,
  });

  // Inner decorative line (light blue)
  page.drawRectangle({
    x: margin + 8,
    y: margin + 8,
    width: width - 2 * margin - 16,
    height: height - 2 * margin - 16,
    borderColor: lightBlue,
    borderWidth: 1,
  });

  // Draw header background (gradient effect with rectangles)
  const headerHeight = 120;
  const headerY = height - margin - headerHeight;

  page.drawRectangle({
    x: margin + 15,
    y: headerY,
    width: width - 2 * margin - 30,
    height: headerHeight,
    color: rgb(0.95, 0.97, 0.99),
    borderColor: oceanBlue,
    borderWidth: 1,
  });

  // Title
  const titleText = 'CERTIFICATE OF OCEAN GUARDIANSHIP';
  const titleSize = 24;
  page.drawText(titleText, {
    x: width / 2 - (timesRomanBold.widthOfTextAtSize(titleText, titleSize) / 2),
    y: headerY + 75,
    size: titleSize,
    font: timesRomanBold,
    color: darkBlue,
  });

  // Subtitle
  const subtitleText = 'Climate-Resilient Coral Reef Protection';
  const subtitleSize = 14;
  page.drawText(subtitleText, {
    x: width / 2 - (timesRomanItalic.widthOfTextAtSize(subtitleText, subtitleSize) / 2),
    y: headerY + 45,
    size: subtitleSize,
    font: timesRomanItalic,
    color: oceanBlue,
  });

  // Coral emoji/symbol alternative
  const coralText = '🪸';
  page.drawText(coralText, {
    x: width / 2 - 15,
    y: headerY + 15,
    size: 30,
  });

  // ----- MAIN CONTENT SECTION -----

  let currentY = headerY - 50;

  // 🎁 GIFT BANNER (if it's a gift)
  if (data.isGift && data.purchaserName && data.giftRecipientName) {
    const giftBannerHeight = 60;
    const giftBannerWidth = width - 2 * margin - 80;
    const giftBannerX = width / 2 - giftBannerWidth / 2;
    const giftBannerY = currentY - giftBannerHeight;

    // Draw gift banner box
    page.drawRectangle({
      x: giftBannerX,
      y: giftBannerY,
      width: giftBannerWidth,
      height: giftBannerHeight,
      color: rgb(0.941, 0.976, 1), // Very light blue
      borderColor: lightBlue,
      borderWidth: 2,
    });

    // Gift icon and text
    const giftText1 = '🎁 A Gift From';
    const giftText2 = data.purchaserName;
    const giftText3 = `to ${data.giftRecipientName}`;

    page.drawText(giftText1, {
      x: width / 2 - (helveticaBold.widthOfTextAtSize(giftText1, 11) / 2),
      y: giftBannerY + 40,
      size: 11,
      font: helveticaBold,
      color: oceanBlue,
    });

    page.drawText(giftText2, {
      x: width / 2 - (timesRomanBold.widthOfTextAtSize(giftText2, 13) / 2),
      y: giftBannerY + 23,
      size: 13,
      font: timesRomanBold,
      color: darkBlue,
    });

    page.drawText(giftText3, {
      x: width / 2 - (timesRomanItalic.widthOfTextAtSize(giftText3, 11) / 2),
      y: giftBannerY + 8,
      size: 11,
      font: timesRomanItalic,
      color: lightGray,
    });

    currentY = giftBannerY - 30;
  }

  // "This certifies that" text
  const certifiesText = 'This certifies that';
  page.drawText(certifiesText, {
    x: width / 2 - (timesRoman.widthOfTextAtSize(certifiesText, 14) / 2),
    y: currentY,
    size: 14,
    font: timesRoman,
    color: darkGray,
  });

  currentY -= 40;

  // Sponsor name (large and prominent)
  const sponsorNameSize = 28;
  const sponsorNameWidth = timesRomanBold.widthOfTextAtSize(data.sponsorName, sponsorNameSize);
  page.drawText(data.sponsorName, {
    x: width / 2 - sponsorNameWidth / 2,
    y: currentY,
    size: sponsorNameSize,
    font: timesRomanBold,
    color: oceanBlue,
  });

  // Underline for sponsor name
  page.drawLine({
    start: { x: width / 2 - sponsorNameWidth / 2 - 10, y: currentY - 5 },
    end: { x: width / 2 + sponsorNameWidth / 2 + 10, y: currentY - 5 },
    thickness: 2,
    color: lightBlue,
  });

  currentY -= 50;

  // Main description
  const descLine1 = `has protected ${data.hectares} hectare${data.hectares > 1 ? 's' : ''} of climate-resilient coral reefs in`;
  page.drawText(descLine1, {
    x: width / 2 - (timesRoman.widthOfTextAtSize(descLine1, 13) / 2),
    y: currentY,
    size: 13,
    font: timesRoman,
    color: darkGray,
  });

  currentY -= 35;

  // MPA Name (prominent)
  const mpaNameSize = 20;
  page.drawText(data.mpaName, {
    x: width / 2 - (timesRomanBold.widthOfTextAtSize(data.mpaName, mpaNameSize) / 2),
    y: currentY,
    size: mpaNameSize,
    font: timesRomanBold,
    color: darkBlue,
  });

  currentY -= 25;

  // MPA Location
  page.drawText(data.mpaLocation, {
    x: width / 2 - (timesRomanItalic.widthOfTextAtSize(data.mpaLocation, 12) / 2),
    y: currentY,
    size: 12,
    font: timesRomanItalic,
    color: lightGray,
  });

  currentY -= 50;

  // ----- DETAILS BOX -----

  const boxWidth = 450;
  const boxHeight = 140;
  const boxX = width / 2 - boxWidth / 2;
  const boxY = currentY - boxHeight;

  // Draw details box
  page.drawRectangle({
    x: boxX,
    y: boxY,
    width: boxWidth,
    height: boxHeight,
    color: rgb(0.97, 0.99, 1),
    borderColor: oceanBlue,
    borderWidth: 1.5,
  });

  // Details content
  let detailY = boxY + boxHeight - 25;
  const detailX = boxX + 30;
  const labelSize = 10;
  const valueSize = 11;

  // Row 1: Certificate ID and Area Protected
  page.drawText('Certificate ID:', {
    x: detailX,
    y: detailY,
    size: labelSize,
    font: helvetica,
    color: lightGray,
  });
  page.drawText(data.certificateId, {
    x: detailX + 90,
    y: detailY,
    size: valueSize,
    font: helveticaBold,
    color: darkBlue,
  });

  page.drawText('Area Protected:', {
    x: detailX + 250,
    y: detailY,
    size: labelSize,
    font: helvetica,
    color: lightGray,
  });
  page.drawText(`${data.hectares} hectare${data.hectares > 1 ? 's' : ''}`, {
    x: detailX + 250 + 90,
    y: detailY,
    size: valueSize,
    font: helveticaBold,
    color: darkBlue,
  });

  detailY -= 25;

  // Row 2: Issue Date and Valid Until
  page.drawText('Issue Date:', {
    x: detailX,
    y: detailY,
    size: labelSize,
    font: helvetica,
    color: lightGray,
  });
  page.drawText(data.date, {
    x: detailX + 90,
    y: detailY,
    size: valueSize,
    font: helveticaBold,
    color: darkBlue,
  });

  page.drawText('Valid Until:', {
    x: detailX + 250,
    y: detailY,
    size: labelSize,
    font: helvetica,
    color: lightGray,
  });
  page.drawText(data.validUntil, {
    x: detailX + 250 + 90,
    y: detailY,
    size: valueSize,
    font: helveticaBold,
    color: darkBlue,
  });

  detailY -= 25;

  // Row 3: Contribution
  page.drawText('Contribution:', {
    x: detailX,
    y: detailY,
    size: labelSize,
    font: helvetica,
    color: lightGray,
  });
  page.drawText(`$${data.amount} USD`, {
    x: detailX + 90,
    y: detailY,
    size: valueSize,
    font: helveticaBold,
    color: darkBlue,
  });

  detailY -= 30;

  // Impact statement
  const impactText = 'Your contribution funds ranger patrols, biodiversity monitoring,';
  const impactText2 = 'waste removal, and community education programs.';
  page.drawText(impactText, {
    x: detailX,
    y: detailY,
    size: 9,
    font: timesRomanItalic,
    color: lightGray,
  });
  page.drawText(impactText2, {
    x: detailX,
    y: detailY - 12,
    size: 9,
    font: timesRomanItalic,
    color: lightGray,
  });

  // ----- GIFT MESSAGE BOX (if it's a gift with a message) -----

  if (data.isGift && data.giftMessage) {
    currentY = boxY - 30;

    const msgBoxWidth = 450;
    const msgBoxHeight = 80;
    const msgBoxX = width / 2 - msgBoxWidth / 2;
    const msgBoxY = currentY - msgBoxHeight;

    // Draw gift message box
    page.drawRectangle({
      x: msgBoxX,
      y: msgBoxY,
      width: msgBoxWidth,
      height: msgBoxHeight,
      color: rgb(1, 0.973, 0.929), // Very light orange/amber
      borderColor: rgb(0.957, 0.62, 0.043), // Amber border
      borderWidth: 2,
    });

    // Message label
    let msgY = msgBoxY + msgBoxHeight - 20;
    page.drawText('💌 Personal Message:', {
      x: msgBoxX + 20,
      y: msgY,
      size: 10,
      font: helveticaBold,
      color: rgb(0.573, 0.251, 0.055), // Dark amber
    });

    // Message text (word wrap for long messages)
    msgY -= 18;
    const messageLines = wrapText(data.giftMessage, 65); // ~65 chars per line
    messageLines.forEach((line) => {
      page.drawText(`"${line}"`, {
        x: msgBoxX + 20,
        y: msgY,
        size: 9,
        font: timesRomanItalic,
        color: rgb(0.471, 0.204, 0.004), // Darker amber
      });
      msgY -= 12;
    });

    currentY = msgBoxY - 20;
  }

  // ----- QR CODE SECTION -----

  currentY = currentY || boxY - 40;

  // Generate QR code
  const registryUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://coralrefuge.vercel.app'}/registry?id=${data.certificateId}`;
  const qrCodeDataUrl = await QRCode.toDataURL(registryUrl, {
    width: 100,
    margin: 1,
    color: {
      dark: '#001F3F',
      light: '#FFFFFF',
    },
  });

  // Embed QR code
  const qrCodeImage = await pdfDoc.embedPng(qrCodeDataUrl);
  const qrSize = 80;

  page.drawImage(qrCodeImage, {
    x: width / 2 - qrSize / 2,
    y: currentY - qrSize - 10,
    width: qrSize,
    height: qrSize,
  });

  // QR code label
  const qrLabel = 'Verify in Public Registry';
  page.drawText(qrLabel, {
    x: width / 2 - (helvetica.widthOfTextAtSize(qrLabel, 9) / 2),
    y: currentY - qrSize - 25,
    size: 9,
    font: helvetica,
    color: lightGray,
  });

  // ----- FOOTER SECTION -----

  const footerY = margin + 50;

  // Signature line
  page.drawLine({
    start: { x: width / 2 - 100, y: footerY + 20 },
    end: { x: width / 2 + 100, y: footerY + 20 },
    thickness: 1,
    color: darkGray,
  });

  // Signature title
  const signatureText = 'Coral Refuge Team';
  page.drawText(signatureText, {
    x: width / 2 - (helvetica.widthOfTextAtSize(signatureText, 10) / 2),
    y: footerY + 5,
    size: 10,
    font: helvetica,
    color: darkGray,
  });

  // Bottom text
  const bottomText = 'Built with science. Driven by purpose.';
  page.drawText(bottomText, {
    x: width / 2 - (timesRomanItalic.widthOfTextAtSize(bottomText, 10) / 2),
    y: footerY - 15,
    size: 10,
    font: timesRomanItalic,
    color: lightGray,
  });

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();
  return Buffer.from(pdfBytes);
}

/**
 * Helper function to wrap text at a specified character limit
 */
function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  words.forEach((word) => {
    const testLine = currentLine ? `${currentLine} ${word}` : word;
    if (testLine.length <= maxCharsPerLine) {
      currentLine = testLine;
    } else {
      if (currentLine) lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines;
}

/**
 * Helper function to format dates for certificate
 */
export function formatCertificateDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Generate certificate ID in format: MPA-YEAR-XXXXX
 */
export function generateCertificateId(mpaId: string, sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const mpaPrefix = mpaId.replace('-', '').substring(0, 3).toUpperCase();
  const paddedNumber = sequenceNumber.toString().padStart(5, '0');
  return `${mpaPrefix}-${year}-${paddedNumber}`;
}

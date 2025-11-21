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
 * Sanitizes text for PDF generation by removing emojis and special Unicode characters
 * that are not supported by WinAnsi encoding
 */
function sanitizeForPDF(text: string): string {
  return text
    // Remove emojis (emoticons, symbols, pictographs, etc.)
    // Using a comprehensive emoji regex pattern compatible with ES5
    .replace(/[\u2600-\u26FF]/g, '')   // Miscellaneous symbols
    .replace(/[\u2700-\u27BF]/g, '')   // Dingbats
    .replace(/[\uD800-\uDFFF]/g, '')   // Surrogate pairs (covers most emojis)
    .replace(/[\u2300-\u23FF]/g, '')   // Miscellaneous technical
    .replace(/[\uFE00-\uFEFF]/g, '')   // Variation selectors
    .replace(/[\u{1F000}-\u{1F9FF}]/gu, '') // Emoticons and symbols (ES6 Unicode escapes)
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, '') // Symbols and pictographs
    .replace(/[\u{1F600}-\u{1F64F}]/gu, '') // Emoticons
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, '') // Transport and map symbols
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, '') // Supplemental symbols
    // Normalize and remove combining marks
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Trim any extra whitespace
    .trim();
}

/**
 * Generates a beautiful PDF certificate for coral reef sponsorship
 */
export async function generateCertificate(data: CertificateData): Promise<Buffer> {
  // Sanitize all text fields to remove emojis and special Unicode characters
  // that are not supported by WinAnsi encoding
  const sanitizedData: CertificateData = {
    ...data,
    sponsorName: sanitizeForPDF(data.sponsorName),
    mpaName: sanitizeForPDF(data.mpaName),
    mpaLocation: sanitizeForPDF(data.mpaLocation),
    giftRecipientName: data.giftRecipientName ? sanitizeForPDF(data.giftRecipientName) : undefined,
    purchaserName: data.purchaserName ? sanitizeForPDF(data.purchaserName) : undefined,
    giftMessage: data.giftMessage ? sanitizeForPDF(data.giftMessage) : undefined,
  };

  // Use sanitized data for all subsequent operations
  const certificateData = sanitizedData;

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
  const titleText = 'CERTIFICATE OF OCEAN SPONSORSHIP';
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

  // Removed coral emoji to fix WinAnsi encoding issues

  // ----- MAIN CONTENT SECTION -----

  let currentY = headerY - 50;

  // 🎁 GIFT BANNER (if it's a gift)
  if (certificateData.isGift && certificateData.purchaserName && certificateData.giftRecipientName) {
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

    // Gift banner text (emoji removed for WinAnsi compatibility)
    const giftText1 = 'A Gift From';
    const giftText2 = certificateData.purchaserName;
    const giftText3 = `to ${certificateData.giftRecipientName}`;

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
  const sponsorNameWidth = timesRomanBold.widthOfTextAtSize(certificateData.sponsorName, sponsorNameSize);
  page.drawText(certificateData.sponsorName, {
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
  const descLine1 = `has protected ${certificateData.hectares} hectare${certificateData.hectares > 1 ? 's' : ''} of climate-resilient coral reefs in`;
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
  page.drawText(certificateData.mpaName, {
    x: width / 2 - (timesRomanBold.widthOfTextAtSize(certificateData.mpaName, mpaNameSize) / 2),
    y: currentY,
    size: mpaNameSize,
    font: timesRomanBold,
    color: darkBlue,
  });

  currentY -= 25;

  // MPA Location
  page.drawText(certificateData.mpaLocation, {
    x: width / 2 - (timesRomanItalic.widthOfTextAtSize(certificateData.mpaLocation, 12) / 2),
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
  page.drawText(certificateData.certificateId, {
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
  page.drawText(`${certificateData.hectares} hectare${certificateData.hectares > 1 ? 's' : ''}`, {
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
  page.drawText(certificateData.date, {
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
  page.drawText(certificateData.validUntil, {
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
  page.drawText(`$${certificateData.amount} USD`, {
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

  if (certificateData.isGift && certificateData.giftMessage) {
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

    // Message label (emoji removed for WinAnsi compatibility)
    let msgY = msgBoxY + msgBoxHeight - 20;
    page.drawText('Personal Message:', {
      x: msgBoxX + 20,
      y: msgY,
      size: 10,
      font: helveticaBold,
      color: rgb(0.573, 0.251, 0.055), // Dark amber
    });

    // Message text (word wrap for long messages)
    msgY -= 18;
    const messageLines = wrapText(certificateData.giftMessage, 65); // ~65 chars per line
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
  const registryUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://wildreefs.com'}/registry?id=${certificateData.certificateId}`;
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
  const signatureText = 'Wild Reefs Team';
  page.drawText(signatureText, {
    x: width / 2 - (helvetica.widthOfTextAtSize(signatureText, 10) / 2),
    y: footerY + 5,
    size: 10,
    font: helvetica,
    color: darkGray,
  });

  // Bottom text
  const bottomText = 'Keep Reefs Wild';
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
 * Generate certificate ID in format: WR-MPA-YEAR-XXXXX
 */
export function generateCertificateId(mpaId: string, sequenceNumber: number): string {
  const year = new Date().getFullYear();
  const mpaPrefix = mpaId.replace('-', '').substring(0, 3).toUpperCase();
  const paddedNumber = sequenceNumber.toString().padStart(5, '0');
  return `WR-${mpaPrefix}-${year}-${paddedNumber}`;
}

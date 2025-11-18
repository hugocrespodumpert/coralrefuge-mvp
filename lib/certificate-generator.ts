import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
  Image,
} from '@react-pdf/renderer';
import { CertificateData } from '@/types';
import QRCode from 'qrcode';

// Define styles for the certificate
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  header: {
    textAlign: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0369a1',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 20,
  },
  decorativeLine: {
    height: 3,
    backgroundColor: '#0ea5e9',
    marginBottom: 30,
  },
  mainContent: {
    marginTop: 40,
    marginBottom: 40,
    padding: 30,
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
  },
  certificationText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 1.6,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0369a1',
    textAlign: 'center',
    marginBottom: 20,
    textDecoration: 'underline',
  },
  detailsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
    fontSize: 12,
  },
  detailLabel: {
    fontWeight: 'bold',
    width: 140,
    color: '#475569',
  },
  detailValue: {
    flex: 1,
    color: '#1e293b',
  },
  footer: {
    marginTop: 40,
    paddingTop: 20,
    borderTop: 2,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 10,
    color: '#64748b',
  },
  qrContainer: {
    width: 80,
    height: 80,
  },
  qrCode: {
    width: 80,
    height: 80,
  },
  impactSection: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ecfeff',
    borderRadius: 8,
  },
  impactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0369a1',
    marginBottom: 10,
  },
  impactItem: {
    fontSize: 11,
    marginBottom: 8,
    color: '#164e63',
    lineHeight: 1.5,
  },
  certificateId: {
    fontSize: 10,
    color: '#94a3b8',
    marginTop: 10,
    textAlign: 'center',
  },
});

// Certificate Document Component
const CertificateDocument = ({
  data,
  qrCodeDataUrl,
}: {
  data: CertificateData;
  qrCodeDataUrl: string;
}) => {
  const coralCount = data.hectares * 220;
  const formatDate = new Date(data.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>
            CERTIFICATE OF CORAL REFUGE PROTECTION
          </Text>
          <Text style={styles.subtitle}>
            Marine Protected Area Conservation Program
          </Text>
        </View>

        <View style={styles.decorativeLine} />

        {/* Main Content */}
        <View style={styles.mainContent}>
          <Text style={styles.certificationText}>
            This certifies that
          </Text>

          <Text style={styles.nameText}>{data.recipientName}</Text>

          <Text style={styles.certificationText}>
            has protected {data.hectares} hectare{data.hectares !== 1 ? 's' : ''} of critical coral
            habitat in
          </Text>

          <Text style={styles.certificationText}>
            <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#0369a1' }}>
              {data.mpaName}
            </Text>
            , {data.location}
          </Text>

          {/* Details */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>GPS Coordinates:</Text>
              <Text style={styles.detailValue}>
                {data.coordinates.lat.toFixed(6)}°N, {data.coordinates.lon.toFixed(6)}°E
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Protected Area:</Text>
              <Text style={styles.detailValue}>
                {data.hectares} hectare{data.hectares !== 1 ? 's' : ''} (
                {(data.hectares * 10000).toLocaleString()} m²)
              </Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date of Protection:</Text>
              <Text style={styles.detailValue}>{formatDate}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Managed By:</Text>
              <Text style={styles.detailValue}>{data.managedBy}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Certificate ID:</Text>
              <Text style={styles.detailValue}>{data.certificateId}</Text>
            </View>
          </View>

          {/* Impact Section */}
          <View style={styles.impactSection}>
            <Text style={styles.impactTitle}>Your Conservation Impact:</Text>
            <Text style={styles.impactItem}>
              • Approximately {coralCount.toLocaleString()} coral colonies under active protection
            </Text>
            <Text style={styles.impactItem}>
              • Critical habitat for 1,000+ fish and marine species
            </Text>
            <Text style={styles.impactItem}>
              • Direct funding for patrol operations and enforcement
            </Text>
            <Text style={styles.impactItem}>
              • Contributing to global coral reef resilience and climate adaptation
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.footerText}>
              Coral Refuge Conservation Program
            </Text>
            <Text style={styles.footerText}>
              www.coralrefuge.org
            </Text>
            <Text style={styles.footerText}>
              Verify this certificate at: coralrefuge.org/verify/{data.certificateId}
            </Text>
          </View>

          <View style={styles.qrContainer}>
            <Image
              style={styles.qrCode}
              src={qrCodeDataUrl}
            />
          </View>
        </View>

        <Text style={styles.certificateId}>
          This certificate confirms active protection of coral refugia. GPS coordinates provided for site visits.
        </Text>
      </Page>
    </Document>
  );
};

/**
 * Generates a PDF certificate for a sponsorship
 * @param data Certificate data including recipient info and sponsorship details
 * @returns PDF as a Buffer
 */
export async function generateCertificate(
  data: CertificateData
): Promise<Buffer> {
  console.log('Generating certificate for:', data.recipientName);

  try {
    // Generate QR code for certificate verification
    const verificationUrl = `https://coralrefuge.org/verify/${data.certificateId}`;
    const qrCodeDataUrl = await QRCode.toDataURL(verificationUrl, {
      width: 200,
      margin: 1,
      color: {
        dark: '#0369a1',
        light: '#ffffff',
      },
    });

    console.log('QR code generated successfully');

    // Generate PDF
    const pdfDoc = (
      <CertificateDocument data={data} qrCodeDataUrl={qrCodeDataUrl} />
    );

    const asPdf = pdf(pdfDoc);
    const blob = await asPdf.toBlob();
    const buffer = Buffer.from(await blob.arrayBuffer());

    console.log('Certificate PDF generated successfully, size:', buffer.length, 'bytes');

    return buffer;
  } catch (error) {
    console.error('Error generating certificate:', error);
    throw new Error(`Certificate generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Generates a unique certificate ID
 */
export function generateCertificateId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 10);
  return `CR-${timestamp}-${randomStr}`.toUpperCase();
}

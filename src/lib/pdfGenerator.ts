import { jsPDF } from 'jspdf';
import { LinkedInAuthorityAudit } from '../types';

export function generateAuditPdf(audit: LinkedInAuthorityAudit, leadData?: { name?: string; company?: string; email?: string; url?: string }) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 18;
  const contentWidth = pageWidth - margin * 2;

  // Header Banner - Navy Background
  doc.setFillColor(15, 23, 42); // slate-900 / navy
  doc.rect(0, 0, pageWidth, 42, 'F');

  // Brand Name & Tagline
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(255, 255, 255);
  doc.text('FOUNDER AUTHORITY', margin, 18);

  // Red accent dot
  doc.setFillColor(220, 38, 38);
  doc.circle(margin + 82, 14, 2, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225);
  doc.text('Founders Build Companies. We Build Founder Brands.', margin, 26);

  doc.setFontSize(8);
  doc.setTextColor(248, 113, 113);
  doc.text('CONFIDENTIAL EXECUTIVE AUDIT REPORT', margin, 34);

  // Report Date & Target
  const today = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
  doc.setTextColor(148, 163, 184);
  doc.text(`Generated: ${today}`, pageWidth - margin - 40, 26);

  // Executive Score Card Box
  let currentY = 50;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, currentY, contentWidth, 36, 3, 3, 'FD');

  // Target Founder Profile Info
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  const founderName = leadData?.name || audit.profileHandle || 'Founder / Executive';
  doc.text(`Executive Profile: ${founderName}`, margin + 8, currentY + 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  if (leadData?.company) {
    doc.text(`Company: ${leadData.company}`, margin + 8, currentY + 19);
  }
  if (leadData?.url) {
    doc.text(`URL: ${leadData.url}`, margin + 8, currentY + 26);
  }

  // Score badge right-hand side
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(252, 165, 165);
  doc.roundedRect(pageWidth - margin - 48, currentY + 6, 42, 24, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(220, 38, 38);
  doc.text('AUTHORITY SCORE', pageWidth - margin - 45, currentY + 13);

  doc.setFontSize(16);
  doc.setTextColor(15, 23, 42);
  doc.text(`${audit.authorityScore} / 10`, pageWidth - margin - 45, currentY + 24);

  // 5-Pillar Breakdown Bars
  currentY += 44;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Proprietary 5-Pillar Scoring Framework (20% Each)', margin, currentY);

  currentY += 6;
  const pillars = [
    { label: 'Profile Foundation', score: audit.breakdown.profileFoundation },
    { label: 'Authority Signals', score: audit.breakdown.authority },
    { label: 'Content Strategy', score: audit.breakdown.contentStrategy },
    { label: 'Category Positioning', score: audit.breakdown.positioning },
    { label: 'Growth Potential', score: audit.breakdown.growthPotential },
  ];

  pillars.forEach((p, idx) => {
    const barY = currentY + idx * 7.5;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(71, 85, 105);
    doc.text(p.label, margin, barY + 4);

    // Track
    const trackX = margin + 48;
    const trackWidth = contentWidth - 66;
    doc.setFillColor(241, 245, 249);
    doc.roundedRect(trackX, barY + 0.5, trackWidth, 4.5, 2, 2, 'F');

    // Fill
    const fillWidth = (p.score / 10) * trackWidth;
    doc.setFillColor(220, 38, 38);
    doc.roundedRect(trackX, barY + 0.5, fillWidth, 4.5, 2, 2, 'F');

    // Score label
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text(`${p.score}`, pageWidth - margin - 12, barY + 4);
  });

  // Key Strengths & Improvements
  currentY += 46;
  const colWidth = (contentWidth - 6) / 2;

  // Strengths Box
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, currentY, colWidth, 40, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(22, 101, 52);
  doc.text('Key Profile Strengths', margin + 6, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  let sY = currentY + 15;
  audit.strengths.slice(0, 3).forEach((str) => {
    const lines = doc.splitTextToSize(`+ ${str}`, colWidth - 12);
    doc.text(lines, margin + 6, sY);
    sY += lines.length * 4 + 1.5;
  });

  // Weaknesses Box
  const weakX = margin + colWidth + 6;
  doc.setFillColor(254, 242, 242);
  doc.setDrawColor(254, 202, 202);
  doc.roundedRect(weakX, currentY, colWidth, 40, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(153, 27, 27);
  doc.text('Key Improvement Areas', weakX + 6, currentY + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  let wY = currentY + 15;
  audit.improvements.slice(0, 3).forEach((imp) => {
    const lines = doc.splitTextToSize(`! ${imp}`, colWidth - 12);
    doc.text(lines, weakX + 6, wY);
    wY += lines.length * 4 + 1.5;
  });

  // Recommended Headline
  currentY += 46;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('1. Recommended High-Converting Headline', margin, currentY);

  currentY += 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, currentY, contentWidth, 18, 2, 2, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(220, 38, 38);
  const headlineLines = doc.splitTextToSize(audit.recommendedHeadline, contentWidth - 12);
  doc.text(headlineLines, margin + 6, currentY + 7);

  // Content Pillars Section
  currentY += 24;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text('2. Strategic Content Pillars For Organic Inbound Pipeline', margin, currentY);

  currentY += 5;
  audit.contentPillars.slice(0, 4).forEach((pillar, i) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`Pillar 0${i + 1}: ${pillar.title}`, margin, currentY + 4);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    const desc = doc.splitTextToSize(pillar.description, contentWidth - 30);
    doc.text(desc, margin + 30, currentY + 4);

    currentY += 7.5;
  });

  // Footer CTA & Scarcity
  const footerY = pageHeight - 22;
  doc.setFillColor(15, 23, 42);
  doc.rect(0, footerY, pageWidth, 22, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text('Ready to turn your LinkedIn into an inbound revenue engine?', margin, footerY + 9);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(248, 113, 113);
  doc.text('We only work with 8 founders at a time. Book your free strategy session at Founder Authority.', margin, footerY + 16);

  // Save the PDF
  const filename = `Founder_Authority_LinkedIn_Audit_${founderName.replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
  doc.save(filename);
}

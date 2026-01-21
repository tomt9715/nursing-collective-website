#!/usr/bin/env python3
"""
NCLEX Priority Concepts PDF Generator
Generates a professional 1-page overview of the top 50 NCLEX priority concepts
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, KeepTogether
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.pdfgen import canvas
import os


# Brand colors from The Nursing Collective
PRIMARY_COLOR = colors.HexColor('#2E86AB')  # Medical Blue
SECONDARY_COLOR = colors.HexColor('#A23B72')  # Healthcare Accent
ACCENT_COLOR = colors.HexColor('#f59e0b')  # Warm accent
TEXT_PRIMARY = colors.HexColor('#1f2937')  # Dark gray
TEXT_SECONDARY = colors.HexColor('#6b7280')  # Medium gray


class HeaderFooterCanvas(canvas.Canvas):
    """Custom canvas for adding headers and footers"""

    def __init__(self, *args, **kwargs):
        canvas.Canvas.__init__(self, *args, **kwargs)
        self.pages = []

    def showPage(self):
        self.pages.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        page_count = len(self.pages)
        for page_num, page in enumerate(self.pages, 1):
            self.__dict__.update(page)
            self.draw_header_footer(page_num, page_count)
            canvas.Canvas.showPage(self)
        canvas.Canvas.save(self)

    def draw_header_footer(self, page_num, page_count):
        """Draw header and footer on each page"""
        # Header - Brand name
        self.setFont('Helvetica-Bold', 10)
        self.setFillColor(PRIMARY_COLOR)
        self.drawString(0.75 * inch, 10.5 * inch, "The Nursing Collective")

        # Footer - Page number and website
        self.setFont('Helvetica', 8)
        self.setFillColor(TEXT_SECONDARY)
        footer_text = f"thenursingcollective.pro | Page {page_num} of {page_count}"
        self.drawCentredString(4.25 * inch, 0.5 * inch, footer_text)


def create_nclex_priority_concepts_pdf(output_path):
    """Generate the NCLEX Priority Concepts PDF"""

    # Create the PDF
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=1*inch,
        bottomMargin=0.75*inch
    )

    # Container for the 'Flowable' objects
    elements = []

    # Styles
    styles = getSampleStyleSheet()

    # Custom title style
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=PRIMARY_COLOR,
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    # Custom subtitle style
    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=TEXT_SECONDARY,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )

    # Section header style - alternating colors for visual variety
    section_header_styles = [
        ParagraphStyle(
            'SectionHeader1',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=PRIMARY_COLOR,
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ),
        ParagraphStyle(
            'SectionHeader2',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=SECONDARY_COLOR,
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        ),
        ParagraphStyle(
            'SectionHeader3',
            parent=styles['Heading2'],
            fontSize=12,
            textColor=colors.HexColor('#059669'),  # Teal/Green
            spaceAfter=8,
            spaceBefore=12,
            fontName='Helvetica-Bold'
        )
    ]

    # Add title
    elements.append(Paragraph("Top 50 NCLEX Priority Concepts", title_style))
    elements.append(Paragraph("Quick Reference Guide for Nursing Students", subtitle_style))

    # Top 50 concepts organized by category
    concepts = [
        ("Safety & Infection Control", [
            "Standard Precautions", "Isolation Techniques", "Fall Prevention",
            "Restraint Safety", "Error Prevention", "Emergency Response Protocol"
        ]),
        ("Pharmacology", [
            "Medication Rights (5-9 Rights)", "High-Alert Medications", "Adverse Reactions",
            "Drug Interactions", "Safe Dosage Calculations", "IV Medication Administration"
        ]),
        ("Physiological Adaptation", [
            "Shock Recognition & Management", "Fluid & Electrolyte Balance", "Acid-Base Balance",
            "Respiratory Distress", "Hemodynamic Monitoring", "Sepsis Criteria"
        ]),
        ("Basic Care & Comfort", [
            "Pain Assessment & Management", "Nutrition Support", "Mobility & Positioning",
            "Wound Care Basics", "Catheter Care", "Sleep Pattern Management"
        ]),
        ("Reduction of Risk Potential", [
            "Vital Signs Interpretation", "Lab Value Ranges", "Diagnostic Test Prep",
            "Pre/Post-Op Care", "Complication Prevention", "Monitoring High-Risk Patients"
        ]),
        ("Health Promotion", [
            "Developmental Milestones", "Immunization Schedule", "Prenatal Care",
            "Health Screening Guidelines", "Disease Prevention", "Patient Education Techniques"
        ]),
        ("Psychosocial Integrity", [
            "Therapeutic Communication", "Crisis Intervention", "Mental Health Assessment",
            "Grief Support", "Abuse Recognition", "Substance Use Disorders"
        ]),
        ("Management of Care", [
            "Delegation Principles", "Priority Setting (ABCs)", "Informed Consent",
            "Confidentiality/HIPAA", "Case Management", "Advocacy Role"
        ])
    ]

    # Create table data with alternating header colors and background colors
    category_colors = [
        colors.HexColor('#f0f9ff'),  # Light blue
        colors.HexColor('#faf5ff'),  # Light purple
        colors.HexColor('#ecfdf5'),  # Light teal
    ]

    for idx, (category, items) in enumerate(concepts):
        section_content = []

        # Use alternating header styles
        header_style = section_header_styles[idx % 3]
        section_content.append(Paragraph(category, header_style))

        # Format items into a compact table (3 columns)
        table_data = []
        for i in range(0, len(items), 3):
            row = items[i:i+3]
            # Pad the last row if needed
            while len(row) < 3:
                row.append("")
            table_data.append(row)

        # Create table with alternating background colors
        bg_color = category_colors[idx % 3]
        concept_table = Table(table_data, colWidths=[2.3*inch, 2.3*inch, 2.3*inch])
        concept_table.setStyle(TableStyle([
            ('FONT', (0, 0), (-1, -1), 'Helvetica', 9),
            ('TEXTCOLOR', (0, 0), (-1, -1), TEXT_PRIMARY),
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 6),
            ('RIGHTPADDING', (0, 0), (-1, -1), 6),
            ('TOPPADDING', (0, 0), (-1, -1), 4),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb')),
            ('BACKGROUND', (0, 0), (-1, -1), bg_color),
        ]))

        section_content.append(concept_table)
        section_content.append(Spacer(1, 0.08*inch))

        # Keep section together - prevent page break between header and table
        elements.append(KeepTogether(section_content))

    # Add footer note
    footer_note_style = ParagraphStyle(
        'FooterNote',
        parent=styles['Normal'],
        fontSize=8,
        textColor=TEXT_SECONDARY,
        alignment=TA_CENTER,
        fontName='Helvetica-Oblique',
        spaceAfter=6
    )

    elements.append(Spacer(1, 0.15*inch))
    elements.append(Paragraph(
        "<b>Study Tip:</b> Focus on understanding the principles behind these concepts, not just memorization. "
        "Practice applying them in clinical scenarios.",
        footer_note_style
    ))

    # Build PDF with custom canvas
    doc.build(elements, canvasmaker=HeaderFooterCanvas)
    print(f"✓ Generated: {output_path}")


if __name__ == "__main__":
    # Get the output directory (one level up from this script)
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(os.path.dirname(script_dir), 'assets', 'downloads')
    output_path = os.path.join(output_dir, 'nclex-priority-concepts.pdf')

    # Create the PDF
    create_nclex_priority_concepts_pdf(output_path)

#!/usr/bin/env python3
"""
Nursing School Supply List PDF Generator
Comprehensive supply list organized by program level with practical recommendations
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY
from reportlab.pdfgen import canvas
import os


# Brand colors from The Nursing Collective
PRIMARY_COLOR = colors.HexColor('#2E86AB')
SECONDARY_COLOR = colors.HexColor('#A23B72')
ACCENT_COLOR = colors.HexColor('#f59e0b')
TEXT_PRIMARY = colors.HexColor('#1f2937')
TEXT_SECONDARY = colors.HexColor('#6b7280')


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
        self.setFont('Helvetica-Bold', 10)
        self.setFillColor(PRIMARY_COLOR)
        self.drawString(0.75 * inch, 10.5 * inch, "The Nursing Collective")

        self.setFont('Helvetica', 8)
        self.setFillColor(TEXT_SECONDARY)
        footer_text = f"thenursingcollective.pro | Page {page_num} of {page_count}"
        self.drawCentredString(4.25 * inch, 0.5 * inch, footer_text)


def create_nursing_supply_list_pdf(output_path):
    """Generate the Nursing School Supply List PDF"""

    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        rightMargin=0.75*inch,
        leftMargin=0.75*inch,
        topMargin=1*inch,
        bottomMargin=0.75*inch
    )

    elements = []
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle(
        'CustomTitle',
        parent=styles['Heading1'],
        fontSize=24,
        textColor=PRIMARY_COLOR,
        spaceAfter=6,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold'
    )

    subtitle_style = ParagraphStyle(
        'CustomSubtitle',
        parent=styles['Normal'],
        fontSize=11,
        textColor=TEXT_SECONDARY,
        spaceAfter=20,
        alignment=TA_CENTER,
        fontName='Helvetica'
    )

    section_header_style = ParagraphStyle(
        'SectionHeader',
        parent=styles['Heading2'],
        fontSize=14,
        textColor=PRIMARY_COLOR,
        spaceAfter=10,
        spaceBefore=14,
        fontName='Helvetica-Bold'
    )

    category_style = ParagraphStyle(
        'CategoryHeader',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=SECONDARY_COLOR,
        spaceAfter=6,
        spaceBefore=10,
        fontName='Helvetica-Bold'
    )

    body_style = ParagraphStyle(
        'CustomBody',
        parent=styles['Normal'],
        fontSize=10,
        textColor=TEXT_PRIMARY,
        spaceAfter=6,
        alignment=TA_JUSTIFY,
        fontName='Helvetica',
        leading=14
    )

    # Title
    elements.append(Paragraph("Nursing School Supply List", title_style))
    elements.append(Paragraph("Essential Items by Program Level", subtitle_style))

    # Introduction
    intro = """
    This comprehensive supply list covers everything you'll need throughout nursing school, organized by when
    you'll need it. Don't buy everything at once - start with essentials and add items as your program progresses.
    """
    elements.append(Paragraph(intro, body_style))
    elements.append(Spacer(1, 0.15*inch))

    # Essential Supplies for All Students (Start of Program)
    elements.append(Paragraph("Essential Supplies - Start of Program", section_header_style))

    essentials = [
        ("Clinical Tools", [
            ("Stethoscope", "Quality matters. Littmann Classic III or Cardiology IV recommended. Budget option: ADC or MDF."),
            ("Penlight", "Get one with pupil gauge. Keep a backup - they disappear easily."),
            ("Bandage Scissors", "7.5 inch trauma shears. Keep sharp and clean."),
            ("Watch with Second Hand", "Analog or digital. Needs to be cleanable and waterproof."),
        ]),
        ("Uniform & Accessories", [
            ("Scrubs", "3-4 sets minimum. Check school requirements for colors. Choose comfortable, breathable fabric."),
            ("Clinical Shoes", "Closed-toe, non-slip, comfortable for 12-hour shifts. Break them in before clinicals."),
            ("Compression Socks", "Prevent leg fatigue and swelling. Invest in quality pairs."),
            ("Lab Coat", "White coat if required. Check school specifications for length and style."),
            ("Name Badge Holder", "Retractable clip style. Keep your ID accessible and professional."),
        ]),
        ("Study & Organization", [
            ("Nursing Drug Guide", "Updated annually. Davis or Mosby recommended. Mobile app versions available."),
            ("Medical Dictionary", "Taber's or Mosby's. Essential for understanding terminology."),
            ("3-Ring Binders", "2-3 large binders for organizing notes, handouts, and study materials."),
            ("Notebook or Clipboard", "For clinical notes and patient information. Keep it HIPAA-compliant."),
            ("Highlighters & Pens", "Multiple colors for color-coding notes. Black pens for documentation."),
        ]),
        ("Tech & Productivity", [
            ("Laptop or Tablet", "For care plans, research, and online exams. Ensure it meets school requirements."),
            ("Printer with Scanner", "For assignments and study materials. Consider all-in-one device."),
            ("USB Drive or Cloud Storage", "Backup all your work. Use encrypted storage for HIPAA compliance."),
        ]),
    ]

    for category, items in essentials:
        elements.append(Paragraph(category, category_style))

        table_data = []
        for item_name, description in items:
            table_data.append([
                Paragraph(f"<b>{item_name}</b>", body_style),
                Paragraph(description, body_style)
            ])

        supply_table = Table(table_data, colWidths=[1.8*inch, 4.7*inch])
        supply_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb')),
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f0f9ff')),
        ]))

        elements.append(supply_table)
        elements.append(Spacer(1, 0.08*inch))

    # Intermediate Level Additions
    elements.append(Paragraph("Intermediate Level - Add Before Med-Surg II", section_header_style))

    intermediate = [
        ("Advanced Clinical Tools", [
            ("Blood Pressure Cuff", "Aneroid sphygmomanometer if not provided. Useful for practice and home."),
            ("Pulse Oximeter", "Portable fingertip model for clinical assessments."),
            ("Reflex Hammer", "For neurological assessments. Taylor or Buck style."),
        ]),
        ("Reference Materials", [
            ("Lab Values Pocket Guide", "Quick reference for normal ranges. Laminated cards work well."),
            ("EKG/ECG Interpretation Guide", "Pocket guide for rhythm recognition and interpretation."),
            ("NCLEX Review Book", "Saunders or Kaplan. Start reviewing early, not just before graduation."),
        ]),
    ]

    for category, items in intermediate:
        elements.append(Paragraph(category, category_style))

        table_data = []
        for item_name, description in items:
            table_data.append([
                Paragraph(f"<b>{item_name}</b>", body_style),
                Paragraph(description, body_style)
            ])

        supply_table = Table(table_data, colWidths=[1.8*inch, 4.7*inch])
        supply_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb')),
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f0f9ff')),
        ]))

        elements.append(supply_table)
        elements.append(Spacer(1, 0.08*inch))

    # Advanced Level Additions
    elements.append(Paragraph("Advanced Level - Final Year & NCLEX Prep", section_header_style))

    advanced = [
        ("Specialty Clinical Items", [
            ("Tuning Fork", "128 Hz and 512 Hz for sensory assessment in neuro rotations."),
            ("Otoscope/Ophthalmoscope", "If doing advanced assessment course. Often provided by school."),
        ]),
        ("Professional Development", [
            ("Resume Portfolio", "Professional folder for resume, certifications, and reference letters."),
            ("Business Cards", "Simple cards with name, credentials, email, LinkedIn. For networking."),
            ("Professional Interview Outfit", "Polished outfit for job interviews and networking events."),
        ]),
        ("NCLEX Preparation", [
            ("NCLEX Question Bank", "UWorld, Kaplan, or Hurst. Online subscription essential for practice."),
            ("NCLEX Study Plan", "Structured review course or self-study schedule. Start 2-3 months before exam."),
        ]),
    ]

    for category, items in advanced:
        elements.append(Paragraph(category, category_style))

        table_data = []
        for item_name, description in items:
            table_data.append([
                Paragraph(f"<b>{item_name}</b>", body_style),
                Paragraph(description, body_style)
            ])

        supply_table = Table(table_data, colWidths=[1.8*inch, 4.7*inch])
        supply_table.setStyle(TableStyle([
            ('VALIGN', (0, 0), (-1, -1), 'TOP'),
            ('LEFTPADDING', (0, 0), (-1, -1), 8),
            ('RIGHTPADDING', (0, 0), (-1, -1), 8),
            ('TOPPADDING', (0, 0), (-1, -1), 6),
            ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
            ('GRID', (0, 0), (-1, -1), 0.5, colors.HexColor('#e5e7eb')),
            ('BACKGROUND', (0, 0), (0, -1), colors.HexColor('#f0f9ff')),
        ]))

        elements.append(supply_table)
        elements.append(Spacer(1, 0.08*inch))

    # Optional But Helpful
    elements.append(Paragraph("Optional But Helpful Items", section_header_style))

    optional_items = [
        "Small backpack or tote bag for clinical supplies",
        "Insulated lunch bag for long clinical days",
        "Phone charger and portable battery pack",
        "Personal hand cream (hospitals are dry)",
        "Energy bars or healthy snacks for clinical breaks",
        "Small hand sanitizer for your pocket",
        "Planner or digital calendar for time management",
        "Noise-canceling headphones for studying"
    ]

    optional_data = []
    for i in range(0, len(optional_items), 2):
        row = optional_items[i:i+2]
        while len(row) < 2:
            row.append("")
        optional_data.append([
            Paragraph(f"• {row[0]}", body_style),
            Paragraph(f"• {row[1]}", body_style) if row[1] else Paragraph("", body_style)
        ])

    optional_table = Table(optional_data, colWidths=[3.25*inch, 3.25*inch])
    optional_table.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))

    elements.append(optional_table)
    elements.append(Spacer(1, 0.15*inch))

    # Money-Saving Tips Box
    tips_style = ParagraphStyle(
        'TipsStyle',
        parent=styles['Normal'],
        fontSize=9,
        textColor=TEXT_PRIMARY,
        fontName='Helvetica',
        leading=12,
        spaceAfter=4
    )

    tips_header_style = ParagraphStyle(
        'TipsHeaderStyle',
        parent=styles['Normal'],
        fontSize=11,
        textColor=PRIMARY_COLOR,
        fontName='Helvetica-Bold',
        spaceAfter=6
    )

    tips_content = [
        [Paragraph("Money-Saving Tips", tips_header_style)],
        [Paragraph("• Buy used textbooks or rent them. Check school library reserves.", tips_style)],
        [Paragraph("• Split costs with classmates for optional reference books.", tips_style)],
        [Paragraph("• Wait until you actually need specialty items before buying them.", tips_style)],
        [Paragraph("• Check if your school provides any supplies or tool kits.", tips_style)],
        [Paragraph("• Look for student discounts at medical supply stores.", tips_style)],
    ]

    tips_table = Table(tips_content, colWidths=[6.5*inch])
    tips_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#fef3c7')),
        ('BOX', (0, 0), (-1, -1), 2, ACCENT_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))

    elements.append(tips_table)

    # Build PDF
    doc.build(elements, canvasmaker=HeaderFooterCanvas)
    print(f"✓ Generated: {output_path}")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(os.path.dirname(script_dir), 'assets', 'downloads')
    output_path = os.path.join(output_dir, 'nursing-supply-list.pdf')

    create_nursing_supply_list_pdf(output_path)

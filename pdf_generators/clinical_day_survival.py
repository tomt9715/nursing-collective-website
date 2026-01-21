#!/usr/bin/env python3
"""
First Clinical Day Survival Guide PDF Generator
Practical tips and guidance for nervous nursing students on their first clinical rotation
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak
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
        # Header
        self.setFont('Helvetica-Bold', 10)
        self.setFillColor(PRIMARY_COLOR)
        self.drawString(0.75 * inch, 10.5 * inch, "The Nursing Collective")

        # Footer
        self.setFont('Helvetica', 8)
        self.setFillColor(TEXT_SECONDARY)
        footer_text = f"thenursingcollective.pro | Page {page_num} of {page_count}"
        self.drawCentredString(4.25 * inch, 0.5 * inch, footer_text)


def create_clinical_survival_guide_pdf(output_path):
    """Generate the First Clinical Day Survival Guide PDF"""

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

    subsection_style = ParagraphStyle(
        'SubsectionHeader',
        parent=styles['Heading3'],
        fontSize=11,
        textColor=SECONDARY_COLOR,
        spaceAfter=6,
        spaceBefore=8,
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

    bullet_style = ParagraphStyle(
        'BulletStyle',
        parent=styles['Normal'],
        fontSize=10,
        textColor=TEXT_PRIMARY,
        spaceAfter=4,
        leftIndent=20,
        fontName='Helvetica',
        leading=13
    )

    # Title
    elements.append(Paragraph("First Clinical Day Survival Guide", title_style))
    elements.append(Paragraph("Essential Tips for Nervous Nursing Students", subtitle_style))

    # Introduction
    intro_text = """
    Your first clinical day can feel overwhelming, but remember: every nurse who came before you
    felt the same way. This guide covers practical strategies to help you feel prepared, confident,
    and ready to make the most of your clinical experience.
    """
    elements.append(Paragraph(intro_text, body_style))
    elements.append(Spacer(1, 0.15*inch))

    # Section 1: The Night Before
    elements.append(Paragraph("The Night Before", section_header_style))

    prep_items = [
        ("Pack Your Clinical Bag", "Stethoscope, pen light, scissors, multiple pens (black and colored), small notebook, "
         "hand sanitizer, lip balm, granola bar, water bottle. Double-check you have everything."),
        ("Prepare Your Uniform", "Iron your scrubs, polish your shoes if needed. Lay everything out including your badge, "
         "watch, and comfortable socks. Set it where you'll see it in the morning."),
        ("Review Key Concepts", "Spend 20-30 minutes reviewing vital sign ranges, basic assessment techniques, and any "
         "conditions you might encounter on your unit. Don't cram all night."),
        ("Get Adequate Sleep", "Aim for 7-8 hours. Set multiple alarms and go to bed early. Your brain needs rest more "
         "than last-minute studying."),
    ]

    for header, text in prep_items:
        elements.append(Paragraph(f"<b>{header}:</b> {text}", bullet_style))

    elements.append(Spacer(1, 0.12*inch))

    # Section 2: Morning Routine
    elements.append(Paragraph("Morning of Clinicals", section_header_style))

    morning_tips = [
        "Eat a substantial breakfast with protein. You may not have time to eat again for hours.",
        "Arrive 10-15 minutes early. Being rushed increases anxiety and sets the wrong tone.",
        "Use the restroom before you get to the unit. Clinical days are long and busy.",
        "Take three deep breaths before entering the building. Ground yourself mentally."
    ]

    for tip in morning_tips:
        elements.append(Paragraph(f"• {tip}", bullet_style))

    elements.append(Spacer(1, 0.12*inch))

    # Section 3: First Hour on the Unit
    elements.append(Paragraph("First Hour on the Unit", section_header_style))

    elements.append(Paragraph(
        "The first hour sets the tone for your entire day. Focus on orientation and relationship-building.",
        body_style
    ))

    first_hour = [
        "Introduce yourself to your assigned nurse with confidence. Make eye contact and smile.",
        "Ask where to store your belongings and where the student area is located.",
        "Request a quick tour: supply room, medication room, clean utility, dirty utility, break room.",
        "Ask your nurse about their preferred communication style and how they like to delegate.",
        "Get report on your assigned patient(s). Take organized notes using a brain sheet.",
    ]

    for item in first_hour:
        elements.append(Paragraph(f"• {item}", bullet_style))

    elements.append(Spacer(1, 0.12*inch))

    # Section 4: Working with Your Nurse
    elements.append(Paragraph("Working with Your Nurse", section_header_style))

    elements.append(Paragraph("<b>Do's:</b>", subsection_style))
    dos = [
        "Ask questions, but pick appropriate times (not during emergencies or med pass)",
        "Volunteer to help before being asked",
        "Communicate what you've done and what you plan to do",
        "Show initiative while respecting boundaries",
        "Thank them at the end of the day"
    ]
    for item in dos:
        elements.append(Paragraph(f"• {item}", bullet_style))

    elements.append(Spacer(1, 0.08*inch))
    elements.append(Paragraph("<b>Don'ts:</b>", subsection_style))
    donts = [
        "Don't hide in the corner or disappear from the floor",
        "Don't pretend to know something you don't",
        "Don't touch equipment or meds without supervision",
        "Don't complain or speak negatively about staff or patients",
        "Don't check your phone except during designated breaks"
    ]
    for item in donts:
        elements.append(Paragraph(f"• {item}", bullet_style))

    elements.append(Spacer(1, 0.12*inch))

    # Section 5: Patient Interaction
    elements.append(Paragraph("Interacting with Patients", section_header_style))

    elements.append(Paragraph(
        "Most patients are kind and understand you're learning. Introduce yourself as a nursing student "
        "and explain that you'll be working with their nurse today.",
        body_style
    ))

    patient_tips = [
        "Always knock before entering and respect their privacy",
        "Use therapeutic communication: open-ended questions, active listening",
        "If a patient refuses care from a student, don't take it personally. Get your nurse.",
        "Spend time talking with your patients, not just doing tasks. You'll learn so much.",
        "Document everything you observe, assess, and do for your patient."
    ]

    for tip in patient_tips:
        elements.append(Paragraph(f"• {tip}", bullet_style))

    elements.append(Spacer(1, 0.12*inch))

    # Section 6: Handling Nervousness
    elements.append(Paragraph("Managing Anxiety & Nervousness", section_header_style))

    anxiety_strategies = [
        ("It's Normal to Be Nervous", "Every single nursing student feels this way. Your instructor and nurse "
         "expect it and will support you through it."),
        ("Focus on Learning, Not Perfection", "You're not expected to know everything. You're there to learn. "
         "Mistakes are part of the process when you're supervised."),
        ("Use Grounding Techniques", "If you feel overwhelmed, excuse yourself to the bathroom. Take five deep breaths. "
         "Splash cool water on your face. Then return."),
        ("Ask for Help Immediately", "If you don't know how to do something or feel uncomfortable, speak up right away. "
         "Never fake competence.")
    ]

    for header, text in anxiety_strategies:
        elements.append(Paragraph(f"<b>{header}:</b> {text}", bullet_style))

    elements.append(Spacer(1, 0.12*inch))

    # Section 7: End of Day
    elements.append(Paragraph("End of Clinical Day", section_header_style))

    end_day = [
        "Help clean up patient rooms and restock supplies before leaving",
        "Thank your nurse and ask if there's anything else you can help with",
        "Complete any required documentation or paperwork before you go",
        "Debrief with your clinical group if your instructor facilitates this",
        "On your drive home, reflect on one thing you did well and one thing you learned"
    ]

    for item in end_day:
        elements.append(Paragraph(f"• {item}", bullet_style))

    elements.append(Spacer(1, 0.15*inch))

    # Final encouragement box
    encouragement_style = ParagraphStyle(
        'Encouragement',
        parent=styles['Normal'],
        fontSize=10,
        textColor=TEXT_PRIMARY,
        alignment=TA_CENTER,
        fontName='Helvetica-Bold',
        spaceAfter=6,
        spaceBefore=6
    )

    elements.append(Spacer(1, 0.1*inch))

    encouragement_data = [[Paragraph(
        "Remember: You belong here. You've earned your spot in this program. "
        "One day at a time, one patient at a time, one skill at a time. You've got this.",
        encouragement_style
    )]]

    encouragement_table = Table(encouragement_data, colWidths=[6.5*inch])
    encouragement_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), colors.HexColor('#f0f9ff')),
        ('BOX', (0, 0), (-1, -1), 2, PRIMARY_COLOR),
        ('TOPPADDING', (0, 0), (-1, -1), 12),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 12),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
    ]))

    elements.append(encouragement_table)

    # Build PDF
    doc.build(elements, canvasmaker=HeaderFooterCanvas)
    print(f"✓ Generated: {output_path}")


if __name__ == "__main__":
    script_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(os.path.dirname(script_dir), 'assets', 'downloads')
    output_path = os.path.join(output_dir, 'clinical-day-survival-guide.pdf')

    create_clinical_survival_guide_pdf(output_path)

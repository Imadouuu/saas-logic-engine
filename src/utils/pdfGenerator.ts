import { ROIMetrics } from '../hooks/useROICalculator'

interface FormData {
  name: string
  email: string
  company: string
}

/**
 * Generate a downloadable text report of ROI audit results
 */
export function generatePDFReport(
  metrics: ROIMetrics,
  formData: FormData,
  isArabic: boolean
) {
  const timestamp = new Date().toLocaleDateString(isArabic ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const frictionLoss = Math.round(metrics.frictionLoss)
  const hoursRecovered = Math.round(metrics.latencyRecovered)
  const monthlySavings = Math.round(metrics.annualSavings / 12)

  let content = ''

  if (isArabic) {
    content = `
════════════════════════════════════════════════════════════════════
                      تقرير تدقيق الكفاءة التشغيلية
                        OPERATIONAL EFFICIENCY AUDIT
════════════════════════════════════════════════════════════════════

التاريخ: ${timestamp}
العميل: ${formData.name}
البريد الإلكتروني: ${formData.email}
الشركة: ${formData.company}

════════════════════════════════════════════════════════════════════
                          ملخص التنفيذي
════════════════════════════════════════════════════════════════════

هذا التقرير يكشف عن اختناقات العمليات الخفية والتكاليف المرتبطة بها
المحاكاة الهندسية للعمليات اليدوية مقابل النظم الآلية

════════════════════════════════════════════════════════════════════
                       مقاييس النظام الحالية
════════════════════════════════════════════════════════════════════

✓ فقدان الاحتكاك (Friction Loss):        ${frictionLoss}%
✓ كفاءة الدائرة (Circuit Efficiency):    ${Math.round(metrics.circuitEfficiency)}%
✓ التكلفة السنوية الحالية:              $${(metrics.totalAnnualManualCost / 1000).toFixed(1)}K
✓ تكلفة الخطأ والإصلاح:                  $${(metrics.errorCascadeCost / 1000).toFixed(1)}K سنويًا
✓ الدين التقني السنوي:                  $${(metrics.annualTechnicalDebtCost / 1000).toFixed(1)}K

════════════════════════════════════════════════════════════════════
                        الاستعادة المالية
════════════════════════════════════════════════════════════════════

رأس المال الزمني المستعاد سنويًا:      ${hoursRecovered} ساعة
الفائدة سنويًا (بالدولار):               $${(metrics.annualSavings / 1000).toFixed(1)}K
الفائدة شهريًا (بالدولار):               $${monthlySavings.toLocaleString()}
جدول الاسترجاع (ROI):                    ${Math.round(metrics.paybackMonths)} شهرًا

════════════════════════════════════════════════════════════════════
                      التنبؤ لمدة 24 شهرًا
════════════════════════════════════════════════════════════════════

العمليات اليدوية (بدون تحسين):
  - التكلفة الشهرية: $${(metrics.totalAnnualManualCost / 12 / 1000).toFixed(1)}K
  - الإجمالي في 24 شهرًا: $${(metrics.totalAnnualManualCost * 2 / 1000).toFixed(1)}K

نظام Imad المحسّن (مع الأتمتة):
  - تكلفة الإعداد: $${(metrics.automationSetupCost / 1000).toFixed(1)}K
  - التكلفة الشهرية: $${(metrics.annualAutomationCost / 12 / 1000).toFixed(1)}K
  - الإجمالي في 24 شهرًا: $${((metrics.automationSetupCost + metrics.annualAutomationCost * 2) / 1000).toFixed(1)}K

رأس المال المسترجع في 24 شهرًا: $${(metrics.cumulativeSavings[Math.min(23, metrics.cumulativeSavings.length - 1)] / 1000).toFixed(1)}K

════════════════════════════════════════════════════════════════════
                        حالة النظام
════════════════════════════════════════════════════════════════════

حالة النظام الحالية: ${metrics.systemStatus === 'OPTIMIZED' ? 'محسّن' : metrics.systemStatus === 'HEATING_UP' ? 'يسخن' : 'حرج'}

${
  metrics.systemStatus === 'CRITICAL'
    ? '⚠️  تنبيه حرج: نظامك يعمل بما يتجاوز حدود الكفاءة المستدامة'
    : '✓ النظام يعمل بكفاءة معقولة'
}

════════════════════════════════════════════════════════════════════
                       رسالة المسؤول النظامي
════════════════════════════════════════════════════════════════════

السلام عليكم ${formData.name}،

استلمت تدقيقك العملياتي. سجل نظامي إمكانية استرداد ${hoursRecovered} ساعة لفريقك.
أنا حاليًا أراجع الاختناقات الهيكلية التي ذكرتها.

توقع تقريرًا استراتيجيًا بالتفصيل خلال 24 ساعة يتضمن:
  • خطة الأتمتة المخصصة
  • الجدول الزمني للتنفيذ
  • متطلبات الموارد

— عماد ناصري
   مهندس النظام | Imad Nasseri, System Architect

════════════════════════════════════════════════════════════════════
                         الخطوات القادمة
════════════════════════════════════════════════════════════════════

1. تجنيب الرسالة الفورية: تم استلام تدقيقك رسميًا
2. مراجعة معمارية: فحص شامل لسير عملك خلال 24 ساعة
3. استشارة استراتيجية: جلسة من 30 دقيقة لمناقشة التحسينات

════════════════════════════════════════════════════════════════════
                         معلومات التواصل
════════════════════════════════════════════════════════════════════

البريد الإلكتروني:    imadnasri15@gmail.com
موقع الويب:          https://imad-nasseri.dev
الموقع:              Sétif, Algeria

════════════════════════════════════════════════════════════════════

© 2024 Imad Nasseri - Digital Architecture | جميع الحقوق محفوظة
التقرير من طرف أنظمة الأتمتة المدفوعة بالذكاء الاصطناعي

════════════════════════════════════════════════════════════════════
    `
  } else {
    content = `
════════════════════════════════════════════════════════════════════
               OPERATIONAL EFFICIENCY AUDIT REPORT
                   تقرير تدقيق الكفاءة التشغيلية
════════════════════════════════════════════════════════════════════

Date:      ${timestamp}
Client:    ${formData.name}
Email:     ${formData.email}
Company:   ${formData.company}

════════════════════════════════════════════════════════════════════
                        EXECUTIVE SUMMARY
════════════════════════════════════════════════════════════════════

This report reveals hidden operational bottlenecks and associated costs.
Engineering-grade simulation of manual operations vs. automated systems.

════════════════════════════════════════════════════════════════════
                      CURRENT SYSTEM METRICS
════════════════════════════════════════════════════════════════════

✓ Friction Loss:                         ${frictionLoss}%
✓ Circuit Efficiency:                    ${Math.round(metrics.circuitEfficiency)}%
✓ Current Annual Cost:                   $${(metrics.totalAnnualManualCost / 1000).toFixed(1)}K
✓ Error Cascade Cost:                    $${(metrics.errorCascadeCost / 1000).toFixed(1)}K annually
✓ Annual Technical Debt:                 $${(metrics.annualTechnicalDebtCost / 1000).toFixed(1)}K

════════════════════════════════════════════════════════════════════
                       CAPITAL RECOVERY
════════════════════════════════════════════════════════════════════

Temporal Capital Recovered Annually:      ${hoursRecovered} hours
Annual Savings (USD):                     $${(metrics.annualSavings / 1000).toFixed(1)}K
Monthly Savings (USD):                    $${monthlySavings.toLocaleString()}
ROI Payback Timeline:                     ${Math.round(metrics.paybackMonths)} months

════════════════════════════════════════════════════════════════════
                     24-MONTH PROJECTION
════════════════════════════════════════════════════════════════════

Manual Operations (No Optimization):
  - Monthly Cost: $${(metrics.totalAnnualManualCost / 12 / 1000).toFixed(1)}K
  - 24-Month Total: $${(metrics.totalAnnualManualCost * 2 / 1000).toFixed(1)}K

Imad's Optimized System (With Automation):
  - Setup Cost: $${(metrics.automationSetupCost / 1000).toFixed(1)}K
  - Monthly Cost: $${(metrics.annualAutomationCost / 12 / 1000).toFixed(1)}K
  - 24-Month Total: $${((metrics.automationSetupCost + metrics.annualAutomationCost * 2) / 1000).toFixed(1)}K

Capital Recovered in 24 Months: $${(metrics.cumulativeSavings[Math.min(23, metrics.cumulativeSavings.length - 1)] / 1000).toFixed(1)}K

════════════════════════════════════════════════════════════════════
                       SYSTEM STATUS
════════════════════════════════════════════════════════════════════

Current System Status: ${metrics.systemStatus}

${
  metrics.systemStatus === 'CRITICAL'
    ? '⚠️  CRITICAL ALERT: Your system is operating beyond sustainable efficiency thresholds'
    : '✓ System operating at reasonable efficiency levels'
}

════════════════════════════════════════════════════════════════════
                    SYSTEM ARCHITECT MESSAGE
════════════════════════════════════════════════════════════════════

Hello ${formData.name},

I have received your operational audit. My system has logged a potential
recovery of ${hoursRecovered} hours for your team. I am currently reviewing
the architectural bottlenecks you mentioned.

Expect a strategic briefing within 24 hours that includes:
  • Custom automation architecture
  • Implementation timeline
  • Resource requirements

— Imad Nasseri
   System Architect | مهندس النظام

════════════════════════════════════════════════════════════════════
                        NEXT STEPS
════════════════════════════════════════════════════════════════════

1. INSTANT CONFIRMATION: Your audit has been formally received
2. ARCHITECTURAL REVIEW: Comprehensive workflow analysis (24 hours)
3. STRATEGIC CONSULTATION: 30-minute session to discuss improvements

════════════════════════════════════════════════════════════════════
                        CONTACT INFO
════════════════════════════════════════════════════════════════════

Email:    imadnasri15@gmail.com
Website:  https://imad-nasseri.dev
Location: Sétif, Algeria

════════════════════════════════════════════════════════════════════

© 2024 Imad Nasseri - Digital Architecture | All rights reserved
Report generated by AI-Powered Automation Systems

════════════════════════════════════════════════════════════════════
    `
  }

  // Create blob and trigger download
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const link = document.createElement('a')
  const url = URL.createObjectURL(blob)

  const filename = isArabic
    ? `تقرير_الكفاءة_${formData.name}_${new Date().getTime()}.txt`
    : `Efficiency_Report_${formData.name}_${new Date().getTime()}.txt`

  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/**
 * Generate email body for auto-responder
 */
export function generateEmailBody(
  formData: FormData,
  metrics: ROIMetrics,
  isArabic: boolean
): string {
  const hoursRecovered = Math.round(metrics.latencyRecovered)

  if (isArabic) {
    return `الموضوع: بدأ بروتوكول التحسين - ${formData.name}

مرحباً ${formData.name}،

لقد استلمت تدقيقك العملياتي. سجل نظامي إمكانية استرداد ${hoursRecovered} ساعة لفريقك. أنا حالياً أراجع الاختناقات الهيكلية التي ذكرتها.

توقع تقريراً استراتيجياً خلال 24 ساعة يتضمن خطة الأتمتة المخصصة لشركتك.

— عماد ناصري، مهندس النظام`
  } else {
    return `Subject: Optimization Protocol Initiated - ${formData.name}

Hello ${formData.name},

I have received your operational audit. My system has logged a potential recovery of ${hoursRecovered} hours for your team. I am currently reviewing the architectural bottlenecks you mentioned.

Expect a strategic briefing within 24 hours that includes your custom automation architecture and implementation timeline.

— Imad Nasseri, System Architect`
  }
}

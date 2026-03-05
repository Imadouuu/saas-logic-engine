import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

/**
 * Actual Recharts implementation - loaded dynamically
 * This file is only imported when the chart is needed
 */

interface ChartData {
  month: number
  manual: number
  automated: number
  savings: number
}

interface LazyROIChartProps {
  data: ChartData[]
  translationPrefix?: string
  locale: string
}

export default function LazyROIChart({
  data,
  locale,
}: LazyROIChartProps) {
  const isArabic = locale === 'ar'
  
  // Translation helper (simplified for chart usage)
  const t = (key: string, fallback: string) => {
    const translations: Record<string, Record<string, string>> = {
      en: {
        'saasROI.24MonthProjection': '24-Month Cost Trajectory',
        'saasROI.months': 'Months',
        'saasROI.costs': 'Costs ($)',
        'saasROI.manual': 'Manual Process',
        'saasROI.automated': 'Automated System',
        'saasROI.savings': 'Cumulative Savings',
      },
      ar: {
        'saasROI.24MonthProjection': 'مسار التكاليف لمدة 24 شهراً',
        'saasROI.months': 'الأشهر',
        'saasROI.costs': 'التكاليف ($)',
        'saasROI.manual': 'العملية اليدوية',
        'saasROI.automated': 'النظام الآلي',
        'saasROI.savings': 'المدخرات التراكمية',
      },
    }
    
    const lang = isArabic ? 'ar' : 'en'
    return translations[lang]?.[key] || fallback
  }

  return (
    <div className="w-full">
      <h3 className="text-2xl font-bold text-[#00D9FF] mb-8">
        {t('saasROI.24MonthProjection', '24-Month Cost Trajectory')}
      </h3>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#00D9FF20" />
          <XAxis
            dataKey="month"
            label={{
              value: t('saasROI.months', 'Months'),
              position: 'insideBottomRight',
              offset: -5,
            }}
            stroke="#666"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            label={{
              value: t('saasROI.costs', 'Costs ($)'),
              angle: -90,
              position: 'insideLeft',
            }}
            stroke="#666"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A1A2E',
              border: '1px solid #00D9FF',
              borderRadius: '8px',
              color: '#00D9FF',
            }}
            formatter={(value: number) => `$${value.toLocaleString()}`}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              if (value === 'manual')
                return t('saasROI.manual', 'Manual Process')
              if (value === 'automated')
                return t('saasROI.automated', 'Automated System')
              if (value === 'savings')
                return t('saasROI.savings', 'Cumulative Savings')
              return value
            }}
          />
          <Line
            type="monotone"
            dataKey="manual"
            stroke="#FF6B6B"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="automated"
            stroke="#00D9FF"
            strokeWidth={2}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
          />
          <Line
            type="monotone"
            dataKey="savings"
            stroke="#4ECDC4"
            strokeWidth={3}
            dot={false}
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

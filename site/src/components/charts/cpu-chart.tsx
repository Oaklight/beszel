import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import { formatShortDate, formatShortTime } from '@/lib/utils'
import { useEffect } from 'react'
import Spinner from '../spinner'
// for (const data of chartData) {
//   data.month = formatDateShort(data.month)
// }

const chartConfig = {
	cpu: {
		label: 'CPU Usage',
		color: 'hsl(var(--chart-1))',
	},
} satisfies ChartConfig

export default function ({
	chartData,
	max,
}: {
	chartData: { time: string; cpu: number }[]
	max: number
}) {
	if (!chartData?.length) {
		return <Spinner />
	}

	return (
		<ChartContainer config={chartConfig} className="h-full w-full absolute aspect-auto">
			<AreaChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<YAxis
					domain={[0, max]}
					tickCount={5}
					tickLine={false}
					axisLine={false}
					tickFormatter={(v) => `${v}%`}
				/>
				{/* todo: short time if first date is same day, otherwise short date */}
				<XAxis
					dataKey="time"
					tickLine={true}
					axisLine={false}
					tickMargin={8}
					minTickGap={30}
					tickFormatter={formatShortTime}
				/>
				<ChartTooltip
					cursor={false}
					content={
						<ChartTooltipContent
							labelFormatter={formatShortDate}
							defaultValue={'%'}
							indicator="line"
						/>
					}
				/>
				<Area
					dataKey="cpu"
					type="natural"
					fill="var(--color-cpu)"
					fillOpacity={0.4}
					stroke="var(--color-cpu)"
				/>
			</AreaChart>
		</ChartContainer>
	)
}

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HistoryEntry } from '@/lib/types';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Thermometer, Zap, Gauge } from 'lucide-react';

interface VisualizationPanelProps {
    history: HistoryEntry[];
    selectedMachineId: string;
}

const chartConfig = {
    temperature: {
        label: '温度',
        color: 'hsl(var(--chart-1))',
        icon: Thermometer,
    },
    load: {
        label: '負荷',
        color: 'hsl(var(--chart-2))',
        icon: Gauge,
    },
    speed: {
        label: '回転数',
        color: 'hsl(var(--chart-5))',
        icon: Zap,
    },
} satisfies ChartConfig;

export default function VisualizationPanel({ history, selectedMachineId }: VisualizationPanelProps) {
    const chartData = React.useMemo(() => {
        return history.map(entry => {
            const machine = entry.machines.find(m => m.id === selectedMachineId);
            return {
                time: entry.time,
                temperature: machine?.temperature ?? 0,
                load: machine?.load ?? 0,
                speed: machine?.speed ?? 0,
            };
        });
    }, [history, selectedMachineId]);

    const selectedMachine = history[0]?.machines.find(m => m.id === selectedMachineId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>履歴データ: {selectedMachine?.name ?? '機器'}</CardTitle>
        <CardDescription>
            直近 {Math.min(history.length, 300)} 秒間のセンサーデータ。
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <ResponsiveContainer>
                <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                        dataKey="time" 
                        tickFormatter={(value) => `${value}s`}
                        axisLine={false}
                        tickLine={false}
                    />
                    <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--chart-1))" hide />
                    <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--chart-2))" hide />
                    <Tooltip 
                        cursor={{strokeDasharray: '3 3'}}
                        content={<ChartTooltipContent indicator="dot" />} 
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="hsl(var(--chart-1))" strokeWidth={2} dot={false} name="温度 (°C)" />
                    <Line yAxisId="right" type="monotone" dataKey="load" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={false} name="負荷 (kg)" />
                    <Line yAxisId="right" type="monotone" dataKey="speed" stroke="hsl(var(--chart-5))" strokeWidth={2} dot={false} name="回転数 (RPM)" />
                </LineChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

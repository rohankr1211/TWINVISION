import type { Alert } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface AlertsPanelProps {
  alerts: Alert[];
}

export default function AlertsPanel({ alerts }: AlertsPanelProps) {
  return (
    <Card className="flex h-[400px] flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Alert Log
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          {alerts.length === 0 ? (
             <div className="flex h-full items-center justify-center text-muted-foreground">
                No alerts to display.
             </div>
          ) : (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Severity</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {alerts.map(alert => (
                    <TableRow key={alert.id}>
                    <TableCell>
                        <Badge variant={alert.severity === 'critical' ? 'destructive' : 'default'} className={cn('capitalize', alert.severity === 'warning' && 'bg-yellow-500 text-black')}>
                            {alert.severity}
                        </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{alert.message}</TableCell>
                    <TableCell className="text-right text-muted-foreground">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}

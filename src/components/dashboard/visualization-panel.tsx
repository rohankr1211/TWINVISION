import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function VisualizationPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Manufacturing Line Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
          <Image
            src="https://placehold.co/800x450.png"
            alt="3D visualization of a manufacturing line"
            layout="fill"
            objectFit="cover"
            data-ai-hint="manufacturing line factory"
          />
        </div>
      </CardContent>
    </Card>
  );
}

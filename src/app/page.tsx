// app/page.tsx
import { MainBanner } from '@/components/common/main-banner/main-banner';
import { Button } from '@/components/ui/button';

import { BestSoeatSection } from './_components/best-soeat-section/best-soeat-section';
import { CtaSection } from './_components/cta-section';
import { MainPageSection } from './_components/main-page-section';

export default function MainPage() {
  return (
    <div>
      <MainBanner />

      <div className="px-[392px]">
        <div>
          <Button>공동식사</Button>
          <Button>공동구매</Button>
        </div>

        <BestSoeatSection />
        <MainPageSection />
        <CtaSection />
      </div>
    </div>
  );
}

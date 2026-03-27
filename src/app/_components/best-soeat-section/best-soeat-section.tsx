import { BestSoeatCard } from '@/app/_components/best-soeat-card/best-soeat-card';

const MOCK_DATA = [
  {
    id: '1',
    title: '강남역 근처 혼밥 모임',
    region: '강남구',
    meetingAt: '2026.03.28 12:00',
    thumbnailUrl: '/images/placeholder-food.png',
  },
  {
    id: '2',
    title: '홍대 파스타 같이 먹어요',
    region: '마포구',
    meetingAt: '2026.03.29 18:00',
    thumbnailUrl: '/images/placeholder-food.png',
  },
  {
    id: '3',
    title: '마포구 주민 함께 저녁 먹어요',
    region: '마포구',
    meetingAt: '2026.03.30 18:00',
    thumbnailUrl: '/images/placeholder-food.png',
  },
];

export function BestSoeatSection() {
  return (
    <section className="px-4 py-6">
      <h2 className="mb-4 text-lg font-bold">베스트 소잇 🔥</h2>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {MOCK_DATA.map((meeting) => (
          <BestSoeatCard
            key={meeting.id}
            title={meeting.title}
            region={meeting.region}
            meetingAt={meeting.meetingAt}
            thumbnailUrl={meeting.thumbnailUrl}
          />
        ))}
      </div>
    </section>
  );
}

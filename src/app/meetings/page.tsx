'use client';

import { useEffect, useState } from 'react';

import { MainPageCard } from '@/components/common/main-page-card';
import type { MeetingWithHost } from '@/types/generated-client';
import { MeetingsApi } from '@/types/generated-client/apis/MeetingsApi';

import { MeetingFilterBar } from './_components/meeting-filter-bar';
import type { RegionSelection } from './_components/region-select-modal';

export default function MeetingsPage() {
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [date, setDate] = useState<Date | null>(null);

  const [meetingData, setMeetingData] = useState<MeetingWithHost[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data: MeetingWithHost[] = (
        await new MeetingsApi().teamIdMeetingsGet({ teamId: 'sosoeattest', size: 10 })
      ).data;
      setMeetingData(data);
      console.log(data);
    };

    fetchData();
  }, [regionCommitted, date]);

  return (
    <div className="h-[2398px]">
      <MeetingFilterBar
        regionCommitted={regionCommitted}
        date={date}
        onDateChange={setDate}
        onRegionChange={setRegionCommitted}
      />
      <div className="flex flex-wrap gap-4">
        {meetingData.map((meeting) => (
          <MainPageCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}

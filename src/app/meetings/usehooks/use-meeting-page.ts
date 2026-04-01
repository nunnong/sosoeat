import { useEffect, useState } from 'react';

import { format, startOfDay } from 'date-fns';
import { da } from 'date-fns/locale';
import { date, set } from 'zod';

import { MeetingWithHost, TeamIdMeetingsGetRequest } from '@/types/generated-client';

import { MeetingFilterBarProps } from '../_components/meeting-filter-bar';
import { RegionSelection } from '../_components/region-select-modal';
import { fetchMeetingByFilter } from '../repositories/api/fetch-meeting-by-filter';

const useMeetingPage = () => {
  const [regionCommitted, setRegionCommitted] = useState<RegionSelection>(null);
  const [dateStart, setDateStart] = useState<Date | null>(null);
  const [dateEnd, setDateEnd] = useState<Date | null>(null);
  const [meetingData, setMeetingData] = useState<MeetingWithHost[]>([]);
  const [typeFilter, setTypeFilter] = useState<'all' | 'groupEat' | 'groupBuy'>('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sort, setSort] = useState<MeetingFilterBarProps['sort']>('participantCount');

  /*
    @param options: TeamIdMeetingsGetRequest
    @description: options 객체는 API 요청에 필요한 필터링 및 정렬 옵션을 포함합니다. 
    type이 'all'인 경우에는 API에 type 필드를 포함하지 않아 전체 모임을 조회할 수 있도록 합니다. 
    region은 지역이 선택된 경우에만 API 요청에 포함되도록 하며, 날짜 필터는 dateStart와 dateEnd가 각각 null이 아닌 경우에만 포함됩니다. 
    sortBy는 participantCount, dateTime, registrationEnd 중 하나로 설정되며, sortOrder는 asc 또는 desc로 설정됩니다.
    
  */
  const options: TeamIdMeetingsGetRequest = {
    teamId: 'sosoeattest',
    size: 10,
    //type unfind이면 전체 보냄
    type: typeFilter === 'all' ? undefined : typeFilter,
    region:
      regionCommitted == null
        ? undefined
        : regionCommitted.district + ' ' + regionCommitted.province,
    dateStart: dateStart == null ? undefined : dateStart,
    dateEnd:
      dateEnd == null
        ? undefined
        : new Date(dateEnd.getFullYear(), dateEnd.getMonth(), dateEnd.getDate() + 1),
    sortBy: sort === 'participantCount' ? undefined : sort,
    sortOrder: sortOrder,
  };

  const handleTypeFilterChange = (value: 'all' | 'groupEat' | 'groupBuy') => {
    setTypeFilter(value);
  };

  const handleRegionChange = (value: RegionSelection) => {
    setRegionCommitted(value);
  };

  const handleDateChange = ({
    valueStart,
    valueEnd,
  }: {
    valueStart: Date | null;
    valueEnd: Date | null;
  }) => {
    if (valueStart) {
      if (valueEnd) {
        setDateStart(startOfDay(valueStart));
        setDateEnd(valueEnd);
      } else {
        setDateStart(startOfDay(valueStart));
        setDateEnd(valueStart);
      }
    } else {
      if (valueEnd) {
        setDateStart(startOfDay(valueEnd));
        setDateEnd(valueEnd);
      } else {
        setDateStart(null);
        setDateEnd(null);
      }
    }
  };

  const handleSortChange = (
    sortBy: 'participantCount' | 'dateTime' | 'registrationEnd',
    sortOrder: 'asc' | 'desc'
  ) => {
    setSort(sortBy);
    setSortOrder(sortOrder);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMeetingByFilter(options);
      setMeetingData(data.data);
    };
    fetchData();
  }, [regionCommitted, dateStart, dateEnd, typeFilter, sort, sortOrder]);
  return {
    meetingData,
    handleRegionChange,
    regionCommitted,
    dateStart,
    dateEnd,
    handleDateChange,
    handleTypeFilterChange,
    typeFilter,
    handleSortChange,
    sort,
  };
};

export default useMeetingPage;

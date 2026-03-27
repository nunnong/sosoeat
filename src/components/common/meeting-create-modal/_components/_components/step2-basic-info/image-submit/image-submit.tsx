import { useEffect, useState } from 'react';

import Image from 'next/image';

import { ImagePlus } from 'lucide-react';

import { StepProps } from '@/components/common/meeting-create-modal/meeting-create-modal.types';
import { TeamIdImagesPostRequest } from '@/types/generated-client/apis/ImagesApi';
import { PresignedUrlRequest } from '@/types/generated-client/models/PresignedUrlRequest';

export const ImageSubmit = ({ form }: StepProps) => {
  const { setValue } = form;
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzOTgsInRlYW1JZCI6InNvc29lYXR0ZXN0IiwiZW1haWwiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNzc0NTc1NjQyLCJleHAiOjE3NzQ1NzY1NDJ9.YTxXyp5hwROvGjgzdwMK7a5FsJJh-TTe5g8KYI1A60w`;

  const handleUploadImage = async () => {
    if (uploadedImage) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/images`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fileName: uploadedImage.name,
            contentType: uploadedImage.type,
            folder: 'meetings',
          } as PresignedUrlRequest),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      //사진 업로드
      await fetch(data.presignedUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': uploadedImage.type,
        },
        body: uploadedImage,
      });

      //사진 url 저장
      setValue('image', data.publicUrl);
    }
  };

  useEffect(() => {
    handleUploadImage();
  }, [uploadedImage]);

  return form.watch('image') ? (
    <Image src={form.watch('image')} alt="image" width={147} height={147} className="rounded-2xl" />
  ) : (
    <div className="bg-sosoeat-gray-100 text-sosoeat-gray-500 flex h-[147px] w-[147px] flex-col items-center justify-center gap-2 rounded-2xl border border-dashed text-sm">
      <label htmlFor="image" className="text-center text-xs font-medium">
        <ImagePlus className="h-6 w-6" />
      </label>
      <input
        type="file"
        id="image"
        className="sr-only"
        onChange={(e) => setUploadedImage(e.target.files?.[0] || null)}
      />
    </div>
  );
};

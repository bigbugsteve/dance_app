'use client';

import { useState } from 'react';

export default function UploadPage() {
  const [videoUrl, setVideoUrl] = useState('');

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.elements.namedItem('file') as HTMLInputElement;

    const formData = new FormData();
    if (fileInput.files?.[0]) {
      formData.append('file', fileInput.files[0]);

      const res = await fetch('/api/upload-video', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setVideoUrl(data.result.secure_url);
      } else {
        alert('Upload failed');
        console.error(data);
      }
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" name="file" accept="video/*" />
      <button type="submit">Feltöltés</button>

      {videoUrl && (
        <video controls width="400">
          <source src={videoUrl} />
        </video>
      )}
    </form>
  );
}

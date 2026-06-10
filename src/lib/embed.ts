export function getEmbedUrl(url: string) {
  const rawUrl = url.trim();

  if (!rawUrl) {
    return rawUrl;
  }

  const tiktokMatch = rawUrl.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/i);
  if (tiktokMatch?.[1]) {
    return `https://www.tiktok.com/embed/v2/${tiktokMatch[1]}`;
  }

  const youtubeWatchMatch = rawUrl.match(/[?&]v=([^&#]+)/i);
  const youtubeShortMatch = rawUrl.match(/youtu\.be\/([^?&#/]+)|youtube\.com\/shorts\/([^?&#/]+)/i);
  const youtubeId = youtubeWatchMatch?.[1] ?? youtubeShortMatch?.[1] ?? youtubeShortMatch?.[2];
  if (/youtube\.com|youtu\.be/i.test(rawUrl) && youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}`;
  }

  const vimeoMatch = rawUrl.match(/vimeo\.com\/(?:video\/)?(\d+)/i);
  if (vimeoMatch?.[1]) {
    return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  }

  const instagramMatch = rawUrl.match(/instagram\.com\/(?:reel|p|tv)\/([^/?#]+)/i);
  if (instagramMatch?.[1]) {
    return `https://www.instagram.com/reel/${instagramMatch[1]}/embed`;
  }

  return rawUrl;
}

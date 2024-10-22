export function extractUuidFromUrl(url) {
    const match = url.match(/\/([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})\//);
    return match ? match[1] : null;
  }
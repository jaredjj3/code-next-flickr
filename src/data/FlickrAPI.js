import { debounce } from 'lodash';

export const FLICKR_API_DEBOUNCED_MS = 1000;

export const FLICKR_API_URL = "https://api.flickr.com/services/rest/";

export const search = debounce(async (apiKey, query, limit, onResponse) => {
  const url = new URL(FLICKR_API_URL);
  url.searchParams.append("method", "flickr.photos.search");
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("tags", query);
  url.searchParams.append("per_page", limit);
  url.searchParams.append("format", "json");
  url.searchParams.append("nojsoncallback", 1);

  const res = await fetch(url);
  const data = await res.text();
  const json = JSON.parse(data);
  onResponse(json);
}, FLICKR_API_DEBOUNCED_MS, { leading: true, trailing: true });
